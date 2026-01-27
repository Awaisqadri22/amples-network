import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { token, additionalInfo } = body as {
            token?: string;
            additionalInfo?: { preferredDateTime?: string; comments?: string };
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

        // Build update payload
        const updateData: {
            status: string;
            comments?: string | null;
            preferredDateTime?: Date | null;
        } = {
            status: 'confirmed'
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
