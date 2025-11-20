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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will contact you soon.');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor={`phone-${idPrefix}`} className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id={`phone-${idPrefix}`}
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            placeholder="0764447563"
          />
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
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
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
          className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-emerald-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Request Free Quote →
        </button>
      </form>
    </div>
  );
}

