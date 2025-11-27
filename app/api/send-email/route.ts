import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const requestData = await request.json();
        const {
            name, phone, email, address, message,
            formType, company, vatNumber,
            selectedService, homeType, cleanAll,
            areaSize, frequency, preferredDateTime,
            numberOfRooms, bedroom, kitchen, livingRoom,
            floors, hasPets, comments
        } = requestData;
        
        // Log all received data for debugging
        console.log('Received form data:', JSON.stringify(requestData, null, 2));

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

        // Construct Email Content
        let serviceDetails = '';
        if (selectedService === 'Home Cleaning') {
            serviceDetails = `
                <h3>Home Cleaning Details:</h3>
                <p><strong>Home Type:</strong> ${homeType || 'Not specified'}</p>
                <p><strong>Area Size:</strong> ${areaSize ? areaSize + ' sq m' : 'Not specified'}</p>
                <p><strong>Frequency:</strong> ${frequency || 'Not specified'}</p>
                ${preferredDateTime ? `<p><strong>Preferred Date & Time:</strong> ${new Date(preferredDateTime).toLocaleString()}</p>` : ''}
                <p><strong>Clean Entire Home:</strong> ${cleanAll || 'Not specified'}</p>
                <h4>Room Details:</h4>
                <ul>
                  <li><strong>Number of Rooms:</strong> ${numberOfRooms || '0'}</li>
                  <li><strong>Bedrooms:</strong> ${bedroom || '0'}</li>
                  <li><strong>Kitchens:</strong> ${kitchen || '0'}</li>
                  <li><strong>Living Rooms:</strong> ${livingRoom || '0'}</li>
                </ul>
                <h4>Additional Information:</h4>
                <p><strong>Floors:</strong> ${floors || 'Not specified'}</p>
                <p><strong>Has Pets:</strong> ${hasPets || 'Not specified'}</p>
                ${comments ? `<p><strong>Comments:</strong> ${comments}</p>` : ''}
            `;
        } else if (selectedService) {
            serviceDetails = `<h3>Service: ${selectedService}</h3>`;
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'awaisiqbalqadri22@gmail.com',
            subject: `New Quote Request from ${name} - ${selectedService || 'General Inquiry'}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">New Quote Request</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Address:</strong> ${address || 'Not provided'}</p>
            <p><strong>Type:</strong> ${formType === 'company' ? 'Company' : 'Private'}</p>
            ${formType === 'company' ? `
              <p><strong>Company:</strong> ${company}</p>
              <p><strong>VAT Number:</strong> ${vatNumber}</p>
            ` : ''}
          </div>

          <div style="background-color: #ecfeff; padding: 20px; border-radius: 8px; border: 1px solid #cffafe;">
            ${serviceDetails}
            
            ${message ? `
              <h3>Message:</h3>
              <p style="white-space: pre-wrap;">${message}</p>
            ` : ''}
          </div>
          
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px; text-align: center;">
            Sent from Amples Network Website
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
