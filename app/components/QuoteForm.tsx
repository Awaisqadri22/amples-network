'use client';

import { useState } from 'react';

interface QuoteFormProps {
  idPrefix?: string;
  sticky?: boolean;
}

export default function QuoteForm({ idPrefix = 'form', sticky = true }: QuoteFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [phoneError, setPhoneError] = useState<string>('');

  const validateSwedishPhone = (phone: string): boolean => {
    if (!phone.trim()) return false;
    const digits = phone.replace(/\D/g, '');
    return digits.length === 9;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const nextValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 9) : value;
    setFormData({
      ...formData,
      [name]: nextValue
    });
    
    // Clear phone error when user starts typing
    if (name === 'phone' && phoneError) {
      setPhoneError('');
    }
  };

  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && !validateSwedishPhone(value)) {
      setPhoneError('Phone number must be exactly 9 digits (numbers only)');
    } else {
      setPhoneError('');
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-2xl p-6 ${sticky ? 'sticky top-24' : ''}`}>
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Get Your Free Quote
        </h2>
        <p className="text-sm text-gray-600">
          Quick & easy - we&apos;ll contact you within 24 hours
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor={`name-${idPrefix}`} className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id={`name-${idPrefix}`}
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder:text-gray-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor={`phone-${idPrefix}`} className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 z-10">
              <span className="text-2xl">🇸🇪</span>
              <span className="text-gray-600 font-medium">+46</span>
            </div>
            <input
              type="tel"
              id={`phone-${idPrefix}`}
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              onBlur={handlePhoneBlur}
              maxLength={9}
              className={`w-full pl-20 pr-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder:text-gray-500 ${
                phoneError ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="701234567"
            />
          </div>
          {phoneError && (
            <p className="mt-1 text-sm text-red-600">{phoneError}</p>
          )}
        </div>
        <div>
          <label htmlFor={`email-${idPrefix}`} className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id={`email-${idPrefix}`}
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder:text-gray-500"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label htmlFor={`message-${idPrefix}`} className="block text-sm font-medium text-gray-700 mb-1">
            Message (Optional)
          </label>
          <textarea
            id={`message-${idPrefix}`}
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
            placeholder="Tell us about your needs..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-emerald-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : status === 'success' ? (
            'Message Sent! ✓'
          ) : status === 'error' ? (
            'Failed to Send ✕'
          ) : (
            'Request Free Quote →'
          )}
        </button>
        {status === 'success' && (
          <p className="text-green-600 text-sm text-center mt-2">
            Thank you! We will contact you shortly.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-sm text-center mt-2">
            Something went wrong. Please try again later.
          </p>
        )}
      </form>
    </div>
  );
}

