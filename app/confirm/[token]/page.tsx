'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
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

type Language = 'en' | 'sv';

const EXTRAS_OPTIONS = [
    { id: 'none', price: 0 },
    { id: 'balcony-dusting', price: 200 },
    { id: 'balcony-dusting-glazed', price: 300 },
    { id: 'balcony-window', price: 500 },
    { id: 'garage-dusting', price: 300 },
    { id: 'outdoors-10kvm', price: 200 },
    { id: 'basement-10kvm', price: 200 },
    { id: 'dusting-blinds-10', price: 200 },
    { id: 'water-trap-cleaning', price: 150 },
    { id: 'sauna-dusting', price: 400 },
    { id: 'spa-dusting', price: 500 },
    { id: 'rough-cleaning-15min', price: 200 },
    { id: 'other-cleaning-hour', price: 500 },
] as const;

const EXTRA_LABELS: Record<Language, Record<string, string>> = {
    en: {
        none: 'No extra',
        'balcony-dusting': 'Balcony dusting +200 kr',
        'balcony-dusting-glazed': 'Balcony dusting glazed +300 kr',
        'balcony-window': 'Balcony window cleaning +500 kr',
        'garage-dusting': 'Garage dusting +300 kr',
        'outdoors-10kvm': 'Outdoors/10 kvm +200 kr',
        'basement-10kvm': 'Basement/10 kvm +200 kr',
        'dusting-blinds-10': 'Dusting blinds/10 pieces +200 kr',
        'water-trap-cleaning': 'Water trap cleaning +150 kr',
        'sauna-dusting': 'Dusting/wet wiping of sauna +400 kr',
        'spa-dusting': 'Dusting/wet wiping of spa +500 kr',
        'rough-cleaning-15min': 'Rough cleaning, more difficult stains, sanitation (started 15 min) +200 kr',
        'other-cleaning-hour': 'All other cleaning/man/started hour +500 kr',
    },
    sv: {
        none: 'Inga tillval',
        'balcony-dusting': 'Balkongdammning +200 kr',
        'balcony-dusting-glazed': 'Inglasad balkongdammning +300 kr',
        'balcony-window': 'Fönsterputs balkong +500 kr',
        'garage-dusting': 'Garagedammning +300 kr',
        'outdoors-10kvm': 'Utomhus/10 kvm +200 kr',
        'basement-10kvm': 'Källare/10 kvm +200 kr',
        'dusting-blinds-10': 'Dammtorkning persienner/10 st +200 kr',
        'water-trap-cleaning': 'Rengöring vattenlås +150 kr',
        'sauna-dusting': 'Dammtorkning/våttorkning av bastu +400 kr',
        'spa-dusting': 'Dammtorkning/våttorkning av spa +500 kr',
        'rough-cleaning-15min': 'Grovstädning, svårare fläckar, sanering (påbörjad 15 min) +200 kr',
        'other-cleaning-hour': 'Övrig städning/person/påbörjad timme +500 kr',
    },
};

const UI_TEXT: Record<Language, Record<string, string>> = {
    en: {
        loadingDetails: 'Loading booking details...',
        failedLoadDetails: 'Failed to load booking details',
        alreadyConfirmed: 'This booking has already been confirmed.',
        failedLoadRetry: 'Failed to load booking details. Please try again.',
        mustAgreeTerms: 'You must agree to the terms and conditions to confirm your booking.',
        personalRequired: 'Personal Number is required.',
        personalLength: 'Personal Number must be 10 to 12 digits.',
        preferredDatePast: 'Preferred date cannot be in the past. Please select today or a future date.',
        failedConfirmBooking: 'Failed to confirm booking',
        failedConfirmRetry: 'Failed to confirm booking. Please try again.',
        error: 'Error',
        contactUs: 'Contact Us',
        bookingConfirmed: 'Booking Confirmed!',
        bookingConfirmedBody: "Your booking has been successfully confirmed. We'll contact you shortly!",
        redirecting: 'Redirecting to homepage...',
        cleaningService: 'Cleaning Service',
        headerTitle: 'Confirm Your Booking',
        headerSubtitle: 'Please review your details and confirm',
        priceOffered: 'Price offered',
        basePrice: 'Base price',
        total: 'Total',
        addExtrasTitle: "Add some Extra's",
        addExtrasDesc: 'Select one or more extras. The total price above will update automatically.',
        serviceDetails: 'Service Details',
        service: 'Service:',
        areaSize: 'Area Size:',
        city: 'City:',
        extras: 'Extras:',
        price: 'Price:',
        contactInfo: 'Contact Information',
        name: 'Name:',
        email: 'Email:',
        phone: 'Phone:',
        address: 'Address:',
        required: 'Required',
        personalNumber: 'Personal Number',
        personalPlaceholder: '10-12 digits',
        personalHelp: 'Enter your personal number (10-12 digits). Required to confirm.',
        additionalInfo: 'Additional Information',
        preferredDate: 'Preferred Date',
        preferredDateHelp: 'Select a date today or in the future',
        commentsLabel: 'Additional Comments or Special Instructions',
        commentsPlaceholder: 'Any special requirements or instructions...',
        agreePrefix: 'Agree to terms and conditions and',
        checklist: 'checklist',
        confirming: 'Confirming...',
        confirmBooking: '✅ Confirm Booking',
        cancel: 'Cancel',
        footerAgree: 'By confirming, you agree to the price estimation and service terms.',
    },
    sv: {
        loadingDetails: 'Laddar bokningsdetaljer...',
        failedLoadDetails: 'Kunde inte ladda bokningsdetaljer',
        alreadyConfirmed: 'Denna bokning har redan bekräftats.',
        failedLoadRetry: 'Kunde inte ladda bokningsdetaljer. Försök igen.',
        mustAgreeTerms: 'Du måste godkänna villkoren för att bekräfta din bokning.',
        personalRequired: 'Personnummer är obligatoriskt.',
        personalLength: 'Personnummer måste vara 10 till 12 siffror.',
        preferredDatePast: 'Önskat datum kan inte vara i det förflutna. Välj idag eller ett framtida datum.',
        failedConfirmBooking: 'Kunde inte bekräfta bokningen',
        failedConfirmRetry: 'Kunde inte bekräfta bokningen. Försök igen.',
        error: 'Fel',
        contactUs: 'Kontakta oss',
        bookingConfirmed: 'Bokning bekräftad!',
        bookingConfirmedBody: 'Din bokning har bekräftats. Vi kontaktar dig inom kort!',
        redirecting: 'Omdirigerar till startsidan...',
        cleaningService: 'Städtjänst',
        headerTitle: 'Bekräfta din bokning',
        headerSubtitle: 'Granska dina uppgifter och bekräfta',
        priceOffered: 'Erbjudet pris',
        basePrice: 'Grundpris',
        total: 'Totalt',
        addExtrasTitle: 'Lägg till tillval',
        addExtrasDesc: 'Välj ett eller flera tillval. Totalpriset ovan uppdateras automatiskt.',
        serviceDetails: 'Tjänstedetaljer',
        service: 'Tjänst:',
        areaSize: 'Yta:',
        city: 'Stad:',
        extras: 'Tillval:',
        price: 'Pris:',
        contactInfo: 'Kontaktuppgifter',
        name: 'Namn:',
        email: 'E-post:',
        phone: 'Telefon:',
        address: 'Adress:',
        required: 'Obligatoriskt',
        personalNumber: 'Personnummer',
        personalPlaceholder: '10-12 siffror',
        personalHelp: 'Ange ditt personnummer (10-12 siffror). Krävs för bekräftelse.',
        additionalInfo: 'Ytterligare information',
        preferredDate: 'Önskat datum',
        preferredDateHelp: 'Välj ett datum idag eller senare',
        commentsLabel: 'Ytterligare kommentarer eller särskilda instruktioner',
        commentsPlaceholder: 'Särskilda önskemål eller instruktioner...',
        agreePrefix: 'Godkänn villkor och',
        checklist: 'checklista',
        confirming: 'Bekräftar...',
        confirmBooking: '✅ Bekräfta bokning',
        cancel: 'Avbryt',
        footerAgree: 'Genom att bekräfta godkänner du prisuppskattningen och tjänstevillkoren.',
    },
};

export default function ConfirmPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
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
    const [language, setLanguage] = useState<Language>('en');

    const t = UI_TEXT[language];
    const getExtraLabel = (extraId: string) => EXTRA_LABELS[language][extraId] ?? EXTRA_LABELS.en[extraId] ?? extraId;

    const toggleExtra = (id: string) => {
        if (id === 'none') return;
        setSelectedExtraIds((prev) =>
            prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        const queryLang = searchParams.get('lang')?.toLowerCase();
        if (queryLang === 'sv' || queryLang === 'en') {
            setLanguage(queryLang);
            return;
        }

        if (typeof window !== 'undefined') {
            const browserLang = window.navigator.language.toLowerCase();
            setLanguage(browserLang.startsWith('sv') ? 'sv' : 'en');
        }
    }, [searchParams]);

    useEffect(() => {
        if (!token) return;

        let isMounted = true;

        const fetchQuoteData = async () => {
            try {
                const response = await fetch(`/api/quote/${token}`);
                const data = await response.json();

                if (!isMounted) return;

                if (!response.ok) {
                    setError(data.error || t.failedLoadDetails);
                    setLoading(false);
                    return;
                }

                if (data.record.status === 'confirmed') {
                    setError(t.alreadyConfirmed);
                    setLoading(false);
                    return;
                }

                setQuoteData(data.record);
                setLoading(false);
            } catch (err) {
                if (!isMounted) return;
                console.error('Error fetching quote:', err);
                setError(t.failedLoadRetry);
                setLoading(false);
            }
        };

        fetchQuoteData();

        return () => {
            isMounted = false;
        };
    }, [token, t.alreadyConfirmed, t.failedLoadDetails, t.failedLoadRetry]);

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
            setError(t.mustAgreeTerms);
            setSubmitting(false);
            return;
        }

        const personalNumber = additionalInfo.personalNumber.trim();
        if (!personalNumber) {
            setPersonalNumberError(t.personalRequired);
            setSubmitting(false);
            return;
        }
        const digitsOnly = personalNumber.replace(/\D/g, '');
        if (digitsOnly.length < 10 || digitsOnly.length > 12) {
            setPersonalNumberError(t.personalLength);
            setSubmitting(false);
            return;
        }

        if (additionalInfo.preferredDateTime && new Date(additionalInfo.preferredDateTime) < new Date()) {
            setError(t.preferredDatePast);
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
                        selectedExtraLabels: selectedExtraIds.map((id) => getExtraLabel(id)).filter(Boolean),
                        extraPriceKr: selectedExtraIds.reduce((sum, id) => sum + (EXTRAS_OPTIONS.find((e) => e.id === id)?.price ?? 0), 0),
                        totalPriceKr: (priceInfo?.price ?? 0) + selectedExtraIds.reduce((sum, id) => sum + (EXTRAS_OPTIONS.find((e) => e.id === id)?.price ?? 0), 0),
                    }
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || t.failedConfirmBooking);
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
            setError(t.failedConfirmRetry);
            setSubmitting(false);
        }
    };

    const calculatePrice = (squareMeters: string | null | undefined): { price: number } | null => {
        if (!squareMeters) return null;
        const sqm = parseFloat(squareMeters);
        if (isNaN(sqm) || sqm < 0) return null;
        const roundedSqm = Math.round(sqm);

        if (roundedSqm >= 0 && roundedSqm <= 25) return { price: 1800 };
        if (roundedSqm >= 26 && roundedSqm <= 39) return { price: 2000 };
        if (roundedSqm >= 40 && roundedSqm <= 49) return { price: 2200 };
        if (roundedSqm >= 50 && roundedSqm <= 59) return { price: 2350 };
        if (roundedSqm >= 60 && roundedSqm <= 69) return { price: 2550 };
        if (roundedSqm >= 70 && roundedSqm <= 79) return { price: 2750 };
        if (roundedSqm >= 80 && roundedSqm <= 89) return { price: 2900 };
        if (roundedSqm >= 90 && roundedSqm <= 99) return { price: 3100 };
        if (roundedSqm >= 100 && roundedSqm <= 109) return { price: 3300 };
        if (roundedSqm >= 110 && roundedSqm <= 119) return { price: 3500 };
        if (roundedSqm >= 120 && roundedSqm <= 129) return { price: 3800 };
        if (roundedSqm >= 130 && roundedSqm <= 139) return { price: 4100 };
        if (roundedSqm >= 140 && roundedSqm <= 149) return { price: 4400 };

        const extraKvm = roundedSqm - 149;
        const extraBlocks = Math.ceil(extraKvm / 10);
        return { price: 4400 + extraBlocks * 300 };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-emerald-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">{t.loadingDetails}</p>
                </div>
            </div>
        );
    }

    if (error && !quoteData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-emerald-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.error}</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link 
                        href="/#contacts" 
                        className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
                    >
                        {t.contactUs}
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
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.bookingConfirmed}</h1>
                    <p className="text-gray-600 mb-6">{t.bookingConfirmedBody}</p>
                    <p className="text-sm text-gray-500">{t.redirecting}</p>
                </div>
            </div>
        );
    }

    if (!quoteData) return null;

    const serviceName = quoteData.selectedService || quoteData.serviceType || t.cleaningService;
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
                        <h1 className="text-3xl font-bold mb-2">{t.headerTitle}</h1>
                        <p className="text-cyan-100">{t.headerSubtitle}</p>
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
                                <p className="text-sm font-medium text-gray-600 mb-1">{t.priceOffered}</p>
                                <div className="space-y-1">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-gray-600">{t.basePrice}</span>
                                        <span className="font-semibold text-gray-800">{priceInfo.price} kr</span>
                                    </div>
                                    {selectedExtras.length > 0 && selectedExtras.map((extra) => (
                                        <div key={extra.id} className="flex justify-between items-baseline pt-2 border-t border-green-200">
                                            <span className="text-gray-600">{getExtraLabel(extra.id).replace(/\s*\+\d+\s*kr\s*$/, '')}</span>
                                            <span className="font-semibold text-gray-800">+{extra.price} kr</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-baseline pt-3 border-t-2 border-green-300 mt-2">
                                        <span className="font-semibold text-gray-800">{t.total}</span>
                                        <span className="text-2xl font-bold text-green-700">{totalPrice} kr</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Add some Extra's */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">{t.addExtrasTitle}</h2>
                            <p className="text-sm text-gray-500 mb-4">{t.addExtrasDesc}</p>
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
                                        <span className="text-gray-800 font-medium">{getExtraLabel(opt.id)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Service Details */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.serviceDetails}</h2>
                            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{t.service}</span>
                                    <span className="font-semibold text-gray-900">{serviceName}</span>
                                </div>
                                {squareMeter && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">{t.areaSize}</span>
                                        <span className="font-semibold text-gray-900">{squareMeter} m²</span>
                                    </div>
                                )}
                                {quoteData.city && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">{t.city}</span>
                                        <span className="font-semibold text-gray-900">{quoteData.city}</span>
                                    </div>
                                )}
                                {priceInfo && (
                                    <>
                                        {selectedExtras.length > 0 && (
                                            <>
                                                <div className="flex justify-between pt-3 border-t border-gray-200">
                                                    <span className="text-gray-600">{t.basePrice}:</span>
                                                    <span className="font-semibold text-gray-900">{basePrice} kr</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">{t.extras}</span>
                                                    <span className="font-semibold text-gray-900">{extraPrice} kr</span>
                                                </div>
                                            </>
                                        )}
                                        <div className="flex justify-between pt-3 border-t border-gray-200">
                                            <span className="text-gray-600">{t.price}</span>
                                            <span className="font-bold text-green-600 text-lg">{totalPrice} kr</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.contactInfo}</h2>
                            <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                                {quoteData.name && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">{t.name}</span>
                                        <span className="font-semibold text-gray-900">{quoteData.name}</span>
                                    </div>
                                )}
                                {quoteData.email && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">{t.email}</span>
                                        <span className="font-semibold text-gray-900">{quoteData.email}</span>
                                    </div>
                                )}
                                {quoteData.phone && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">{t.phone}</span>
                                        <span className="font-semibold text-gray-900">{quoteData.phone}</span>
                                    </div>
                                )}
                                {quoteData.address && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">{t.address}</span>
                                        <span className="font-semibold text-gray-900">{quoteData.address}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Required: Personal Number */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.required}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="personalNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t.personalNumber} <span className="text-red-500">*</span>
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
                                        placeholder={t.personalPlaceholder}
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
                                        <p className="mt-1 text-xs text-gray-500">{t.personalHelp}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">{t.additionalInfo}</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="preferredDateTime" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t.preferredDate}
                                    </label>
                                    <input
                                        type="date"
                                        id="preferredDateTime"
                                        value={additionalInfo.preferredDateTime}
                                        onChange={(e) => setAdditionalInfo({ ...additionalInfo, preferredDateTime: e.target.value })}
                                        min={minDate}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">{t.preferredDateHelp}</p>
                                </div>
                                <div>
                                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                                        {t.commentsLabel}
                                    </label>
                                    <textarea
                                        id="comments"
                                        rows={4}
                                        value={additionalInfo.comments}
                                        onChange={(e) => setAdditionalInfo({ ...additionalInfo, comments: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                                        placeholder={t.commentsPlaceholder}
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
                                <span className="text-gray-700 font-medium group-hover:text-gray-900">
                                    {t.agreePrefix}{' '}
                                    <Link
                                        href="/move-out-cleaning/checklist"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-bold bg-yellow-200 px-1 rounded underline decoration-cyan-600 hover:text-cyan-700"
                                    >
                                        {t.checklist}
                                    </Link>
                                </span>
                            </label>
                        </div>

                        {/* Confirm Button */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleConfirm}
                                disabled={submitting || !agreeToTerms}
                                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? t.confirming : t.confirmBooking}
                            </button>
                            <Link
                                href="/#contacts"
                                className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-block text-center"
                            >
                                {t.cancel}
                            </Link>
                        </div>

                        <p className="text-sm text-gray-500 text-center mt-6">
                            {t.footerAgree}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
