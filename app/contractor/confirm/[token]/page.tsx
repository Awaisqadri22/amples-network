'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

interface JobData {
    id: string;
    jobType: string | null;
    address: string | null;
    area: string | null;
    date: string | null;
    price: string | null;
    status: string;
}

type Language = 'en' | 'sv';

const TEXT: Record<Language, Record<string, string>> = {
    en: {
        loadingJob: 'Loading job details...',
        invalidLinkTitle: 'Invalid link',
        invalidLinkBody: 'Invalid link.',
        backHome: 'Back to home',
        invalidOrExpiredTitle: 'Invalid or expired link',
        failedLoadJob: 'Failed to load job.',
        jobNotFound: 'Job not found.',
        failedLoadRetry: 'Failed to load job. Please try again.',
        failedConfirm: 'Failed to confirm job.',
        failedConfirmRetry: 'Failed to confirm job. Please try again.',
        jobConfirmed: 'Job confirmed',
        jobAlreadyConfirmed: 'This job was already confirmed.',
        jobConfirmSuccess: 'You have confirmed this job. We have notified the admin.',
        confirmThisJob: 'Confirm this job',
        reviewAndConfirm: 'Review the details below and confirm if you want to take this job.',
        jobType: 'Job type:',
        address: 'Address:',
        area: 'Area:',
        date: 'Date:',
        price: 'Price:',
        confirming: 'Confirming...',
        confirmButton: 'Confirm this job',
        confirmNote: 'By confirming, this job will be assigned to you and no longer available to others.',
        unavailableTitle: 'Job no longer available',
        unavailableBody: 'This job has been taken by another contractor.',
    },
    sv: {
        loadingJob: 'Laddar jobbinformation...',
        invalidLinkTitle: 'Ogiltig länk',
        invalidLinkBody: 'Ogiltig länk.',
        backHome: 'Tillbaka till startsidan',
        invalidOrExpiredTitle: 'Ogiltig eller utgången länk',
        failedLoadJob: 'Kunde inte ladda jobbet.',
        jobNotFound: 'Jobbet hittades inte.',
        failedLoadRetry: 'Kunde inte ladda jobbet. Försök igen.',
        failedConfirm: 'Kunde inte bekräfta jobbet.',
        failedConfirmRetry: 'Kunde inte bekräfta jobbet. Försök igen.',
        jobConfirmed: 'Jobb bekräftat',
        jobAlreadyConfirmed: 'Detta jobb har redan bekräftats.',
        jobConfirmSuccess: 'Du har bekräftat detta jobb. Vi har meddelat administratören.',
        confirmThisJob: 'Bekräfta detta jobb',
        reviewAndConfirm: 'Granska detaljerna nedan och bekräfta om du vill ta jobbet.',
        jobType: 'Jobbtyp:',
        address: 'Adress:',
        area: 'Yta:',
        date: 'Datum:',
        price: 'Pris:',
        confirming: 'Bekräftar...',
        confirmButton: 'Bekräfta detta jobb',
        confirmNote: 'Genom att bekräfta tilldelas jobbet till dig och blir inte längre tillgängligt för andra.',
        unavailableTitle: 'Jobbet är inte längre tillgängligt',
        unavailableBody: 'Detta jobb har tagits av en annan entreprenör.',
    },
};

export default function ContractorConfirmPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const token = params.token as string;
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [job, setJob] = useState<JobData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [alreadyConfirmed, setAlreadyConfirmed] = useState(false);
    const [language, setLanguage] = useState<Language>('sv');
    const t = TEXT[language];

    useEffect(() => {
        const queryLang = searchParams.get('lang')?.toLowerCase();
        if (queryLang === 'sv' || queryLang === 'en') {
            setLanguage(queryLang);
        }
    }, [searchParams]);

    useEffect(() => {
        if (!token) return;
        let isMounted = true;
        const fetchJob = async () => {
            try {
                const response = await fetch(`/api/contractor/confirm?token=${encodeURIComponent(token)}`);
                const data = await response.json();
                if (!isMounted) return;
                if (!response.ok) {
                    setError(data.error || t.failedLoadJob);
                    setLoading(false);
                    return;
                }
                if (data.job) {
                    setJob(data.job);
                    if (data.job.status === 'confirmed') setAlreadyConfirmed(true);
                } else {
                    setError(data.error || t.jobNotFound);
                }
                setLoading(false);
            } catch (err) {
                if (!isMounted) return;
                console.error('Error fetching job:', err);
                setError(t.failedLoadRetry);
                setLoading(false);
            }
        };
        fetchJob();
        return () => { isMounted = false; };
    }, [token, t.failedLoadJob, t.jobNotFound, t.failedLoadRetry]);

    const handleConfirm = async () => {
        setSubmitting(true);
        setError(null);
        try {
            const response = await fetch('/api/contractor/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || t.failedConfirm);
                setSubmitting(false);
                return;
            }
            if (data.alreadyConfirmed) {
                setAlreadyConfirmed(true);
            } else {
                setSuccess(true);
                setJob((prev) => prev ? { ...prev, status: 'confirmed' } : null);
            }
        } catch (err) {
            console.error('Error confirming job:', err);
            setError(t.failedConfirmRetry);
        }
        setSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-xl mx-auto px-4 py-16">
                {token && loading && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <p className="text-gray-600">{t.loadingJob}</p>
                    </div>
                )}
                {!token && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.invalidLinkTitle}</h1>
                        <p className="text-gray-600 mb-6">{t.invalidLinkBody}</p>
                        <Link href="/" className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors">{t.backHome}</Link>
                    </div>
                )}
                {token && error && !loading && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.invalidOrExpiredTitle}</h1>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <Link href="/" className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors">{t.backHome}</Link>
                    </div>
                )}
                {job && !loading && !error && (success || alreadyConfirmed) && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.jobConfirmed}</h1>
                        <p className="text-gray-600 mb-6">{alreadyConfirmed ? t.jobAlreadyConfirmed : t.jobConfirmSuccess}</p>
                        <Link href="/" className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors">{t.backHome}</Link>
                    </div>
                )}
                {job && !loading && !error && !success && !alreadyConfirmed && job.status === 'active' && (
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.confirmThisJob}</h1>
                        <p className="text-gray-600 mb-6">{t.reviewAndConfirm}</p>
                        <div className="space-y-4 mb-8 p-6 bg-gray-50 rounded-xl">
                            <p><strong className="text-gray-700">{t.jobType}</strong> <span className="text-gray-900">{job.jobType ?? '–'}</span></p>
                            <p><strong className="text-gray-700">{t.address}</strong> <span className="text-gray-900">{job.address ?? '–'}</span></p>
                            <p><strong className="text-gray-700">{t.area}</strong> <span className="text-gray-900">{job.area ?? '–'}</span></p>
                            <p><strong className="text-gray-700">{t.date}</strong> <span className="text-gray-900">{job.date ?? '–'}</span></p>
                            <p><strong className="text-gray-700">{t.price}</strong> <span className="text-gray-900">{job.price ?? '–'}</span></p>
                        </div>
                        {error && <p className="text-red-600 mb-4">{error}</p>}
                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={submitting}
                            className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? t.confirming : t.confirmButton}
                        </button>
                        <p className="mt-4 text-center text-sm text-gray-500">{t.confirmNote}</p>
                    </div>
                )}
                {job && job.status !== 'active' && job.status !== 'confirmed' && !loading && !error && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.unavailableTitle}</h1>
                        <p className="text-gray-600 mb-6">{t.unavailableBody}</p>
                        <Link href="/" className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors">{t.backHome}</Link>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
