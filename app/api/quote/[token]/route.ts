import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
        const quote = await prisma.quote.findUnique({
            where: { confirmationToken: token },
            include: { user: true }
        });

        const booking = await prisma.booking.findUnique({
            where: { confirmationToken: token },
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
        if (record.tokenExpiresAt && new Date() > record.tokenExpiresAt) {
            return NextResponse.json(
                { error: 'Confirmation link has expired. Please contact us for a new link.' },
                { status: 410 } // 410 Gone
            );
        }

        // Check if already confirmed
        if (record.status === 'confirmed') {
            return NextResponse.json(
                { 
                    error: 'This booking has already been confirmed',
                    record: {
                        id: record.id,
                        status: record.status,
                        service: (record as any).selectedService || (record as any).serviceType,
                    }
                },
                { status: 200 }
            );
        }

        // Return record data (excluding sensitive fields)
        const { confirmationToken, tokenExpiresAt, ...safeRecord } = record;

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
