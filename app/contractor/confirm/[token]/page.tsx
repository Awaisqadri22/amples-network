'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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

export default function ContractorConfirmPage() {
    const params = useParams();
    const token = params.token as string;
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [job, setJob] = useState<JobData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [alreadyConfirmed, setAlreadyConfirmed] = useState(false);

    useEffect(() => {
        if (!token) return;
        let isMounted = true;
        const fetchJob = async () => {
            try {
                const response = await fetch(`/api/contractor/confirm?token=${encodeURIComponent(token)}`);
                const data = await response.json();
                if (!isMounted) return;
                if (!response.ok) {
                    setError(data.error || 'Failed to load job.');
                    setLoading(false);
                    return;
                }
                if (data.job) {
                    setJob(data.job);
                    if (data.job.status === 'confirmed') setAlreadyConfirmed(true);
                } else {
                    setError(data.error || 'Job not found.');
                }
                setLoading(false);
            } catch (err) {
                if (!isMounted) return;
                console.error('Error fetching job:', err);
                setError('Failed to load job. Please try again.');
                setLoading(false);
            }
        };
        fetchJob();
        return () => { isMounted = false; };
    }, [token]);

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
                setError(data.error || 'Failed to confirm job.');
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
            setError('Failed to confirm job. Please try again.');
        }
        setSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-xl mx-auto px-4 py-16">
                {token && loading && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <p className="text-gray-600">Loading job details...</p>
                    </div>
                )}
                {!token && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid link</h1>
                        <p className="text-gray-600 mb-6">Invalid link.</p>
                        <Link href="/" className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors">Back to home</Link>
                    </div>
                )}
                {token && error && !loading && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid or expired link</h1>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <Link href="/" className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors">Back to home</Link>
                    </div>
                )}
                {job && !loading && !error && (success || alreadyConfirmed) && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Job confirmed</h1>
                        <p className="text-gray-600 mb-6">{alreadyConfirmed ? 'This job was already confirmed.' : 'You have confirmed this job. We have notified the admin.'}</p>
                        <Link href="/" className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors">Back to home</Link>
                    </div>
                )}
                {job && !loading && !error && !success && !alreadyConfirmed && job.status === 'active' && (
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Confirm this job</h1>
                        <p className="text-gray-600 mb-6">Review the details below and confirm if you want to take this job.</p>
                        <div className="space-y-4 mb-8 p-6 bg-gray-50 rounded-xl">
                            <p><strong className="text-gray-700">Job type:</strong> <span className="text-gray-900">{job.jobType ?? '–'}</span></p>
                            <p><strong className="text-gray-700">Address:</strong> <span className="text-gray-900">{job.address ?? '–'}</span></p>
                            <p><strong className="text-gray-700">Area:</strong> <span className="text-gray-900">{job.area ?? '–'}</span></p>
                            <p><strong className="text-gray-700">Date:</strong> <span className="text-gray-900">{job.date ?? '–'}</span></p>
                            <p><strong className="text-gray-700">Price:</strong> <span className="text-gray-900">{job.price ?? '–'}</span></p>
                        </div>
                        {error && <p className="text-red-600 mb-4">{error}</p>}
                        <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={submitting}
                            className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Confirming...' : 'Confirm this job'}
                        </button>
                        <p className="mt-4 text-center text-sm text-gray-500">By confirming, this job will be assigned to you and no longer available to others.</p>
                    </div>
                )}
                {job && job.status !== 'active' && job.status !== 'confirmed' && !loading && !error && (
                    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Job no longer available</h1>
                        <p className="text-gray-600 mb-6">This job has been taken by another contractor.</p>
                        <Link href="/" className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors">Back to home</Link>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
