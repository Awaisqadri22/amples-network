import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ token: string }> }
) {
    try {
        const { token } = await params;

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
                { status: 410 } // 410 Gone
            );
        }

        // Check if already confirmed
        if (record.status === 'confirmed') {
            const recordWithService = record as typeof record & { 
                selectedService?: string | null; 
                serviceType?: string | null;
            };
            return NextResponse.json(
                { 
                    error: 'This booking has already been confirmed',
                    record: {
                        id: record.id,
                        status: record.status,
                        service: recordWithService.selectedService || recordWithService.serviceType,
                    }
                },
                { status: 200 }
            );
        }

        // Return record data (excluding sensitive fields)
        // Type assertion needed for destructuring
        const recordForDestructuring = record as typeof record & { 
            confirmationToken?: string | null; 
            tokenExpiresAt?: Date | null;
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmationToken: _confirmationToken, tokenExpiresAt: _tokenExpiresAt, ...safeRecord } = recordForDestructuring;

        return NextResponse.json({
            record: safeRecord,
            type: quote ? 'quote' : 'booking'
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching quote/booking:', error);
        return NextResponse.json(
            { error: 'Failed to fetch booking details' },
            { status: 500 }
        );
    }
}
