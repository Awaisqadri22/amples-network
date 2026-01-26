import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { Prisma } from '@prisma/client';

export async function POST(request: Request) {
    try {
        const { token, additionalInfo } = await request.json();

        if (!token) {
            return NextResponse.json(
                { error: 'Confirmation token is required' },
                { status: 400 }
            );
        }

        // Find quote or booking by confirmation token
        // Using type assertion because Prisma Client types may not recognize confirmationToken
        // The field exists in the database schema and works at runtime
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

        // Check if token has expired
        // Type assertion needed because Prisma types might not include tokenExpiresAt
        const recordWithToken = record as typeof record & { tokenExpiresAt: Date | null };
        if (recordWithToken.tokenExpiresAt && new Date() > recordWithToken.tokenExpiresAt) {
            return NextResponse.json(
                { error: 'Confirmation link has expired. Please contact us for a new link.' },
                { status: 410 }
            );
        }

        // Check if already confirmed
        if (record.status === 'confirmed') {
            return NextResponse.json(
                { 
                    error: 'This booking has already been confirmed',
                    alreadyConfirmed: true
                },
                { status: 200 }
            );
        }

        // Update record to confirmed status
        // Create update data with proper typing
        const updateData: {
            status: string;
            comments?: string | null;
            preferredDateTime?: Date | null;
        } = {
            status: 'confirmed',
            ...(additionalInfo && { 
                comments: additionalInfo.comments || record.comments || null,
                preferredDateTime: additionalInfo.preferredDateTime 
                    ? new Date(additionalInfo.preferredDateTime) 
                    : (record.preferredDateTime || 
                       (record as typeof record & { officePreferredDateTime?: Date | null }).officePreferredDateTime || 
                       (record as typeof record & { moveOutCleaningDate?: Date | null }).moveOutCleaningDate || 
                       (record as typeof record & { windowCleaningDate?: Date | null }).windowCleaningDate || 
                       (record as typeof record & { constructionCleaningDate?: Date | null }).constructionCleaningDate || 
                       (record as typeof record & { floorCleaningDate?: Date | null }).floorCleaningDate || 
                       null)
            })
        };

        let confirmedRecord;
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

        // Send confirmation emails
        try {
            if (!process.env.RESEND_API_KEY) {
                console.warn('Resend API key not configured, skipping confirmation emails');
            } else {
                const resend = new Resend(process.env.RESEND_API_KEY);

                const serviceName = confirmedRecord.selectedService || confirmedRecord.serviceType || 'Cleaning Service';
                const customerEmail = confirmedRecord.email || confirmedRecord.userEmail;

                // Email to customer
                if (customerEmail) {
                    const customerMailOptions = {
                        from: 'Amples <noreply@amples.se>',
                        to: customerEmail,
                        subject: `Booking Confirmed - ${serviceName}`,
                        html: `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            </head>
                            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                                    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">✅ Booking Confirmed!</h1>
                                </div>
                                <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
                                    <p style="font-size: 16px;">Hi ${confirmedRecord.name || 'there'},</p>
                                    <p style="font-size: 16px;">Great news! Your booking for <strong>${serviceName}</strong> has been confirmed.</p>
                                    <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0; border-radius: 4px;">
                                        <p style="margin: 0; font-size: 14px; color: #166534;"><strong>What's next?</strong></p>
                                        <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #166534;">
                                            <li>Our team will contact you shortly to finalize the details</li>
                                            <li>You'll receive a reminder before your scheduled service</li>
                                            <li>If you have any questions, feel free to contact us</li>
                                        </ul>
                                    </div>
                                    <p style="font-size: 16px;">Thank you for choosing Amples!</p>
                                    <p style="font-size: 14px; color: #6b7280;">Best regards,<br>The Amples Team</p>
                                </div>
                            </body>
                            </html>
                        `
                    };

                    const { data: customerData, error: customerError } = await resend.emails.send(customerMailOptions);
                    
                    if (customerError) {
                        console.error('Failed to send customer confirmation email:', customerError);
                    } else {
                        console.log('✅ Confirmation email sent to customer. Email ID:', customerData?.id);
                    }
                }

                // Email to admin
                const adminMailOptions = {
                    from: 'Amples Booking System <noreply@amples.se>',
                    to: 'awaisiqbalqadri22@gmail.com',
                    subject: `✅ Booking Confirmed - ${serviceName} - ${confirmedRecord.name}`,
                    html: `
                        <!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        </head>
                        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">✅ Booking Confirmed</h1>
                            </div>
                            <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
                                <p style="font-size: 16px;"><strong>Customer:</strong> ${confirmedRecord.name}</p>
                                <p style="font-size: 16px;"><strong>Service:</strong> ${serviceName}</p>
                                <p style="font-size: 16px;"><strong>Email:</strong> ${customerEmail || 'N/A'}</p>
                                <p style="font-size: 16px;"><strong>Phone:</strong> ${confirmedRecord.phone || 'N/A'}</p>
                                ${additionalInfo?.comments ? `<p style="font-size: 16px;"><strong>Additional Comments:</strong> ${additionalInfo.comments}</p>` : ''}
                                <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">This booking has been confirmed by the customer.</p>
                            </div>
                        </body>
                        </html>
                    `
                };

                const { data: adminData, error: adminError } = await resend.emails.send(adminMailOptions);
                
                if (adminError) {
                    console.error('Failed to send admin confirmation email:', adminError);
                } else {
                    console.log('✅ Confirmation notification sent to admin. Email ID:', adminData?.id);
                }
            }
        } catch (emailError) {
            console.error('Error sending confirmation emails:', emailError);
            // Don't fail the confirmation if email fails
        }

        return NextResponse.json({
            success: true,
            message: 'Booking confirmed successfully',
            record: {
                id: confirmedRecord.id,
                status: confirmedRecord.status,
                service: confirmedRecord.selectedService || confirmedRecord.serviceType
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
