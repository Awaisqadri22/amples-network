import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const requestData = await request.json();
        const {
            name, phone, email, address, message,
            formType, company, vatNumber,
            selectedService, serviceType, homeType, cleanAll,
            areaSize, squareMeter, frequency, preferredDateTime,
            numberOfRooms, bedroom, kitchen, livingRoom,
            floors, hasPets, comments,
            moveOutCleaningDate, isDateFlexible, dateFlexibilityRange,
            windowCleaningDate, windowsWithBars, windowsWithoutBars, topHungWindows,
            windowType, hasGlazedBalcony, windowHomeType, windowFloors, needsLadder,
            constructionWorkType, constructionCleaningIncludes, constructionCleaningDate,
            constructionHomeType, constructionAreaSize, constructionFloors,
            floorCleaningDate, floorCleaningIsDateFlexible, floorCleaningServices, floorCleaningTypes,
            officePremisesType, officeCleanAll, officeAreaSize, officeFrequency, officePreferredDateTime,
            officeSpace, kitchenSpace, diningRoom, meetingRoom, dressingRoom, toilet, otherRooms,
            officeFloors, officeEntranceFloor, officeHasElevator, officeAdditionalServices,
            detailHomeType, detailCleanAll, detailAreaSize, detailFrequency, detailPreferredDay, detailPreferredTime,
            detailBedroom, detailKitchen, detailBathroom, detailLivingRoom, detailOtherRooms, detailFloors,
            detailAdditionalCleaning,
            staircaseFrequency, staircasePreferredDay, staircasePreferredTime,
            staircaseProperties, staircaseStairwells, staircaseFloors,
            staircaseAdditionalCleaning, staircaseAdditionalServices
        } = requestData;
        
        // Log all received data for debugging
        console.log('Received form data:', JSON.stringify(requestData, null, 2));
        console.log('Environment check - EMAIL_USER exists:', !!process.env.EMAIL_USER);
        console.log('Environment check - EMAIL_PASS exists:', !!process.env.EMAIL_PASS);

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            const errorMsg = 'Missing email credentials. Make sure EMAIL_USER and EMAIL_PASS are set in Vercel environment variables.';
            console.error(errorMsg);
            console.error('EMAIL_USER:', process.env.EMAIL_USER ? 'Set (hidden)' : 'NOT SET');
            console.error('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set (hidden)' : 'NOT SET');
            return NextResponse.json({ 
                error: 'Server configuration error: Missing email credentials',
                details: 'Please configure EMAIL_USER and EMAIL_PASS in Vercel environment variables'
            }, { status: 500 });
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
            console.log('Transporter connection verified successfully');
        } catch (verifyError) {
            const errorDetails = verifyError as Error;
            console.error('Transporter verification failed:', errorDetails);
            console.error('Error name:', errorDetails.name);
            console.error('Error message:', errorDetails.message);
            console.error('Error stack:', errorDetails.stack);
            return NextResponse.json({ 
                error: 'Failed to connect to email service', 
                details: errorDetails.message,
                hint: 'Make sure you are using an App Password (not regular password) for Gmail. Enable 2FA and generate an App Password at: https://myaccount.google.com/apppasswords'
            }, { status: 500 });
        }

        // Construct Email Content
        let serviceDetails = '';
        const isContactForm = serviceType && squareMeter !== undefined;
        
        if (isContactForm) {
            // Contact Section Form
            serviceDetails = `
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <h4 style="margin: 0 0 12px 0; color: #06b6d4; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
                    <span style="display: inline-block; width: 8px; height: 8px; background-color: #06b6d4; border-radius: 50%; margin-right: 8px;"></span>
                    Service Request Details
                  </h4>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Service Type:</strong> <span style="color: #475569;">${serviceType || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Square Meter:</strong> <span style="color: #475569;">${squareMeter || 'Not specified'} m²</span></p>
                </div>
            `;
        } else if (selectedService === 'Home Cleaning') {
            serviceDetails = `
                <div style="margin-bottom: 20px;">
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Home Type:</strong> <span style="color: #475569;">${homeType || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Area Size:</strong> <span style="color: #475569;">${areaSize ? areaSize + ' sq m' : 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Frequency:</strong> <span style="color: #475569;">${frequency || 'Not specified'}</span></p>
                  ${preferredDateTime ? `<p style="margin: 8px 0;"><strong style="color: #1e293b;">Preferred Date & Time:</strong> <span style="color: #475569;">${new Date(preferredDateTime).toLocaleString()}</span></p>` : ''}
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Clean Entire Home:</strong> <span style="color: #475569;">${cleanAll || 'Not specified'}</span></p>
                </div>
                <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin: 15px 0;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Room Details</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #475569;">
                    <li style="margin: 6px 0;"><strong>Number of Rooms:</strong> ${numberOfRooms || '0'}</li>
                    <li style="margin: 6px 0;"><strong>Bedrooms:</strong> ${bedroom || '0'}</li>
                    <li style="margin: 6px 0;"><strong>Kitchens:</strong> ${kitchen || '0'}</li>
                    <li style="margin: 6px 0;"><strong>Living Rooms:</strong> ${livingRoom || '0'}</li>
                  </ul>
                </div>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #cbd5e1;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Additional Information</h4>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Floors:</strong> <span style="color: #475569;">${floors || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Has Pets:</strong> <span style="color: #475569;">${hasPets || 'Not specified'}</span></p>
                  ${comments ? `<div style="margin-top: 12px; padding: 12px; background-color: #f8fafc; border-left: 3px solid #06b6d4; border-radius: 4px;"><strong style="color: #1e293b;">Comments:</strong> <span style="color: #475569;">${comments}</span></div>` : ''}
                </div>
            `;
        } else if (selectedService === 'Move-out Cleaning') {
            serviceDetails = `
                <div style="margin-bottom: 20px;">
                  ${moveOutCleaningDate ? `<p style="margin: 8px 0;"><strong style="color: #1e293b;">Moving-out Cleaning Date:</strong> <span style="color: #475569;">${new Date(moveOutCleaningDate).toLocaleString()}</span></p>` : ''}
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Is Date Flexible:</strong> <span style="color: #475569;">${isDateFlexible || 'Not specified'}</span></p>
                  ${isDateFlexible === 'Yes' && dateFlexibilityRange ? `<p style="margin: 8px 0;"><strong style="color: #1e293b;">Date Flexibility Range:</strong> <span style="color: #475569;">${dateFlexibilityRange}</span></p>` : ''}
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Home Type:</strong> <span style="color: #475569;">${homeType || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Should Entire Home be Cleaned:</strong> <span style="color: #475569;">${cleanAll || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Area Size:</strong> <span style="color: #475569;">${areaSize ? areaSize + ' sq m' : 'Not specified'}</span></p>
                </div>
                <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin: 15px 0;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Room Details</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #475569;">
                    <li style="margin: 6px 0;"><strong>Number of Rooms:</strong> ${numberOfRooms || '0'}</li>
                    <li style="margin: 6px 0;"><strong>Bedrooms:</strong> ${bedroom || '0'}</li>
                    <li style="margin: 6px 0;"><strong>Kitchens:</strong> ${kitchen || '0'}</li>
                    <li style="margin: 6px 0;"><strong>Living Rooms:</strong> ${livingRoom || '0'}</li>
                  </ul>
                </div>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #cbd5e1;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Additional Information</h4>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Floors:</strong> <span style="color: #475569;">${floors || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Has Pets:</strong> <span style="color: #475569;">${hasPets || 'Not specified'}</span></p>
                  ${comments ? `<div style="margin-top: 12px; padding: 12px; background-color: #f8fafc; border-left: 3px solid #06b6d4; border-radius: 4px;"><strong style="color: #1e293b;">Comments:</strong> <span style="color: #475569;">${comments}</span></div>` : ''}
                </div>
            `;
        } else if (selectedService === 'Window Cleaning') {
            serviceDetails = `
                <div style="margin-bottom: 20px;">
                  ${windowCleaningDate ? `<p style="margin: 8px 0;"><strong style="color: #1e293b;">Window Cleaning Date:</strong> <span style="color: #475569;">${new Date(windowCleaningDate).toLocaleString()}</span></p>` : ''}
                </div>
                <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin: 15px 0;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Window Details</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #475569;">
                    <li style="margin: 6px 0;"><strong>Windows with bars:</strong> ${windowsWithBars || '0'}</li>
                    <li style="margin: 6px 0;"><strong>Windows without bars:</strong> ${windowsWithoutBars || '0'}</li>
                    <li style="margin: 6px 0;"><strong>Top-hung windows:</strong> ${topHungWindows || '0'}</li>
                  </ul>
                </div>
                <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin: 15px 0;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Window Type</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #475569;">
                    ${Array.isArray(windowType) && windowType.length > 0 
                      ? windowType.map((type: string) => `<li style="margin: 6px 0;">${type}</li>`).join('')
                      : '<li style="margin: 6px 0;">Not specified</li>'}
                  </ul>
                </div>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #cbd5e1;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Additional Information</h4>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Has Glazed Balcony/Patio:</strong> <span style="color: #475569;">${hasGlazedBalcony || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Number of Floors:</strong> <span style="color: #475569;">${windowFloors || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Needs Ladder:</strong> <span style="color: #475569;">${needsLadder || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Floors to Clean:</strong> <span style="color: #475569;">${floors || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Has Pets:</strong> <span style="color: #475569;">${hasPets || 'Not specified'}</span></p>
                  ${comments ? `<div style="margin-top: 12px; padding: 12px; background-color: #f8fafc; border-left: 3px solid #06b6d4; border-radius: 4px;"><strong style="color: #1e293b;">Comments:</strong> <span style="color: #475569;">${comments}</span></div>` : ''}
                </div>
            `;
        } else if (selectedService === 'Construction Cleaning') {
            serviceDetails = `
                <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin: 15px 0;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Work Type</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #475569;">
                    ${Array.isArray(constructionWorkType) && constructionWorkType.length > 0 
                      ? constructionWorkType.map((type: string) => `<li style="margin: 6px 0;">${type}</li>`).join('')
                      : '<li style="margin: 6px 0;">Not specified</li>'}
                  </ul>
                </div>
                <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin: 15px 0;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">What should be included in the cleaning</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #475569;">
                    ${Array.isArray(constructionCleaningIncludes) && constructionCleaningIncludes.length > 0 
                      ? constructionCleaningIncludes.map((item: string) => `<li style="margin: 6px 0;">${item}</li>`).join('')
                      : '<li style="margin: 6px 0;">Not specified</li>'}
                  </ul>
                </div>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #cbd5e1;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Additional Information</h4>
                  ${constructionCleaningDate ? `<p style="margin: 8px 0;"><strong style="color: #1e293b;">Cleaning Date:</strong> <span style="color: #475569;">${new Date(constructionCleaningDate).toLocaleString()}</span></p>` : ''}
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Home Type:</strong> <span style="color: #475569;">${constructionHomeType || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Area Size:</strong> <span style="color: #475569;">${constructionAreaSize ? constructionAreaSize + ' sq m' : 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Floors:</strong> <span style="color: #475569;">${constructionFloors || 'Not specified'}</span></p>
                  ${comments ? `<div style="margin-top: 12px; padding: 12px; background-color: #f8fafc; border-left: 3px solid #06b6d4; border-radius: 4px;"><strong style="color: #1e293b;">Comments:</strong> <span style="color: #475569;">${comments}</span></div>` : ''}
                </div>
            `;
        } else if (selectedService === 'Floor Cleaning') {
            serviceDetails = `
                <div style="margin-bottom: 20px;">
                  ${floorCleaningDate ? `<p style="margin: 8px 0;"><strong style="color: #1e293b;">Service Date:</strong> <span style="color: #475569;">${new Date(floorCleaningDate).toLocaleDateString()}</span></p>` : ''}
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Is Date Flexible:</strong> <span style="color: #475569;">${floorCleaningIsDateFlexible || 'Not specified'}</span></p>
                </div>
                <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin: 15px 0;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Services Requested</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #475569;">
                    ${Array.isArray(floorCleaningServices) && floorCleaningServices.length > 0 
                      ? floorCleaningServices.map((service: string) => `<li style="margin: 6px 0;">${service}</li>`).join('')
                      : '<li style="margin: 6px 0;">Not specified</li>'}
                  </ul>
                </div>
                <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin: 15px 0;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Floor Types</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #475569;">
                    ${Array.isArray(floorCleaningTypes) && floorCleaningTypes.length > 0 
                      ? floorCleaningTypes.map((type: string) => `<li style="margin: 6px 0;">${type}</li>`).join('')
                      : '<li style="margin: 6px 0;">Not specified</li>'}
                </ul>
                </div>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #cbd5e1;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Additional Information</h4>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Type of Residence:</strong> <span style="color: #475569;">${floors || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Has Pets:</strong> <span style="color: #475569;">${hasPets || 'Not specified'}</span></p>
                  ${comments ? `<div style="margin-top: 12px; padding: 12px; background-color: #f8fafc; border-left: 3px solid #06b6d4; border-radius: 4px;"><strong style="color: #1e293b;">Comments:</strong> <span style="color: #475569;">${comments}</span></div>` : ''}
                </div>
            `;
        } else if (selectedService === 'Office Cleaning') {
            serviceDetails = `
                <div style="margin-bottom: 20px;">
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Type of Premises:</strong> <span style="color: #475569;">${officePremisesType || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Should Entire Premises be Cleaned:</strong> <span style="color: #475569;">${officeCleanAll || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Area Size:</strong> <span style="color: #475569;">${officeAreaSize ? officeAreaSize + ' sq m' : 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Frequency:</strong> <span style="color: #475569;">${officeFrequency || 'Not specified'}</span></p>
                  ${officePreferredDateTime ? `<p style="margin: 8px 0;"><strong style="color: #1e293b;">Preferred Date & Time:</strong> <span style="color: #475569;">${new Date(officePreferredDateTime).toLocaleString()}</span></p>` : ''}
                </div>
                <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin: 15px 0;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Room Details</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #475569;">
                    <li style="margin: 6px 0;"><strong>Office Space:</strong> ${officeSpace || '0'}</li>
                    <li style="margin: 6px 0;"><strong>Kitchen Space:</strong> ${kitchenSpace || '0'}</li>
                    <li style="margin: 6px 0;"><strong>Dining Room:</strong> ${diningRoom || '0'}</li>
                    <li style="margin: 6px 0;"><strong>Meeting Room:</strong> ${meetingRoom || '0'}</li>
                    <li style="margin: 6px 0;"><strong>Dressing Room:</strong> ${dressingRoom || '0'}</li>
                    <li style="margin: 6px 0;"><strong>Toilet:</strong> ${toilet || '0'}</li>
                    <li style="margin: 6px 0;"><strong>Other Rooms:</strong> ${otherRooms || '0'}</li>
                  </ul>
                </div>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #cbd5e1;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Building Information</h4>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Number of Floors:</strong> <span style="color: #475569;">${officeFloors || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Entrance Floor:</strong> <span style="color: #475569;">${officeEntranceFloor || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Has Elevator:</strong> <span style="color: #475569;">${officeHasElevator || 'Not specified'}</span></p>
                </div>
                ${Array.isArray(officeAdditionalServices) && officeAdditionalServices.length > 0 ? `
                <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; margin: 15px 0;">
                  <h4 style="margin: 0 0 12px 0; color: #1e293b; font-size: 16px; font-weight: 600;">Additional Services</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #475569;">
                    ${officeAdditionalServices.map((service: string) => `<li style="margin: 6px 0;">${service}</li>`).join('')}
                  </ul>
                </div>
                ` : ''}
            `;
        } else if (selectedService === 'Detail Cleaning') {
            serviceDetails = `
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <h4 style="margin: 0 0 12px 0; color: #06b6d4; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
                    <span style="display: inline-block; width: 8px; height: 8px; background-color: #06b6d4; border-radius: 50%; margin-right: 8px;"></span>
                    Basic Information
                  </h4>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Home Type:</strong> <span style="color: #475569;">${detailHomeType || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Should Entire Home be Cleaned:</strong> <span style="color: #475569;">${detailCleanAll || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Area Size:</strong> <span style="color: #475569;">${detailAreaSize ? detailAreaSize + ' sq m' : 'Not specified'}</span></p>
                </div>
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <h4 style="margin: 0 0 12px 0; color: #06b6d4; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
                    <span style="display: inline-block; width: 8px; height: 8px; background-color: #06b6d4; border-radius: 50%; margin-right: 8px;"></span>
                    Cleaning Schedule
                  </h4>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Frequency:</strong> <span style="color: #475569;">${detailFrequency || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Preferred Day:</strong> <span style="color: #475569;">${detailPreferredDay || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Preferred Time:</strong> <span style="color: #475569;">${detailPreferredTime || 'Not specified'}</span></p>
                </div>
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <h4 style="margin: 0 0 12px 0; color: #06b6d4; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
                    <span style="display: inline-block; width: 8px; height: 8px; background-color: #06b6d4; border-radius: 50%; margin-right: 8px;"></span>
                    Room Details
                  </h4>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="margin: 6px 0;"><strong style="color: #1e293b;">Bedroom:</strong> <span style="color: #475569;">${detailBedroom || '0'}</span></li>
                    <li style="margin: 6px 0;"><strong style="color: #1e293b;">Kitchen:</strong> <span style="color: #475569;">${detailKitchen || '0'}</span></li>
                    <li style="margin: 6px 0;"><strong style="color: #1e293b;">Bathroom:</strong> <span style="color: #475569;">${detailBathroom || '0'}</span></li>
                    <li style="margin: 6px 0;"><strong style="color: #1e293b;">Living Room:</strong> <span style="color: #475569;">${detailLivingRoom || '0'}</span></li>
                    <li style="margin: 6px 0;"><strong style="color: #1e293b;">Other Rooms:</strong> <span style="color: #475569;">${detailOtherRooms || '0'}</span></li>
                  </ul>
                  <p style="margin: 12px 0 0 0;"><strong style="color: #1e293b;">Number of Floors:</strong> <span style="color: #475569;">${detailFloors || 'Not specified'}</span></p>
                  ${Array.isArray(detailAdditionalCleaning) && detailAdditionalCleaning.length > 0 ? `
                  <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 8px 0; color: #1e293b; font-weight: 600;">Additional Cleaning Options:</p>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                      ${detailAdditionalCleaning.map((item: string) => `<li style="margin: 4px 0; color: #475569;">• ${item}</li>`).join('')}
                    </ul>
                  </div>
                  ` : ''}
                </div>
            `;
        } else if (selectedService === 'Staircase Cleaning') {
            serviceDetails = `
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <h4 style="margin: 0 0 12px 0; color: #06b6d4; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
                    <span style="display: inline-block; width: 8px; height: 8px; background-color: #06b6d4; border-radius: 50%; margin-right: 8px;"></span>
                    Cleaning Schedule
                  </h4>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Frequency:</strong> <span style="color: #475569;">${staircaseFrequency || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Preferred Day:</strong> <span style="color: #475569;">${staircasePreferredDay || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Preferred Time:</strong> <span style="color: #475569;">${staircasePreferredTime || 'Not specified'}</span></p>
                </div>
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <h4 style="margin: 0 0 12px 0; color: #06b6d4; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
                    <span style="display: inline-block; width: 8px; height: 8px; background-color: #06b6d4; border-radius: 50%; margin-right: 8px;"></span>
                    Property and Stairwell Details
                  </h4>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Number of Properties:</strong> <span style="color: #475569;">${staircaseProperties || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Number of Stairwells:</strong> <span style="color: #475569;">${staircaseStairwells || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Floors per Stairwell:</strong> <span style="color: #475569;">${staircaseFloors || 'Not specified'}</span></p>
                </div>
                ${Array.isArray(staircaseAdditionalCleaning) && staircaseAdditionalCleaning.length > 0 ? `
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <h4 style="margin: 0 0 12px 0; color: #06b6d4; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
                    <span style="display: inline-block; width: 8px; height: 8px; background-color: #06b6d4; border-radius: 50%; margin-right: 8px;"></span>
                    Additional Cleaning Options
                  </h4>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    ${staircaseAdditionalCleaning.map((item: string) => `<li style="margin: 4px 0; color: #475569;">• ${item}</li>`).join('')}
                  </ul>
                </div>
                ` : ''}
                ${Array.isArray(staircaseAdditionalServices) && staircaseAdditionalServices.length > 0 ? `
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <h4 style="margin: 0 0 12px 0; color: #06b6d4; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
                    <span style="display: inline-block; width: 8px; height: 8px; background-color: #06b6d4; border-radius: 50%; margin-right: 8px;"></span>
                    Additional Services
                  </h4>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    ${staircaseAdditionalServices.map((item: string) => `<li style="margin: 4px 0; color: #475569;">• ${item}</li>`).join('')}
                  </ul>
                </div>
                ` : ''}
            `;
        } else if (selectedService) {
            serviceDetails = `<div style="margin-bottom: 20px;"><h3 style="margin: 0; color: #1e293b; font-size: 18px; font-weight: 600;">Service: ${selectedService}</h3></div>`;
        }

        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`, // Use authenticated email as sender, but display user's name
            replyTo: email, // Set reply-to to user's email so replies go to them
            to: 'awaisiqbalqadri22@gmail.com', // Send to admin email
            cc: email && email.trim() ? email : undefined, // Send copy to user's email
            subject: isContactForm 
                ? `New Contact Form Submission from ${name} - ${serviceType || 'General Inquiry'}`
                : `New Job from ${name} - ${selectedService || 'General Inquiry'}`,
            html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Job Request</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f7fa; line-height: 1.6;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f7fa; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">New Job Request</h1>
                      <p style="margin: 10px 0 0 0; color: #e0f2fe; font-size: 16px; font-weight: 400;">${selectedService || 'General Inquiry'}</p>
                    </td>
                  </tr>

                  <!-- Contact Information Section -->
                  <tr>
                    <td style="padding: 30px;">
                      <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid #06b6d4; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
                        <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                          <span style="display: inline-block; width: 8px; height: 8px; background-color: #06b6d4; border-radius: 50%; margin-right: 12px;"></span>
                          Contact Information
                        </h2>
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="padding: 8px 0; color: #475569; font-size: 15px;">
                              <strong style="color: #1e293b; display: inline-block; min-width: 100px;">Name:</strong> ${name}
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #475569; font-size: 15px;">
                              <strong style="color: #1e293b; display: inline-block; min-width: 100px;">Phone:</strong> 
                              <a href="tel:${phone}" style="color: #06b6d4; text-decoration: none;">${phone}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #475569; font-size: 15px;">
                              <strong style="color: #1e293b; display: inline-block; min-width: 100px;">Email:</strong> 
                              <a href="mailto:${email}" style="color: #06b6d4; text-decoration: none;">${email}</a>
                            </td>
                          </tr>
                          ${address ? `
                          <tr>
                            <td style="padding: 8px 0; color: #475569; font-size: 15px;">
                              <strong style="color: #1e293b; display: inline-block; min-width: 100px;">Address:</strong> ${address}
                            </td>
                          </tr>
                          ` : ''}
                          <tr>
                            <td style="padding: 8px 0; color: #475569; font-size: 15px;">
                              <strong style="color: #1e293b; display: inline-block; min-width: 100px;">Type:</strong> 
                              <span style="display: inline-block; background-color: ${formType === 'company' ? '#dbeafe' : '#dcfce7'}; color: ${formType === 'company' ? '#1e40af' : '#166534'}; padding: 4px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">
                                ${formType === 'company' ? 'Company' : 'Private'}
                              </span>
                            </td>
                          </tr>
            ${formType === 'company' ? `
                          <tr>
                            <td style="padding: 8px 0; color: #475569; font-size: 15px;">
                              <strong style="color: #1e293b; display: inline-block; min-width: 100px;">Company:</strong> ${company}
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #475569; font-size: 15px;">
                              <strong style="color: #1e293b; display: inline-block; min-width: 100px;">VAT Number:</strong> ${vatNumber}
                            </td>
                          </tr>
            ` : ''}
                        </table>
          </div>

                      <!-- Service Details Section -->
                      <div style="background: linear-gradient(135deg, #ecfeff 0%, #e0f2fe 100%); border-left: 4px solid #10b981; padding: 25px; border-radius: 8px; margin-bottom: ${message ? '25px' : '0'};">
                        <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                          <span style="display: inline-block; width: 8px; height: 8px; background-color: #10b981; border-radius: 50%; margin-right: 12px;"></span>
                          Service Details
                        </h2>
                        <div style="color: #334155; font-size: 15px; line-height: 1.8;">
            ${serviceDetails}
                        </div>
                        ${message ? `
                        <div style="margin-top: 25px; padding-top: 25px; border-top: 2px solid #cbd5e1;">
                          <h3 style="margin: 0 0 12px 0; color: #1e293b; font-size: 18px; font-weight: 600;">Additional Message</h3>
                          <p style="margin: 0; color: #475569; font-size: 15px; white-space: pre-wrap; background-color: #ffffff; padding: 15px; border-radius: 6px; border-left: 3px solid #06b6d4;">${message}</p>
                        </div>
                        ` : ''}
          </div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <p style="margin: 0; color: #64748b; font-size: 13px; line-height: 1.6;">
                        This email was sent from the <strong style="color: #1e293b;">Amples Network Website</strong><br>
                        <span style="color: #94a3b8; font-size: 12px;">Please reply directly to this email to contact the customer.</span>
                      </p>
                      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0; color: #94a3b8; font-size: 11px;">
                          © ${new Date().getFullYear()} Amples Network. All rights reserved.
          </p>
        </div>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
        };

        console.log('Attempting to send email...');
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully. Message ID:', result.messageId);
        console.log('Response:', result.response);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        const errorDetails = error as Error;
        console.error('Error sending email:', errorDetails);
        console.error('Error name:', errorDetails.name);
        console.error('Error message:', errorDetails.message);
        console.error('Error stack:', errorDetails.stack);
        
        // Provide more helpful error messages
        let userFriendlyError = 'Failed to send email';
        let hint = '';
        
        if (errorDetails.message.includes('Invalid login')) {
            userFriendlyError = 'Email authentication failed';
            hint = 'Please verify EMAIL_USER and EMAIL_PASS are correct. Use an App Password for Gmail.';
        } else if (errorDetails.message.includes('timeout')) {
            userFriendlyError = 'Email service timeout';
            hint = 'The email service took too long to respond. Please try again.';
        } else if (errorDetails.message.includes('ECONNREFUSED') || errorDetails.message.includes('ENOTFOUND')) {
            userFriendlyError = 'Cannot connect to email service';
            hint = 'Network error. Please check your internet connection and try again.';
        }
        
        return NextResponse.json({ 
            error: userFriendlyError, 
            details: errorDetails.message,
            hint: hint || 'Please check server logs for more details'
        }, { status: 500 });
    }
}
