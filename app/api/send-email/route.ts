import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const {
            name, phone, email, message,
            formType, company, vatNumber,
            selectedService, homeType, cleanAll
        } = await request.json();

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Missing email credentials. Make sure EMAIL_USER and EMAIL_PASS are set in .env.local');
            return NextResponse.json({ error: 'Server configuration error: Missing email credentials' }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Verify connection configuration
        try {
            await transporter.verify();
            console.log('Transporter connection verified');
        } catch (verifyError) {
            console.error('Transporter verification failed:', verifyError);
            return NextResponse.json({ error: 'Failed to connect to email service', details: (verifyError as Error).message }, { status: 500 });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'awaisiqbalqadri22@gmail.com',
            subject: `New ${selectedService || 'Quote'} Request from ${name}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #0891b2; text-align: center;">New Quote Request</h2>
          <p style="color: #555;">You have received a new quote request from your website.</p>
          
          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <h3 style="color: #0e7490; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Service Information</h3>
            <p><strong>Service Requested:</strong> ${selectedService || 'Not specified'}</p>
            
            ${selectedService === 'Home Cleaning' ? `
            <p><strong>Home Type:</strong> ${homeType || 'N/A'}</p>
            <p><strong>Clean Entire Home:</strong> ${cleanAll || 'N/A'}</p>
            ` : ''}

            <h3 style="color: #0e7490; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            
            ${formType === 'company' ? `
            <h3 style="color: #0e7490; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Company Details</h3>
            <p><strong>Company Name:</strong> ${company}</p>
            <p><strong>VAT Number:</strong> ${vatNumber}</p>
            ` : ''}

            ${message ? `
            <h3 style="color: #0e7490; margin-top: 20px; margin-bottom: 10px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px;">Message</h3>
            <p style="background-color: #fff; padding: 10px; border-radius: 4px; border: 1px solid #e5e7eb;">${message}</p>
            ` : ''}
          </div>

          <p style="text-align: center; margin-top: 30px; color: #9ca3af; font-size: 12px;">
            This email was sent from the Amples Quote Form.
          </p>
        </div>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email', details: (error as Error).message }, { status: 500 });
    }
}
