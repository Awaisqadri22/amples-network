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
            floors, hasPets, comments,
            moveOutCleaningDate, isDateFlexible, dateFlexibilityRange,
            windowCleaningDate, windowsWithBars, windowsWithoutBars, topHungWindows,
            windowType, hasGlazedBalcony, windowHomeType, windowFloors, needsLadder,
            constructionWorkType, constructionCleaningIncludes, constructionCleaningDate,
            constructionHomeType, constructionAreaSize, constructionFloors
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
        } else if (selectedService === 'Move-out Cleaning') {
            serviceDetails = `
                <h3>Move-out Cleaning Details:</h3>
                ${moveOutCleaningDate ? `<p><strong>Moving-out Cleaning Date:</strong> ${new Date(moveOutCleaningDate).toLocaleString()}</p>` : ''}
                <p><strong>Is Date Flexible:</strong> ${isDateFlexible || 'Not specified'}</p>
                ${isDateFlexible === 'Yes' && dateFlexibilityRange ? `<p><strong>Date Flexibility Range:</strong> ${dateFlexibilityRange}</p>` : ''}
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
        } else if (selectedService === 'Window Cleaning') {
            serviceDetails = `
                <h3>Window Cleaning Details:</h3>
                ${windowCleaningDate ? `<p><strong>Window Cleaning Date:</strong> ${new Date(windowCleaningDate).toLocaleString()}</p>` : ''}
                <h4>Window Details:</h4>
                <ul>
                  <li><strong>Windows with bars:</strong> ${windowsWithBars || '0'}</li>
                  <li><strong>Windows without bars:</strong> ${windowsWithoutBars || '0'}</li>
                  <li><strong>Top-hung windows:</strong> ${topHungWindows || '0'}</li>
                </ul>
                <h4>Window Type:</h4>
                <ul>
                  ${Array.isArray(windowType) && windowType.length > 0 
                    ? windowType.map((type: string) => `<li>${type}</li>`).join('')
                    : '<li>Not specified</li>'}
                </ul>
                <p><strong>Has Glazed Balcony/Patio:</strong> ${hasGlazedBalcony || 'Not specified'}</p>
                <h4>Additional Information:</h4>
                <p><strong>Home Type:</strong> ${windowHomeType || 'Not specified'}</p>
                <p><strong>Number of Floors:</strong> ${windowFloors || 'Not specified'}</p>
                <p><strong>Needs Ladder:</strong> ${needsLadder || 'Not specified'}</p>
                <p><strong>Floors to Clean:</strong> ${floors || 'Not specified'}</p>
                <p><strong>Has Pets:</strong> ${hasPets || 'Not specified'}</p>
                ${comments ? `<p><strong>Comments:</strong> ${comments}</p>` : ''}
            `;
        } else if (selectedService === 'Construction Cleaning') {
            serviceDetails = `
                <h3>Construction Cleaning Details:</h3>
                <h4>Work Type:</h4>
                <ul>
                  ${Array.isArray(constructionWorkType) && constructionWorkType.length > 0 
                    ? constructionWorkType.map((type: string) => `<li>${type}</li>`).join('')
                    : '<li>Not specified</li>'}
                </ul>
                <h4>What should be included in the cleaning:</h4>
                <ul>
                  ${Array.isArray(constructionCleaningIncludes) && constructionCleaningIncludes.length > 0 
                    ? constructionCleaningIncludes.map((item: string) => `<li>${item}</li>`).join('')
                    : '<li>Not specified</li>'}
                </ul>
                <h4>Additional Information:</h4>
                ${constructionCleaningDate ? `<p><strong>Cleaning Date:</strong> ${new Date(constructionCleaningDate).toLocaleString()}</p>` : ''}
                <p><strong>Home Type:</strong> ${constructionHomeType || 'Not specified'}</p>
                <p><strong>Area Size:</strong> ${constructionAreaSize ? constructionAreaSize + ' sq m' : 'Not specified'}</p>
                <p><strong>Floors:</strong> ${constructionFloors || 'Not specified'}</p>
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
