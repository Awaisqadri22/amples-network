'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface QuoteData {
    id: string;
    name: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    selectedService: string | null;
    serviceType: string | null;
    areaSize: string | null;
    squareMeter: string | null;
    constructionAreaSize: string | null;
    officeAreaSize: string | null;
    detailAreaSize: string | null;
    city: string | null;
    status: string;
    [key: string]: unknown;
}

export default function ConfirmPage() {
    const params = useParams();
    const router = useRouter();
    const token = params.token as string;
    
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [quoteData, setQuoteData] = useState<QuoteData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [additionalInfo, setAdditionalInfo] = useState({
        preferredDateTime: '',
        comments: ''
    });
    const [minDateTime, setMinDateTime] = useState('2000-01-01T00:00');

    useEffect(() => {
        if (!token) return;

        let isMounted = true;

        const fetchQuoteData = async () => {
            try {
                const response = await fetch(`/api/quote/${token}`);
                const data = await response.json();

                if (!isMounted) return;

                if (!response.ok) {
                    setError(data.error || 'Failed to load booking details');
                    setLoading(false);
                    return;
                }

                if (data.record.status === 'confirmed') {
                    setError('This booking has already been confirmed.');
                    setLoading(false);
                    return;
                }

                setQuoteData(data.record);
                setLoading(false);
            } catch (err) {
                if (!isMounted) return;
                console.error('Error fetching quote:', err);
                setError('Failed to load booking details. Please try again.');
                setLoading(false);
            }
        };

        fetchQuoteData();

        return () => {
            isMounted = false;
        };
    }, [token]);

    // Hydration fix: min must match on server and client; update to "now" only after mount.
    useEffect(() => {
        const id = setTimeout(() => {
            const now = new Date();
            const y = now.getFullYear();
            const m = String(now.getMonth() + 1).padStart(2, '0');
            const d = String(now.getDate()).padStart(2, '0');
            const h = String(now.getHours()).padStart(2, '0');
            const min = String(now.getMinutes()).padStart(2, '0');
            setMinDateTime(`${y}-${m}-${d}T${h}:${min}`);
        }, 0);
        return () => clearTimeout(id);
    }, []);

    const handleConfirm = async () => {
        setSubmitting(true);
        setError(null);

        if (additionalInfo.preferredDateTime && new Date(additionalInfo.preferredDateTime) < new Date()) {
            setError('Preferred date & time cannot be in the past. Please select a current or future date.');
            setSubmitting(false);
            return;
        }

        try {
            const response = await fetch('/api/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    additionalInfo: {
                        preferredDateTime: additionalInfo.preferredDateTime || undefined,
                        comments: additionalInfo.comments || undefined
                    }
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Failed to confirm booking');
                setSubmitting(false);
                return;
            }

            setSuccess(true);
            setSubmitting(false);
            
            // Redirect after 3 seconds
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (err) {
            console.error('Error confirming booking:', err);
            setError('Failed to confirm booking. Please try again.');
            setSubmitting(false);
        }
    };

    const calculatePrice = (squareMeters: string | null | undefined): { price: number; priceRange?: string } | null => {
        if (!squareMeters) return null;
        const sqm = parseFloat(squareMeters);
        if (isNaN(sqm) || sqm < 0) return null;
        const roundedSqm = Math.round(sqm);
        
        if (roundedSqm >= 0 && roundedSqm <= 29) return { price: 1575 };
        if (roundedSqm >= 30 && roundedSqm <= 39) return { price: 1725, priceRange: '1675-1775' };
        if (roundedSqm >= 40 && roundedSqm <= 49) return { price: 1825, priceRange: '1775-1875' };
        if (roundedSqm >= 50 && roundedSqm <= 59) return { price: 1925, priceRange: '1875-1975' };
        if (roundedSqm >= 60 && roundedSqm <= 69) return { price: 2125, priceRange: '2075-2175' };
        if (roundedSqm >= 70 && roundedSqm <= 79) return { price: 2325, priceRange: '2275-2375' };
        if (roundedSqm >= 80 && roundedSqm <= 89) return { price: 2450, priceRange: '2400-2500' };
        if (roundedSqm >= 90 && roundedSqm <= 100) return { price: 2900, priceRange: '2800-3000' };
        if (roundedSqm > 100 && roundedSqm <= 200) {
            const additionalKvm = roundedSqm - 100;
            const additionalBlocks = Math.ceil(additionalKvm / 10);
            return { price: 3000 + (additionalBlocks * 200) };
        }
        const additionalKvm = roundedSqm - 200;
        return { price: 5000 + (additionalKvm * 30) };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-emerald-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading booking details...</p>
                </div>
            </div>
        );
    }

    if (error && !quoteData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-emerald-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Error</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link 
                        href="/#contacts" 
                        className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-emerald-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
                    <div className="text-green-500 text-5xl mb-4">✅</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
                    <p className="text-gray-600 mb-6">Your booking has been successfully confirmed. We&apos;ll contact you shortly!</p>
                    <p className="text-sm text-gray-500">Redirecting to homepage...</p>
                </div>
            </div>
        );
    }

    if (!quoteData) return null;

    const serviceName = quoteData.selectedService || quoteData.serviceType || 'Cleaning Service';
    const squareMeter = quoteData.squareMeter || quoteData.areaSize || quoteData.constructionAreaSize || quoteData.officeAreaSize || quoteData.detailAreaSize;
    const priceInfo = calculatePrice(squareMeter);

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-emerald-50 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 px-8 py-6 text-white text-center">
                        <h1 className="text-3xl font-bold mb-2">Confirm Your Booking</h1>
                        <p className="text-cyan-100">Please review your details and confirm</p>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                                {error}
                            </div>
                        )}

                        {/* Service Details */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Service Details</h2>
                            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Service:</span>
                                    <span className="font-semibold text-gray-900">{serviceName}</span>
                                </div>
                                {squareMeter && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Area Size:</span>
                                        <span className="font-semibold text-gray-900">{squareMeter} m²</span>
                                    </div>
                                )}
                                {quoteData.city && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">City:</span>
                                        <span className="font-semibold text-gray-900">{quoteData.city}</span>
                                    </div>
                                )}
                                {priceInfo && (
                                    <div className="flex justify-between pt-3 border-t border-gray-200">
                                        <span className="text-gray-600">Price Estimation:</span>
                                        <span className="font-bold text-green-600 text-lg">
                                            {priceInfo.priceRange ? `${priceInfo.priceRange} kr` : `${priceInfo.price} kr`}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                                {quoteData.name && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Name:</span>
                                        <span className="font-semibold text-gray-900">{quoteData.name}</span>
                                    </div>
                                )}
                                {quoteData.email && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Email:</span>
                                        <span className="font-semibold text-gray-900">{quoteData.email}</span>
                                    </div>
                                )}
                                {quoteData.phone && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Phone:</span>
                                        <span className="font-semibold text-gray-900">{quoteData.phone}</span>
                                    </div>
                                )}
                                {quoteData.address && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Address:</span>
                                        <span className="font-semibold text-gray-900">{quoteData.address}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information (Optional)</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="preferredDateTime" className="block text-sm font-medium text-gray-700 mb-2">
                                        Preferred Date & Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="preferredDateTime"
                                        value={additionalInfo.preferredDateTime}
                                        onChange={(e) => setAdditionalInfo({ ...additionalInfo, preferredDateTime: e.target.value })}
                                        min={minDateTime}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Select a date and time today or in the future</p>
                                </div>
                                <div>
                                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                                        Additional Comments or Special Instructions
                                    </label>
                                    <textarea
                                        id="comments"
                                        rows={4}
                                        value={additionalInfo.comments}
                                        onChange={(e) => setAdditionalInfo({ ...additionalInfo, comments: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder="Any special requirements or instructions..."
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mb-4">
                            <a
                                href="https://www.skatteverket.se/privat/sjalvservice/svarpavanligafragor/rotochrutarbete/privatrotochrutarbetefaq/hurmycketmastejagtjanaforattkunnautnyttjamaximalskattereduktionforrotochrutarbete.5.5fc8c94513259a4ba1d800034104.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 border-2 border-cyan-400 text-cyan-700 font-semibold rounded-lg hover:bg-cyan-100 hover:border-cyan-500 transition-colors shadow-sm"
                            >
                                Calculate Rutavdrag
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>

                        {/* Confirm Button */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleConfirm}
                                disabled={submitting}
                                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'Confirming...' : '✅ Confirm Booking'}
                            </button>
                            <Link
                                href="/#contacts"
                                className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-block text-center"
                            >
                                Cancel
                            </Link>
                        </div>

                        <p className="text-sm text-gray-500 text-center mt-6">
                            By confirming, you agree to the price estimation and service terms.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
