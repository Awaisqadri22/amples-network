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

const EXTRAS_OPTIONS = [
    { id: 'none', label: 'No extra', price: 0 },
    { id: 'balcony-dusting', label: 'Balcony dusting +200 kr', price: 200 },
    { id: 'balcony-dusting-glazed', label: 'Balcony dusting glazed +300 kr', price: 300 },
    { id: 'balcony-window', label: 'Balcony window cleaning +500 kr', price: 500 },
    { id: 'garage-dusting', label: 'Garage dusting +300 kr', price: 300 },
    { id: 'outdoors-10kvm', label: 'Outdoors/10 kvm +200 kr', price: 200 },
    { id: 'basement-10kvm', label: 'Basement/10 kvm +200 kr', price: 200 },
    { id: 'dusting-blinds-10', label: 'Dusting blinds/10 pieces +200 kr', price: 200 },
    { id: 'water-trap-cleaning', label: 'Water trap cleaning +150 kr', price: 150 },
    { id: 'sauna-dusting', label: 'Dusting/wet wiping of sauna +400 kr', price: 400 },
    { id: 'spa-dusting', label: 'Dusting/wet wiping of spa +500 kr', price: 500 },
    { id: 'rough-cleaning-15min', label: 'Rough cleaning, more difficult stains, sanitation (started 15 min) +200 kr', price: 200 },
    { id: 'other-cleaning-hour', label: 'All other cleaning/man/started hour +500 kr', price: 500 },
] as const;

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
        personalNumber: '',
        preferredDateTime: '',
        comments: ''
    });
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);
    const [minDate, setMinDate] = useState('2000-01-01');
    const [personalNumberError, setPersonalNumberError] = useState<string | null>(null);

    const toggleExtra = (id: string) => {
        if (id === 'none') return;
        setSelectedExtraIds((prev) =>
            prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
        );
    };

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

    // Hydration fix: min must match on server and client; update to "today" only after mount.
    useEffect(() => {
        const id = setTimeout(() => {
            const now = new Date();
            const y = now.getFullYear();
            const m = String(now.getMonth() + 1).padStart(2, '0');
            const d = String(now.getDate()).padStart(2, '0');
            setMinDate(`${y}-${m}-${d}`);
        }, 0);
        return () => clearTimeout(id);
    }, []);

    const handleConfirm = async () => {
        setSubmitting(true);
        setError(null);
        setPersonalNumberError(null);

        if (!agreeToTerms) {
            setError('You must agree to the terms and conditions to confirm your booking.');
            setSubmitting(false);
            return;
        }

        const personalNumber = additionalInfo.personalNumber.trim();
        if (!personalNumber) {
            setPersonalNumberError('Personal Number is required.');
            setSubmitting(false);
            return;
        }
        const digitsOnly = personalNumber.replace(/\D/g, '');
        if (digitsOnly.length < 10 || digitsOnly.length > 12) {
            setPersonalNumberError('Personal Number must be 10 to 12 digits.');
            setSubmitting(false);
            return;
        }

        if (additionalInfo.preferredDateTime && new Date(additionalInfo.preferredDateTime) < new Date()) {
            setError('Preferred date cannot be in the past. Please select today or a future date.');
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
                        personalNumber: digitsOnly,
                        preferredDateTime: additionalInfo.preferredDateTime || undefined,
                        comments: additionalInfo.comments || undefined,
                        selectedExtraIds: selectedExtraIds,
                        selectedExtraLabels: selectedExtraIds.map((id) => EXTRAS_OPTIONS.find((e) => e.id === id)?.label).filter(Boolean),
                        extraPriceKr: selectedExtraIds.reduce((sum, id) => sum + (EXTRAS_OPTIONS.find((e) => e.id === id)?.price ?? 0), 0),
                        totalPriceKr: (priceInfo?.price ?? 0) + selectedExtraIds.reduce((sum, id) => sum + (EXTRAS_OPTIONS.find((e) => e.id === id)?.price ?? 0), 0),
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

    const calculatePrice = (squareMeters: string | null | undefined): { price: number } | null => {
        if (!squareMeters) return null;
        const sqm = parseFloat(squareMeters);
        if (isNaN(sqm) || sqm < 0) return null;
        const roundedSqm = Math.round(sqm);
        
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
    const basePrice = priceInfo?.price ?? 0;
    const selectedExtras = EXTRAS_OPTIONS.filter((e) => e.id !== 'none' && selectedExtraIds.includes(e.id));
    const extraPrice = selectedExtras.reduce((sum, e) => sum + e.price, 0);
    const totalPrice = basePrice + extraPrice;

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
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
                                {error}
                            </div>
                        )}

                        {/* Price offered */}
                        {priceInfo && (
                            <div className="mb-8 p-5 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                                <p className="text-sm font-medium text-gray-600 mb-1">Price offered</p>
                                <div className="space-y-1">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-gray-600">Base price</span>
                                        <span className="font-semibold text-gray-800">{priceInfo.price} kr</span>
                                    </div>
                                    {selectedExtras.length > 0 && selectedExtras.map((extra) => (
                                        <div key={extra.id} className="flex justify-between items-baseline pt-2 border-t border-green-200">
                                            <span className="text-gray-600">{extra.label.replace(/\s*\+\d+\s*kr\s*$/, '')}</span>
                                            <span className="font-semibold text-gray-800">+{extra.price} kr</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-baseline pt-3 border-t-2 border-green-300 mt-2">
                                        <span className="font-semibold text-gray-800">Total</span>
                                        <span className="text-2xl font-bold text-green-700">{totalPrice} kr</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Add some Extra's */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Add some Extra&apos;s</h2>
                            <p className="text-sm text-gray-500 mb-4">Select one or more extras. The total price above will update automatically.</p>
                            <div className="grid gap-2 sm:grid-cols-2">
                                {EXTRAS_OPTIONS.filter((opt) => opt.id !== 'none').map((opt) => (
                                    <label
                                        key={opt.id}
                                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-cyan-400 hover:bg-cyan-50/50 cursor-pointer transition-colors"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedExtraIds.includes(opt.id)}
                                            onChange={() => toggleExtra(opt.id)}
                                            className="h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                                        />
                                        <span className="text-gray-800 font-medium">{opt.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

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
                                        <span className="text-gray-600">Price:</span>
                                        <span className="font-bold text-green-600 text-lg">{priceInfo.price} kr</span>
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

                        {/* Required: Personal Number */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Required</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="personalNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                        Personal Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        id="personalNumber"
                                        value={additionalInfo.personalNumber}
                                        onChange={(e) => {
                                            setAdditionalInfo({ ...additionalInfo, personalNumber: e.target.value.replace(/\D/g, '').slice(0, 12) });
                                            if (personalNumberError) setPersonalNumberError(null);
                                        }}
                                        placeholder="10–12 digits"
                                        minLength={10}
                                        maxLength={12}
                                        required
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${personalNumberError ? 'border-red-500' : 'border-gray-300'}`}
                                        aria-invalid={!!personalNumberError}
                                        aria-describedby={personalNumberError ? 'personalNumber-error' : undefined}
                                    />
                                    {personalNumberError ? (
                                        <p id="personalNumber-error" className="mt-1 text-sm text-red-600" role="alert">{personalNumberError}</p>
                                    ) : (
                                        <p className="mt-1 text-xs text-gray-500">Enter your personal number (10–12 digits). Required to confirm.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="preferredDateTime" className="block text-sm font-medium text-gray-700 mb-2">
                                        Preferred Date
                                    </label>
                                    <input
                                        type="date"
                                        id="preferredDateTime"
                                        value={additionalInfo.preferredDateTime}
                                        onChange={(e) => setAdditionalInfo({ ...additionalInfo, preferredDateTime: e.target.value })}
                                        min={minDate}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Select a date today or in the future</p>
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

                        <div className="mb-6">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="mt-1 h-5 w-5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                                />
                                <span className="text-gray-700 font-medium group-hover:text-gray-900">Agree to terms and conditions</span>
                            </label>
                        </div>

                        {/* Confirm Button */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleConfirm}
                                disabled={submitting || !agreeToTerms}
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
