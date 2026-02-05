import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { Prisma } from '@prisma/client';
import { randomBytes, randomUUID } from 'crypto';

function calculatePrice(squareMeters: number | string | undefined): { price: number; priceRange?: string } | null {
    if (!squareMeters) return null;
    const sqm = typeof squareMeters === 'string' ? parseFloat(squareMeters) : squareMeters;
    if (isNaN(sqm) || sqm < 0) return null;
    const roundedSqm = Math.round(sqm);
    if (roundedSqm >= 0 && roundedSqm <= 29) return { price: 1575 };
    if (roundedSqm >= 30 && roundedSqm <= 39) return { price: 1725, priceRange: '1675-1775' };
    if (roundedSqm >= 40 && roundedSqm <= 49) return { price: 1825, priceRange: '1775-1875' };
    if (roundedSqm >= 50 && roundedSqm <= 59) return { price: 1925, priceRange: '1875-1975' };
    if (roundedSqm >= 60 && roundedSqm <= 69) return { price: 2125, priceRange: '2075-2175' };
    if (roundedSqm >= 70 && roundedSqm <= 79) return { price: 2325, priceRange: '2275-2375' };
    if (roundedSqm >= 80 && roundedSqm <= 89) return { price: 2450, priceRange: '2400-2500' };
    if (roundedSqm >= 90 && roundedSqm <= 100) return { price: 2900, priceRange: '2800-3000' };
    if (roundedSqm > 100 && roundedSqm <= 200) return { price: 3000 + Math.ceil((roundedSqm - 100) / 10) * 200 };
    return { price: 5000 + (roundedSqm - 200) * 30 };
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { token, additionalInfo } = body as {
            token?: string;
            additionalInfo?: {
                personalNumber?: string;
                preferredDateTime?: string;
                comments?: string;
                selectedExtraId?: string;
                selectedExtraLabel?: string;
                extraPriceKr?: number;
                totalPriceKr?: number;
            };
        };

        if (!token) {
            return NextResponse.json(
                { error: 'Confirmation token is required' },
                { status: 400 }
            );
        }

        // Find quote or booking by confirmation token
        const quote = await prisma.quote.findFirst({
            where: { confirmationToken: token } as Prisma.QuoteWhereInput,
            include: { user: true }
        });

        const booking = await prisma.booking.findFirst({
            where: { confirmationToken: token } as Prisma.BookingWhereInput,
            include: { user: true }
        });

        const record = quote || booking;
        const recordType = quote ? 'quote' : 'booking';

        if (!record) {
            return NextResponse.json(
                { error: 'Invalid or expired confirmation token' },
                { status: 404 }
            );
        }

        const recordWithToken = record as typeof record & { tokenExpiresAt: Date | null };
        if (recordWithToken.tokenExpiresAt && new Date() > recordWithToken.tokenExpiresAt) {
            return NextResponse.json(
                { error: 'Confirmation link has expired. Please contact us for a new link.' },
                { status: 410 }
            );
        }

        if (record.status === 'confirmed') {
            const serviceName = (record as typeof record & { selectedService?: string | null; serviceType?: string | null }).selectedService
                || (record as typeof record & { selectedService?: string | null; serviceType?: string | null }).serviceType
                || 'Cleaning Service';
            return NextResponse.json(
                {
                    success: true,
                    message: 'Booking already confirmed',
                    alreadyConfirmed: true,
                    record: {
                        id: record.id,
                        status: record.status,
                        service: serviceName
                    }
                },
                { status: 200 }
            );
        }

        // Validate personal number (required: 10–12 digits)
        const personalNumberRaw = additionalInfo?.personalNumber?.trim() ?? '';
        const personalNumberDigits = personalNumberRaw.replace(/\D/g, '');
        if (!personalNumberDigits || personalNumberDigits.length < 10 || personalNumberDigits.length > 12) {
            return NextResponse.json(
                { error: 'Personal Number is required and must be 10 to 12 digits.' },
                { status: 400 }
            );
        }

        // Build update payload
        const existingDetails = (record as { details?: unknown }).details as Record<string, unknown> | null | undefined;
        const confirmedExtra = additionalInfo?.selectedExtraId && additionalInfo.selectedExtraId !== 'none'
            ? {
                confirmedExtraId: additionalInfo.selectedExtraId,
                confirmedExtraLabel: additionalInfo.selectedExtraLabel ?? null,
                confirmedExtraPriceKr: additionalInfo.extraPriceKr ?? 0,
                confirmedTotalPriceKr: additionalInfo.totalPriceKr ?? null,
            }
            : {};
        const updateData: {
            status: string;
            personalNumber?: string | null;
            comments?: string | null;
            preferredDateTime?: Date | null;
            details?: Prisma.InputJsonValue;
        } = {
            status: 'confirmed',
            personalNumber: personalNumberDigits,
            details: { ...(existingDetails || {}), ...confirmedExtra } as Prisma.InputJsonValue
        };

        if (additionalInfo) {
            if (additionalInfo.comments != null) {
                updateData.comments = additionalInfo.comments || record.comments || null;
            }
            if (additionalInfo.preferredDateTime) {
                updateData.preferredDateTime = new Date(additionalInfo.preferredDateTime);
            }
        }

        let confirmedRecord: typeof record;
        if (recordType === 'quote') {
            confirmedRecord = await prisma.quote.update({
                where: { id: record.id },
                data: updateData,
                include: { user: true }
            });
            // Create a Booking from the confirmed Quote so the bookings table is populated
            const quoteData = confirmedRecord as Record<string, unknown>;
            const { id: _quoteId, createdAt: _qCreated, updatedAt: _qUpdated, user: _qUser, ...quoteScalars } = quoteData;
            await prisma.booking.create({
                data: {
                    ...quoteScalars,
                    status: 'confirmed',
                    confirmationToken: null,
                    tokenExpiresAt: null,
                } as Prisma.BookingUncheckedCreateInput,
            });
        } else {
            confirmedRecord = await prisma.booking.update({
                where: { id: record.id },
                data: updateData,
                include: { user: true }
            });
        }

        // Optional: send confirmation emails
        try {
            if (process.env.RESEND_API_KEY) {
                const resend = new Resend(process.env.RESEND_API_KEY);
                const serviceName = confirmedRecord.selectedService || confirmedRecord.serviceType || 'Cleaning Service';
                const customerEmail = confirmedRecord.email ?? (confirmedRecord as typeof confirmedRecord & { userEmail?: string | null }).userEmail;
                const confDetails = (confirmedRecord as { details?: { confirmedTotalPriceKr?: number; confirmedExtraLabel?: string } }).details;
                const totalPriceLine = confDetails?.confirmedTotalPriceKr
                    ? `<p style="font-size: 16px;"><strong>Total price:</strong> ${confDetails.confirmedTotalPriceKr} kr${confDetails.confirmedExtraLabel ? ` (includes ${confDetails.confirmedExtraLabel})` : ''}</p>`
                    : '';
                const totalPriceLineAdmin = confDetails?.confirmedTotalPriceKr
                    ? `<p><strong>Total price:</strong> ${confDetails.confirmedTotalPriceKr} kr${confDetails.confirmedExtraLabel ? ` (includes ${confDetails.confirmedExtraLabel})` : ''}</p>`
                    : '';

                if (customerEmail) {
                    await resend.emails.send({
                        from: 'Amples <noreply@amples.se>',
                        to: customerEmail,
                        subject: `Booking Confirmed - ${serviceName}`,
                        html: `
                            <!DOCTYPE html>
                            <html>
                            <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
                            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                                    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">✅ Booking Confirmed!</h1>
                                </div>
                                <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
                                    <p style="font-size: 16px;">Hi ${confirmedRecord.name || 'there'},</p>
                                    <p style="font-size: 16px;">Your booking for <strong>${serviceName}</strong> has been confirmed.</p>
                                    ${totalPriceLine}
                                    <p style="font-size: 14px; color: #6b7280;">Best regards,<br>The Amples Team</p>
                                </div>
                            </body>
                            </html>
                        `
                    });
                }

                await resend.emails.send({
                    from: 'Amples Booking System <noreply@amples.se>',
                    to: 'awaisiqbalqadri22@gmail.com',
                    subject: `✅ Booking Confirmed - ${serviceName} - ${confirmedRecord.name}`,
                    html: `
                        <!DOCTYPE html>
                        <html>
                        <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">✅ Booking Confirmed</h1>
                            </div>
                            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
                                <p><strong>Customer:</strong> ${confirmedRecord.name}</p>
                                <p><strong>Service:</strong> ${serviceName}</p>
                                <p><strong>Email:</strong> ${customerEmail || 'N/A'}</p>
                                <p><strong>Phone:</strong> ${confirmedRecord.phone || 'N/A'}</p>
                                ${totalPriceLineAdmin}
                                ${additionalInfo?.comments ? `<p><strong>Additional Comments:</strong> ${additionalInfo.comments}</p>` : ''}
                            </div>
                        </body>
                        </html>
                    `
                });
            }
        } catch (emailError) {
            console.error('Error sending confirmation emails:', emailError);
        }

        // After customer confirmed: create jobs and email contractors
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
            || (() => { try { return new URL(request.url).origin; } catch { return 'https://amples.se'; } })();
        try {
            const contractors = await prisma.$queryRaw<{ id: string; email: string; name: string }[]>`
                SELECT id, email, name FROM contractors
            `;
            const rec = confirmedRecord as Record<string, unknown>;
            const jobType = (rec.selectedService as string) || (rec.serviceType as string) || 'Cleaning Service';
            const displayAddress = (rec.address as string) || 'Not specified';
            const dateValue = (rec.preferredDateTime as Date | string) ?? (rec.moveOutCleaningDate as Date | string) ?? (rec.windowCleaningDate as Date | string)
                ?? (rec.constructionCleaningDate as Date | string) ?? (rec.floorCleaningDate as Date | string) ?? (rec.officePreferredDateTime as Date | string)
                ?? ((rec.detailPreferredDay && rec.detailPreferredTime) ? `${rec.detailPreferredDay} ${rec.detailPreferredTime}` : null)
                ?? ((rec.staircasePreferredDay && rec.staircasePreferredTime) ? `${rec.staircasePreferredDay} ${rec.staircasePreferredTime}` : null);
            const displayDate = dateValue
                ? (typeof dateValue === 'string' && dateValue.match(/^\d{4}-\d{2}-\d{2}/)
                    ? new Date(dateValue).toLocaleDateString('sv-SE', { dateStyle: 'medium' })
                    : String(dateValue))
                : 'Not specified';
            const squareMeterValue = (rec.squareMeter as string) || (rec.areaSize as string) || (rec.constructionAreaSize as string) || (rec.officeAreaSize as string) || (rec.detailAreaSize as string) || null;
            const priceInfo = calculatePrice(squareMeterValue ?? undefined);
            const detailsObj = rec.details as { confirmedTotalPriceKr?: number } | null | undefined;
            const customerPrice = detailsObj?.confirmedTotalPriceKr ?? priceInfo?.price;
            const contractorPriceKr = customerPrice != null ? Math.round(customerPrice * 0.75) : null;
            const displayContractorPrice = contractorPriceKr != null ? `${contractorPriceKr.toLocaleString('sv-SE')} kr` : 'Not specified';
            const jobDate = dateValue ? (typeof dateValue === 'string' ? new Date(dateValue) : dateValue) : null;
            const jobDateIso = jobDate ? (jobDate as Date).toISOString() : null;
            const tokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            const tokenExpiresAtIso = tokenExpiresAt.toISOString();
            const batchId = randomUUID();

            const buildContractorEmailHtml = (confirmUrl: string) => `
                <!DOCTYPE html>
                <html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 500px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="color: #fff; margin: 0; font-size: 20px;">New Job Opportunity</h1>
                    </div>
                    <div style="background: #fff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                        <p style="margin: 0 0 16px 0;"><strong>Job type:</strong> ${jobType}</p>
                        <p style="margin: 0 0 16px 0;"><strong>Address:</strong> ${displayAddress}</p>
                        <p style="margin: 0 0 16px 0;"><strong>Date:</strong> ${displayDate}</p>
                        <p style="margin: 0 0 24px 0;"><strong>Price:</strong> ${displayContractorPrice}</p>
                        <p style="margin: 0;"><a href="${confirmUrl}" style="display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%); color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px;">Confirm this job</a></p>
                    </div>
                    <p style="margin-top: 20px; font-size: 12px; color: #64748b;">Amples – this is an automated notification. Link valid for 7 days.</p>
                </body>
                </html>
            `;

            if (process.env.RESEND_API_KEY) {
                const resend = new Resend(process.env.RESEND_API_KEY);
                for (const contractor of contractors) {
                    const toEmail = contractor.email?.trim();
                    if (!toEmail) continue;
                    try {
                        const jobToken = randomBytes(24).toString('hex');
                        const jobId = randomUUID();
                        const dateExpr = jobDateIso != null ? Prisma.sql`${jobDateIso}::timestamp` : Prisma.sql`NULL`;
                        const tokenExpiresExpr = Prisma.sql`${tokenExpiresAtIso}::timestamp`;
                        try {
                            await prisma.$executeRaw(Prisma.sql`
                                INSERT INTO jobs (id, contractor_id, job_type, address, area, date, price, status, confirmation_token, token_expires_at, batch_id, created_at, updated_at)
                                VALUES (
                                    ${jobId},
                                    ${contractor.id},
                                    ${jobType},
                                    ${displayAddress === 'Not specified' ? null : displayAddress},
                                    ${squareMeterValue},
                                    ${dateExpr},
                                    ${contractorPriceKr},
                                    'active',
                                    ${jobToken},
                                    ${tokenExpiresExpr},
                                    ${batchId},
                                    now(),
                                    now()
                                )
                            `);
                        } catch (jobErr) {
                            console.error('Failed to save job for contractor', contractor.id, jobErr);
                            continue;
                        }
                        const confirmUrl = `${siteUrl}/contractor/confirm/${jobToken}`;
                        const contractorHtml = buildContractorEmailHtml(confirmUrl);
                        const { error: contractorErr } = await resend.emails.send({
                            from: 'Amples <noreply@amples.se>',
                            to: toEmail,
                            subject: `New job: ${jobType} – ${displayAddress}`,
                            html: contractorHtml
                        });
                        if (contractorErr) {
                            console.error('Contractor email failed for', toEmail, contractorErr);
                        } else {
                            console.log('Contractor email sent to', toEmail);
                        }
                    } catch (err) {
                        console.error('Contractor email exception for', toEmail, err);
                    }
                }
            }
        } catch (dbErr) {
            console.error('Failed to create jobs / email contractors:', dbErr);
        }

        const serviceName = confirmedRecord.selectedService || confirmedRecord.serviceType;

        return NextResponse.json({
            success: true,
            message: 'Booking confirmed successfully',
            record: {
                id: confirmedRecord.id,
                status: confirmedRecord.status,
                service: serviceName
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error confirming booking:', error);
        return NextResponse.json(
            { error: 'Failed to confirm booking' },
            { status: 500 }
        );
    }
}
