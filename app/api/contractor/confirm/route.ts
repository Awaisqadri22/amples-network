import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';
import { Prisma } from '@prisma/client';

const ADMIN_EMAIL = 'info@amples.se';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { token } = body as { token?: string };

        if (!token) {
            return NextResponse.json(
                { error: 'Confirmation token is required' },
                { status: 400 }
            );
        }

        const jobs = await prisma.$queryRaw<
            { id: string; contractor_id: string; job_type: string | null; address: string | null; area: string | null; date: Date | null; price: number | null; status: string; batch_id: string | null; confirmation_token: string | null; token_expires_at: Date | null }[]
        >(Prisma.sql`SELECT id, contractor_id, job_type, address, area, date, price, status, batch_id, confirmation_token, token_expires_at FROM jobs WHERE confirmation_token = ${token} LIMIT 1`);

        const job = jobs[0];
        if (!job) {
            return NextResponse.json(
                { error: 'Invalid or expired confirmation link.' },
                { status: 404 }
            );
        }

        if (job.token_expires_at && new Date() > new Date(job.token_expires_at)) {
            return NextResponse.json(
                { error: 'This confirmation link has expired.' },
                { status: 410 }
            );
        }

        if (job.status === 'confirmed') {
            return NextResponse.json(
                { success: true, message: 'Job already confirmed.', alreadyConfirmed: true },
                { status: 200 }
            );
        }

        if (job.status !== 'active') {
            return NextResponse.json(
                { error: 'This job is no longer available.' },
                { status: 410 }
            );
        }

        const batchId = job.batch_id;
        if (batchId) {
            const alreadyTaken = await prisma.$queryRaw<{ id: string }[]>(
                Prisma.sql`SELECT id FROM jobs WHERE batch_id = ${batchId} AND status = 'confirmed' LIMIT 1`
            );
            if (alreadyTaken.length > 0) {
                return NextResponse.json(
                    { error: 'This job has already been taken by another contractor.' },
                    { status: 410 }
                );
            }
        }
        if (batchId) {
            const othersInBatch = await prisma.$queryRaw<{ id: string }[]>(
                Prisma.sql`SELECT id FROM jobs WHERE batch_id = ${batchId} AND id != ${job.id} AND status = 'active'`
            );
            if (othersInBatch.length > 0) {
                await prisma.$executeRaw(Prisma.sql`UPDATE jobs SET status = 'taken', updated_at = now() WHERE batch_id = ${batchId} AND id != ${job.id}`);
            }
        }

        await prisma.$executeRaw(Prisma.sql`UPDATE jobs SET status = 'confirmed', updated_at = now() WHERE id = ${job.id}`);

        const contractors = await prisma.$queryRaw<{ id: string; name: string; email: string }[]>(
            Prisma.sql`SELECT id, name, email FROM contractors WHERE id = ${job.contractor_id} LIMIT 1`
        );
        const contractor = contractors[0];
        const contractorName = contractor?.name ?? 'Contractor';
        const contractorEmail = contractor?.email ?? null;

        const jobType = job.job_type ?? 'Cleaning';
        const address = job.address ?? 'Not specified';
        const area = job.area ?? '–';
        const dateStr = job.date ? new Date(job.date).toLocaleDateString('sv-SE', { dateStyle: 'medium' }) : '–';
        const priceStr = job.price != null ? `${job.price.toLocaleString('sv-SE')} kr` : '–';

        if (process.env.RESEND_API_KEY && contractorEmail) {
            const resend = new Resend(process.env.RESEND_API_KEY);
            await resend.emails.send({
                from: 'Amples <noreply@amples.se>',
                to: ADMIN_EMAIL,
                subject: `Contractor confirmed job: ${contractorName} – ${jobType}`,
                html: `
                    <!DOCTYPE html>
                    <html><head><meta charset="UTF-8"></head>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 500px; margin: 0 auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                            <h1 style="color: #fff; margin: 0; font-size: 20px;">Job confirmed by contractor</h1>
                        </div>
                        <div style="background: #fff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0 0 16px 0;"><strong>Contractor:</strong> ${contractorName} (${contractorEmail})</p>
                            <p style="margin: 0 0 16px 0;"><strong>Job type:</strong> ${jobType}</p>
                            <p style="margin: 0 0 16px 0;"><strong>Address:</strong> ${address}</p>
                            <p style="margin: 0 0 16px 0;"><strong>Area:</strong> ${area}</p>
                            <p style="margin: 0 0 16px 0;"><strong>Date:</strong> ${dateStr}</p>
                            <p style="margin: 0;"><strong>Price:</strong> ${priceStr}</p>
                        </div>
                    </body>
                    </html>
                `
            });
            await resend.emails.send({
                from: 'Amples <noreply@amples.se>',
                to: contractorEmail,
                subject: `You confirmed the job: ${jobType} – ${address}`,
                html: `
                    <!DOCTYPE html>
                    <html><head><meta charset="UTF-8"></head>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 500px; margin: 0 auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                            <h1 style="color: #fff; margin: 0; font-size: 20px;">Job confirmed</h1>
                        </div>
                        <div style="background: #fff; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0 0 16px 0;">Hi ${contractorName},</p>
                            <p style="margin: 0 0 16px 0;">You have confirmed the following job:</p>
                            <p style="margin: 0 0 16px 0;"><strong>Job type:</strong> ${jobType}</p>
                            <p style="margin: 0 0 16px 0;"><strong>Address:</strong> ${address}</p>
                            <p style="margin: 0 0 16px 0;"><strong>Date:</strong> ${dateStr}</p>
                            <p style="margin: 0 0 16px 0;"><strong>Price:</strong> ${priceStr}</p>
                            <p style="margin: 16px 0 0 0;">Best regards,<br>The Amples Team</p>
                        </div>
                    </body>
                    </html>
                `
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Job confirmed successfully.',
            job: { id: job.id, jobType, address, date: dateStr, price: priceStr }
        }, { status: 200 });
    } catch (error) {
        console.error('Error confirming contractor job:', error);
        return NextResponse.json(
            { error: 'Failed to confirm job.' },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    if (!token) {
        return NextResponse.json({ error: 'Token required' }, { status: 400 });
    }
    const jobs = await prisma.$queryRaw<
        { id: string; job_type: string | null; address: string | null; area: string | null; date: Date | null; price: number | null; status: string; token_expires_at: Date | null }[]
    >(Prisma.sql`SELECT id, job_type, address, area, date, price, status, token_expires_at FROM jobs WHERE confirmation_token = ${token} LIMIT 1`);
    const job = jobs[0];
    if (!job) {
        return NextResponse.json({ error: 'Invalid or expired link.', job: null }, { status: 404 });
    }
    if (job.token_expires_at && new Date() > new Date(job.token_expires_at)) {
        return NextResponse.json({ error: 'Link expired.', job: null }, { status: 410 });
    }
    const dateStr = job.date ? new Date(job.date).toLocaleDateString('sv-SE', { dateStyle: 'medium' }) : null;
    const priceStr = job.price != null ? `${job.price.toLocaleString('sv-SE')} kr` : null;
    return NextResponse.json({
        job: {
            id: job.id,
            jobType: job.job_type,
            address: job.address,
            area: job.area,
            date: dateStr,
            price: priceStr,
            status: job.status
        }
    });
}
