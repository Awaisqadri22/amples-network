import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { randomBytes } from 'crypto';

/**
 * Calculate price based on square meters (kvm)
 * Pricing structure:
 * 0-29 kvm: 1575 kr
 * 30-39 kvm: 1725 kr (average of 1675-1775)
 * 40-49 kvm: 1825 kr (average of 1775-1875)
 * 50-59 kvm: 1925 kr (average of 1875-1975)
 * 60-69 kvm: 2125 kr (average of 2075-2175)
 * 70-79 kvm: 2325 kr (average of 2275-2375)
 * 80-89 kvm: 2450 kr (average of 2400-2500)
 * 90-100 kvm: 2900 kr (average of 2800-3000)
 * > 100 kvm: 3000 + (additional 10 kvm blocks * 200 kr)
 * > 200 kvm: 5000 + (additional kvm * 30 kr/kvm)
 */
function calculatePrice(squareMeters: number | string | undefined): { price: number } | null {
    if (!squareMeters) return null;
    
    const sqm = typeof squareMeters === 'string' ? parseFloat(squareMeters) : squareMeters;
    if (isNaN(sqm) || sqm < 0) return null;
    
    // Round to nearest integer for calculations
    const roundedSqm = Math.round(sqm);
    
    // Base pricing tiers (single price per tier)
    if (roundedSqm >= 0 && roundedSqm <= 29) return { price: 1575 };
    if (roundedSqm >= 30 && roundedSqm <= 39) return { price: 1725 };
    if (roundedSqm >= 40 && roundedSqm <= 49) return { price: 1825 };
    if (roundedSqm >= 50 && roundedSqm <= 59) return { price: 1925 };
    if (roundedSqm >= 60 && roundedSqm <= 69) return { price: 2125 };
    if (roundedSqm >= 70 && roundedSqm <= 79) return { price: 2325 };
    if (roundedSqm >= 80 && roundedSqm <= 89) return { price: 2450 };
    if (roundedSqm >= 90 && roundedSqm <= 100) return { price: 2900 };
    if (roundedSqm > 100 && roundedSqm <= 200) {
        const additionalKvm = roundedSqm - 100;
        const additionalBlocks = Math.ceil(additionalKvm / 10);
        return { price: 3000 + (additionalBlocks * 200) };
    }
    const additionalKvm = roundedSqm - 200;
    return { price: 5000 + (additionalKvm * 30) };
}

export async function POST(request: Request) {
    try {
        // Get the base URL from request (works for both localhost and production)
        const getBaseUrl = () => {
            // Check environment variable first (highest priority)
            if (process.env.NEXT_PUBLIC_SITE_URL) {
                console.log('Using NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL);
                return process.env.NEXT_PUBLIC_SITE_URL;
            }
            if (process.env.SITE_URL) {
                console.log('Using SITE_URL:', process.env.SITE_URL);
                return process.env.SITE_URL;
            }
            
            // Try to get from request URL (most reliable)
            try {
                const url = new URL(request.url);
                const baseUrl = `${url.protocol}//${url.host}`;
                console.log('Using request URL:', baseUrl);
                return baseUrl;
            } catch {
                // If URL parsing fails, try headers
                const host = request.headers.get('host');
                const protocol = request.headers.get('x-forwarded-proto') || 
                              request.headers.get('x-forwarded-protocol') ||
                              (host?.includes('localhost') || host?.includes('127.0.0.1') ? 'http' : 'https');
                
                if (host) {
                    const baseUrl = `${protocol}://${host}`;
                    console.log('Using headers URL:', baseUrl);
                    return baseUrl;
                }
            }
            
            // Last resort fallback
            console.warn('⚠️ Could not determine base URL, using fallback');
            return 'https://amples.se';
        };

        const requestData = await request.json();
        const {
            name, phone, email, address, message,
            formType, company, vatNumber,
            selectedService, serviceType, homeType, cleanAll,
            areaSize, squareMeter, city, frequency, preferredDateTime,
            numberOfRooms, bedroom, kitchen, livingRoom,
            floors, hasPets, comments,
            moveOutCleaningDate, isDateFlexible, dateFlexibilityRange,
            windowCleaningDate, windowsWithBars, windowsWithoutBars, topHungWindows,
            windowType, hasGlazedBalcony, windowFloors, needsLadder,
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
        console.log('Environment check - RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
        console.log('📧 Email from form:', email);
        console.log('📧 Email type:', typeof email);
        console.log('📧 Email after trim:', email ? email.trim() : 'null/undefined');
        console.log('📧 Email validation check:', !!(email && email.trim()));

        if (!process.env.RESEND_API_KEY) {
            const errorMsg = 'Missing email service configuration. RESEND_API_KEY is not set.';
            console.error(errorMsg);
            console.error('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Set (hidden)' : 'NOT SET');
            const hint = typeof window === 'undefined' && !process.env.VERCEL
                ? 'For local dev: add RESEND_API_KEY to .env.local in the project root, then restart the dev server (npm run dev).'
                : 'For Vercel: add RESEND_API_KEY in Project Settings → Environment Variables.';
            return NextResponse.json({ 
                error: 'Server configuration error: Missing email service configuration',
                details: 'RESEND_API_KEY is required. Get your API key from https://resend.com/api-keys',
                hint
            }, { status: 500 });
        }

        // Initialize Resend
        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json({ 
                error: 'Email service not configured', 
                details: 'RESEND_API_KEY environment variable is missing',
                hint: 'Please set RESEND_API_KEY in your environment variables'
            }, { status: 500 });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        // Generate unique confirmation token
        const generateConfirmationToken = (): string => {
            return randomBytes(32).toString('hex');
        };

        // Set token expiration (7 days from now)
        const tokenExpiresAt = new Date();
        tokenExpiresAt.setDate(tokenExpiresAt.getDate() + 7);

        // Save to Neon Database using Prisma
        let userDoc = null;
        let savedRecord: { id: string; confirmationToken: string | null } | null = null;
        try {
            const rawEmail = typeof email === 'string' ? email.trim() : '';
            const normalizedEmail = rawEmail ? rawEmail.toLowerCase() : '';

            // Create or update user if email is provided
            if (normalizedEmail) {
                userDoc = await prisma.user.upsert({
                    where: { email: normalizedEmail },
                    update: {
                        ...(name && { name }),
                        ...(phone && { phone }),
                    },
                    create: {
                        email: normalizedEmail,
                        ...(name && { name }),
                        ...(phone && { phone }),
                    },
                });
                console.log('✅ User saved/updated:', userDoc.id);
            }

            // Generate confirmation token
            const confirmationToken = generateConfirmationToken();

            // Determine if this is a booking or quote
            const submissionKind = requestData.submissionKind === 'booking' ? 'booking' : 'quote';
            
            // Prepare submission data
            const submissionPayload = {
                // User reference
                userId: userDoc?.id || null,
                userEmail: rawEmail || undefined,
                
                // Basic contact info
                name,
                phone,
                email: rawEmail || undefined,
                address,
                
                // Service information
                serviceType,
                selectedService,
                squareMeter,
                city,
                formType,
                company,
                vatNumber,
                message,
                
                // Common fields
                homeType,
                cleanAll,
                areaSize,
                frequency,
                preferredDateTime: preferredDateTime ? new Date(preferredDateTime) : undefined,
                numberOfRooms,
                bedroom,
                kitchen,
                livingRoom,
                floors,
                hasPets,
                comments,
                
                // Move-out Cleaning
                moveOutCleaningDate: moveOutCleaningDate ? new Date(moveOutCleaningDate) : undefined,
                isDateFlexible,
                dateFlexibilityRange,
                
                // Window Cleaning
                windowCleaningDate: windowCleaningDate ? new Date(windowCleaningDate) : undefined,
                windowsWithBars,
                windowsWithoutBars,
                topHungWindows,
                windowType: Array.isArray(windowType) ? windowType : [],
                hasGlazedBalcony,
                windowFloors,
                needsLadder,
                
                // Construction Cleaning
                constructionWorkType: Array.isArray(constructionWorkType) ? constructionWorkType : [],
                constructionCleaningIncludes: Array.isArray(constructionCleaningIncludes) ? constructionCleaningIncludes : [],
                constructionCleaningDate: constructionCleaningDate ? new Date(constructionCleaningDate) : undefined,
                constructionHomeType,
                constructionAreaSize,
                constructionFloors,
                
                // Floor Cleaning
                floorCleaningDate: floorCleaningDate ? new Date(floorCleaningDate) : undefined,
                floorCleaningIsDateFlexible,
                floorCleaningServices: Array.isArray(floorCleaningServices) ? floorCleaningServices : [],
                floorCleaningTypes: Array.isArray(floorCleaningTypes) ? floorCleaningTypes : [],
                
                // Office Cleaning
                officePremisesType,
                officeCleanAll,
                officeAreaSize,
                officeFrequency,
                officePreferredDateTime: officePreferredDateTime ? new Date(officePreferredDateTime) : undefined,
                officeSpace,
                kitchenSpace,
                diningRoom,
                meetingRoom,
                dressingRoom,
                toilet,
                otherRooms,
                officeFloors,
                officeEntranceFloor,
                officeHasElevator,
                officeAdditionalServices: Array.isArray(officeAdditionalServices) ? officeAdditionalServices : [],
                
                // Detail Cleaning
                detailHomeType,
                detailCleanAll,
                detailAreaSize,
                detailFrequency,
                detailPreferredDay,
                detailPreferredTime,
                detailBedroom,
                detailKitchen,
                detailBathroom,
                detailLivingRoom,
                detailOtherRooms,
                detailFloors,
                detailAdditionalCleaning: Array.isArray(detailAdditionalCleaning) ? detailAdditionalCleaning : [],
                
                // Staircase Cleaning
                staircaseFrequency,
                staircasePreferredDay,
                staircasePreferredTime,
                staircaseProperties,
                staircaseStairwells,
                staircaseFloors,
                staircaseAdditionalCleaning: Array.isArray(staircaseAdditionalCleaning) ? staircaseAdditionalCleaning : [],
                staircaseAdditionalServices: Array.isArray(staircaseAdditionalServices) ? staircaseAdditionalServices : [],
                
                // Metadata
                source: 'website',
                details: requestData as Prisma.InputJsonValue, // Store full request data as JSON
                
                // Confirmation fields
                confirmationToken,
                tokenExpiresAt,
                status: 'price-sent', // Set status to 'price-sent' when email is sent
            };

            // Save as Booking or Quote
            if (submissionKind === 'booking') {
                await prisma.booking.create({ 
                    data: submissionPayload
                });
                savedRecord = { id: 'temp', confirmationToken: confirmationToken };
                console.log('✅ Booking saved to database with confirmation token');
            } else {
                await prisma.quote.create({ 
                    data: submissionPayload
                });
                savedRecord = { id: 'temp', confirmationToken: confirmationToken };
                console.log('✅ Quote saved to database with confirmation token');
            }
        } catch (dbError) {
            console.error('❌ Database save failed (continuing with email):', dbError);
            // Continue with email sending even if DB save fails
        }

        // Calculate price estimation early (before constructing email)
        const squareMeterValue = squareMeter || areaSize || constructionAreaSize || officeAreaSize || detailAreaSize;
        const priceInfo = calculatePrice(squareMeterValue);
        
        // Helper function to remove price estimation from service details for admin email
        const removePriceFromServiceDetails = (details: string): string => {
            // Remove price estimation sections - these are embedded in template literals
            // Pattern: ${priceInfo ? `...price estimation HTML...` : ''}
            // We need to remove the entire conditional block including the paragraph
            let cleaned = details;
            
            // Remove price estimation paragraphs that contain "Price Estimation" text
            cleaned = cleaned.replace(/<p[^>]*margin[^>]*>[\s\S]*?<strong[^>]*>Price Estimation<\/strong>[\s\S]*?<\/p>/gi, '');
            
            // Remove price info blocks that might be in different formats
            cleaned = cleaned.replace(/<p[^>]*>[\s\S]{0,200}Price Estimation[\s\S]{0,500}?kr[\s\S]{0,200}?<\/p>/gi, '');
            
            // Remove any standalone price estimation paragraphs
            cleaned = cleaned.replace(/<p[^>]*>[\s\S]*?Price Estimation[\s\S]*?<\/p>/gi, '');
            
            return cleaned;
        };
        
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
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">City:</strong> <span style="color: #475569;">${city || 'Not specified'}</span></p>
                  ${priceInfo ? `
                  <p style="margin: 8px 0;">
                    <strong style="color: #1e293b;">Price Estimation:</strong> 
                    <span style="color: #10b981; font-weight: 600; font-size: 16px;">${priceInfo.price} kr</span>
                  </p>
                  ` : ''}
                </div>
            `;
        } else if (selectedService === 'Home Cleaning') {
            const homePriceInfo = calculatePrice(areaSize);
            serviceDetails = `
                <div style="margin-bottom: 20px;">
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Home Type:</strong> <span style="color: #475569;">${homeType || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Area Size:</strong> <span style="color: #475569;">${areaSize ? areaSize + ' sq m' : 'Not specified'}</span></p>
                  ${homePriceInfo ? `
                  <p style="margin: 8px 0;">
                    <strong style="color: #1e293b;">Price Estimation:</strong> 
                    <span style="color: #10b981; font-weight: 600; font-size: 16px;">${homePriceInfo.price} kr</span>
                  </p>
                  ` : ''}
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
            const moveOutPriceInfo = calculatePrice(areaSize);
            serviceDetails = `
                <div style="margin-bottom: 20px;">
                  ${moveOutCleaningDate ? `<p style="margin: 8px 0;"><strong style="color: #1e293b;">Moving-out Cleaning Date:</strong> <span style="color: #475569;">${new Date(moveOutCleaningDate).toLocaleDateString()}</span></p>` : ''}
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Is Date Flexible:</strong> <span style="color: #475569;">${isDateFlexible || 'Not specified'}</span></p>
                  ${isDateFlexible === 'Yes' && dateFlexibilityRange ? `<p style="margin: 8px 0;"><strong style="color: #1e293b;">Date Flexibility Range:</strong> <span style="color: #475569;">${dateFlexibilityRange}</span></p>` : ''}
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Home Type:</strong> <span style="color: #475569;">${homeType || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Should Entire Home be Cleaned:</strong> <span style="color: #475569;">${cleanAll || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Area Size:</strong> <span style="color: #475569;">${areaSize ? areaSize + ' sq m' : 'Not specified'}</span></p>
                  ${moveOutPriceInfo ? `
                  <p style="margin: 8px 0;">
                    <strong style="color: #1e293b;">Price Estimation:</strong> 
                    <span style="color: #10b981; font-weight: 600; font-size: 16px;">${moveOutPriceInfo.price} kr</span>
                  </p>
                  ` : ''}
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
            const constructionPriceInfo = calculatePrice(constructionAreaSize);
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
                  ${constructionPriceInfo ? `
                  <p style="margin: 8px 0;">
                    <strong style="color: #1e293b;">Price Estimation:</strong> 
                    <span style="color: #10b981; font-weight: 600; font-size: 16px;">${constructionPriceInfo.price} kr</span>
                  </p>
                  ` : ''}
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
            const officePriceInfo = calculatePrice(officeAreaSize);
            serviceDetails = `
                <div style="margin-bottom: 20px;">
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Type of Premises:</strong> <span style="color: #475569;">${officePremisesType || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Should Entire Premises be Cleaned:</strong> <span style="color: #475569;">${officeCleanAll || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Area Size:</strong> <span style="color: #475569;">${officeAreaSize ? officeAreaSize + ' sq m' : 'Not specified'}</span></p>
                  ${officePriceInfo ? `
                  <p style="margin: 8px 0;">
                    <strong style="color: #1e293b;">Price Estimation:</strong> 
                    <span style="color: #10b981; font-weight: 600; font-size: 16px;">${officePriceInfo.price} kr</span>
                  </p>
                  ` : ''}
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
            const detailPriceInfo = calculatePrice(detailAreaSize);
            serviceDetails = `
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
                  <h4 style="margin: 0 0 12px 0; color: #06b6d4; font-size: 16px; font-weight: 600; display: flex; align-items: center;">
                    <span style="display: inline-block; width: 8px; height: 8px; background-color: #06b6d4; border-radius: 50%; margin-right: 8px;"></span>
                    Basic Information
                  </h4>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Home Type:</strong> <span style="color: #475569;">${detailHomeType || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Should Entire Home be Cleaned:</strong> <span style="color: #475569;">${detailCleanAll || 'Not specified'}</span></p>
                  <p style="margin: 8px 0;"><strong style="color: #1e293b;">Area Size:</strong> <span style="color: #475569;">${detailAreaSize ? detailAreaSize + ' sq m' : 'Not specified'}</span></p>
                  ${detailPriceInfo ? `
                  <p style="margin: 8px 0;">
                    <strong style="color: #1e293b;">Price Estimation:</strong> 
                    <span style="color: #10b981; font-weight: 600; font-size: 16px;">${detailPriceInfo.price} kr</span>
                  </p>
                  ` : ''}
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

        const siteUrl = getBaseUrl();
        const contactSectionUrl = `${siteUrl}/#contacts`;
        // const logoUrl = `${siteUrl}/amples%20logo.png`;
        const displayService = serviceType || selectedService || 'Cleaning Service';
        const displaySquareMeter = squareMeter || areaSize || constructionAreaSize || officeAreaSize || detailAreaSize || 'Not specified';
        // const displayCity = city || 'Not specified';
        
        // Generate confirmation link
        const confirmationToken = savedRecord?.confirmationToken || '';
        const confirmationUrl = confirmationToken ? `${siteUrl}/confirm/${confirmationToken}` : null;
        
        console.log('🔗 Confirmation URL generated:', confirmationUrl);

        const adminMailOptions = {
            from: 'Amples <noreply@amples.se>',
            replyTo: email, // Set reply-to to user's email so replies go to them
            to: 'info@amples.se', // Send to admin email
            // Optional: Add BCC for additional email records
            // bcc: 'info@amples.se', // Uncomment if you want to BCC another email
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
                        ${priceInfo ? `
                        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 4px solid #10b981; padding: 18px; border-radius: 8px; margin: 0 0 20px 0;">
                          <h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 17px; font-weight: 600;">Price Estimation</h3>
                          <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px;">
                            <strong style="color: #1e293b;">Service Area:</strong> ${displaySquareMeter} m²
                          </p>
                          <p style="margin: 0; color: #10b981; font-size: 24px; font-weight: 700;">${priceInfo.price} kr</p>
                          <p style="margin: 8px 0 0 0; color: #64748b; font-size: 12px; font-style: italic;">* Same estimated price shared with the customer.</p>
                        </div>
                        ` : ''}
                        <div style="color: #334155; font-size: 15px; line-height: 1.8;">
            ${removePriceFromServiceDetails(serviceDetails)}
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

        // Create user confirmation email with price estimation
        // Try multiple possible email field names
        const userEmail = (email && typeof email === 'string' ? email.trim() : '') ||
                         (requestData.userEmail && typeof requestData.userEmail === 'string' ? requestData.userEmail.trim() : '') ||
                         (requestData.user_email && typeof requestData.user_email === 'string' ? requestData.user_email.trim() : '') ||
                         '';
        
        console.log('📧 Processing user email:', userEmail);
        console.log('📧 Email from main field:', email);
        console.log('📧 Email from userEmail field:', requestData.userEmail);
        console.log('📧 Email from user_email field:', requestData.user_email);
        console.log('📧 Will create userMailOptions:', !!userEmail);
        
        const userMailOptions = userEmail ? {
            from: 'Amples <noreply@amples.se>',
            replyTo: 'info@amples.com',
            to: userEmail,
            subject: `Thank you for your quote request - ${displayService}`,
            html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Quote Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f7fa; line-height: 1.6;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f7fa; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Thank You!</h1>
                      <p style="margin: 10px 0 0 0; color: #e0f2fe; font-size: 16px; font-weight: 400;">We've received your quote request</p>
                    </td>
                  </tr>

                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 30px;">
                      <p style="margin: 0 0 20px 0; color: #475569; font-size: 16px;">Hi ${name},</p>
                      <p style="margin: 0 0 20px 0; color: #475569; font-size: 16px;">Thank you for requesting a quote for <strong>${displayService}</strong>.</p>
                      
                      ${priceInfo ? `
                      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 4px solid #10b981; padding: 25px; border-radius: 8px; margin: 25px 0;">
                        <h2 style="margin: 0 0 12px 0; color: #1e293b; font-size: 20px; font-weight: 600;">Price Estimation</h2>
                        <div style="margin-bottom: 12px;">
                          <p style="margin: 0; color: #475569; font-size: 14px;">Service Area:</p>
                          <p style="margin: 4px 0 0 0; color: #1e293b; font-size: 18px; font-weight: 600;">${displaySquareMeter} m²</p>
                        </div>
                        <div style="border-top: 1px solid #86efac; padding-top: 12px; margin-top: 12px;">
                          <p style="margin: 0; color: #475569; font-size: 14px;">Price:</p>
                          <p style="margin: 4px 0 0 0; color: #10b981; font-size: 32px; font-weight: 700;">${priceInfo.price} kr</p>
                        </div>
                        <p style="margin: 12px 0 0 0; color: #64748b; font-size: 12px; font-style: italic;">* This is an estimated price. Final price may vary based on specific requirements.</p>
                      </div>
                      ` : ''}

                      ${confirmationUrl ? `
                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${confirmationUrl}" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 18px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">
                          ✅ Confirm Your Booking
                        </a>
                        <p style="margin: 12px 0 0 0; color: #64748b; font-size: 14px;">Click the button above to confirm your booking and provide any additional details</p>
                      </div>
                      ` : ''}
                      
                      <div style="text-align: center; margin: 30px 0;">
                        <a href="${contactSectionUrl}" style="display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 16px;">Contact Us</a>
                      </div>

                      <div style="background: #0f172a; border-radius: 14px; padding: 22px; color: #e2e8f0; text-align: center; margin-top: 30px;">
                        <div style="font-size: 28px; margin-bottom: 6px;">☎️</div>
                        <h3 style="margin: 0 0 6px 0; font-size: 18px; color: #ffffff;">Need immediate assistance?</h3>
                        <p style="margin: 0 0 16px 0; font-size: 14px; color: #cbd5f5;">Call us at <strong>0764447563</strong> or email <strong>info@amples.com</strong></p>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="background-color: #f8fafc; padding: 18px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                        © ${new Date().getFullYear()} Amples. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
        } : null;

        console.log('Attempting to send email...');
        
        // Send admin email
        const { data: adminData, error: adminError } = await resend.emails.send(adminMailOptions);
        
        if (adminError) {
            console.error('Failed to send admin email:', adminError);
            return NextResponse.json({ 
                error: 'Failed to send admin email', 
                details: adminError.message || 'Unknown error'
            }, { status: 500 });
        }
        
        console.log('Admin email sent successfully. Email ID:', adminData?.id);

        // Send user email if provided
        let userEmailSent = false;
        let userEmailError = null;
        
        if (userMailOptions) {
            console.log('📧 Attempting to send user email to:', userMailOptions.to);
            try {
                const { data: userData, error: userError } = await resend.emails.send(userMailOptions);
                
                if (userError) {
                    console.error('❌ Failed to send user email:', userError);
                    console.error('❌ Error details:', JSON.stringify(userError, null, 2));
                    
                    // Check if it's a domain verification error
                    if (userError.message && userError.message.includes('verify a domain')) {
                        console.error('🔴 DOMAIN VERIFICATION REQUIRED:');
                        console.error('🔴 Resend only allows sending to your own email with onboarding@resend.dev');
                        console.error('🔴 To send to other recipients, verify your domain at resend.com/domains');
                        console.error('🔴 Then change the "from" address to use your verified domain (e.g., info@amples.se)');
                    }
                    
                    userEmailError = userError;
                    // Don't fail the request if user email fails, admin email was sent
                    console.warn('⚠️ User email failed but admin email was sent successfully');
                } else {
                    console.log('✅ User email sent successfully. Email ID:', userData?.id);
                    console.log('✅ User email sent to:', userMailOptions.to);
                    userEmailSent = true;
                }
            } catch (sendError) {
                console.error('❌ Exception while sending user email:', sendError);
                console.error('❌ Exception details:', JSON.stringify(sendError, null, 2));
                userEmailError = sendError;
            }
        } else {
            console.warn('⚠️ userMailOptions is null/undefined - user email will not be sent');
            console.warn('⚠️ Email value was:', email);
            console.warn('⚠️ Email type:', typeof email);
            userEmailError = 'No email address provided in form';
        }

        return NextResponse.json({ 
            message: 'Email sent successfully',
            adminEmailSent: true,
            userEmailSent: userEmailSent,
            userEmailAddress: userEmail || email || 'Not provided',
            userEmailError: userEmailError ? (typeof userEmailError === 'object' ? JSON.stringify(userEmailError) : userEmailError.toString()) : null
        }, { status: 200 });
    } catch (error) {
        const errorDetails = error as Error;
        console.error('Error sending email:', errorDetails);
        console.error('Error name:', errorDetails.name);
        console.error('Error message:', errorDetails.message);
        console.error('Error stack:', errorDetails.stack);
        
        // Provide more helpful error messages
        let userFriendlyError = 'Failed to send email';
        let hint = '';
        
        if (errorDetails.message.includes('API key')) {
            userFriendlyError = 'Email service authentication failed';
            hint = 'Please verify RESEND_API_KEY is correct in your environment variables.';
        } else if (errorDetails.message.includes('rate limit') || errorDetails.message.includes('429')) {
            userFriendlyError = 'Email rate limit exceeded';
            hint = 'Too many emails sent. Please wait a moment and try again.';
        } else if (errorDetails.message.includes('timeout')) {
            userFriendlyError = 'Email service timeout';
            hint = 'The email service took too long to respond. Please try again.';
        } else if (errorDetails.message.includes('network') || errorDetails.message.includes('ECONNREFUSED')) {
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
