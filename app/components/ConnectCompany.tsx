'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from './Footer';

const services = [
  { name: 'Move-out Cleaning', href: '/move-out-cleaning', icon: '🚚' },
  { name: 'Home Cleaning', href: '/home-cleaning', icon: '🏠' },
  { name: 'Detail Cleaning', href: '/detail-cleaning', icon: '✨' },
  { name: 'Office Cleaning', href: '/office-cleaning', icon: '🏢' },
  { name: 'Deep/Heavy-duty Cleaning', href: '/deep-cleaning', icon: '💪' },
  { name: 'Window Cleaning', href: '/window-cleaning', icon: '🪟' },
  { name: 'Staircase Cleaning', href: '/stairwell-cleaning', icon: '🪜' },
  { name: 'Construction Cleaning', href: '/construction-cleaning', icon: '🔨' },
  { name: 'Gym Cleaning', href: '/gym-cleaning', icon: '💪' }
];

export default function ConnectCompany() {
  const [formData, setFormData] = useState({
    placeOfBusiness: '',
    phone: '',
    email: '',
    agreeToPrivacy: false
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [isCollaborationOpen, setIsCollaborationOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const cleaned = phone.replace(/[\s\-+46]/g, '');
    return /^0?[1-9]\d{8,9}$/.test(cleaned) || /^07\d{8}$/.test(cleaned);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.placeOfBusiness.trim()) {
      setError('Please enter your place of business');
      return;
    }

    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid Swedish phone number');
      return;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!formData.agreeToPrivacy) {
      setError('Please agree to the privacy policy');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.placeOfBusiness,
          phone: formData.phone,
          email: formData.email,
          serviceType: 'Company Partnership',
          selectedService: 'Office Cleaning',
          formType: 'company',
          message: `Company Partnership Interest - Place of Business: ${formData.placeOfBusiness}`,
          submissionKind: 'quote'
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          placeOfBusiness: '',
          phone: '',
          email: '',
          agreeToPrivacy: false
        });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setError('Failed to submit. Please try again.');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setError('Failed to submit. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/amples logo.png"
                alt="Amples Logo"
                width={120}
                height={40}
                className="h-10 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
            <Link href="/" className="text-gray-700 hover:text-cyan-500 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Banner Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-600">
          <div className="absolute inset-0 bg-[url('/connect%202.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <div className="text-sm uppercase tracking-wider text-cyan-200 mb-4">Partnership</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Connect Company
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-2xl">
              Partner with Amples to expand your cleaning business and reach more customers
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section - 70/30 Split */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
            {/* Left side - 70% Text Content */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                We help you get more customers and grow
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-justify">
                  By collaborating with Qleano, you get more customers in a simple and risk-free way. You don't pay for potential customers or "leads", but instead have the choice to say yes or no to completed bookings. This means that you don't have to spend money without getting something in return. It also means less work for you as an affiliated company as you don't have to spend time on producing quotes, answering any questions from the customer, invoicing, any complaints and handling RUT deductions. All so that you can focus on carrying out the cleaning/moving as well as possible.
                </p>

                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Questions and Answers
                  </h3>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setIsCollaborationOpen(!isCollaborationOpen)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <span className="font-semibold text-gray-900">
                        What does a collaboration with Amples look like?
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isCollaborationOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isCollaborationOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-4 bg-white border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">
                          We send you completed assignments where you choose whether to accept or decline. If you choose to accept, you will receive confirmation of the assignment with information about key management, address, price, time and date. You then go to the agreed time and place and carry out the assignment. Once a month, you will receive a summary from us of all assignments you have completed in the previous month, after which you will invoice us for the work.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg overflow-hidden mt-4">
                    <button
                      onClick={() => setIsPricingOpen(!isPricingOpen)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                    >
                      <span className="font-semibold text-gray-900">
                        What do you get for the assignments you carry out through us?
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isPricingOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isPricingOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-4 bg-white border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">
                          All of our subcontractors have a fixed price per square meter that varies depending on which city you work in. If you would like to know what price per square meter we can offer in your particular city, you can contact us and we will tell you more.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - 30% Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-2xl p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Would you like to know more? Register your interest!
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="placeOfBusiness" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Place of business
                    </label>
                    <input
                      type="text"
                      id="placeOfBusiness"
                      name="placeOfBusiness"
                      value={formData.placeOfBusiness}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder:text-gray-500"
                      placeholder="Enter your business location"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone number
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                        <span className="text-2xl">🇸🇪</span>
                        <span className="text-gray-600 font-medium">+46</span>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-20 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder:text-gray-500"
                        placeholder="70 123 45 67"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder:text-gray-500"
                      placeholder="example@email.com"
                      required
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreeToPrivacy"
                      name="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="agreeToPrivacy" className="ml-2 text-sm text-gray-600">
                      I agree to receive communications in accordance with the privacy policy
                    </label>
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-50 text-red-800 text-sm border border-red-200">
                      {error}
                    </div>
                  )}

                  {status === 'success' && (
                    <div className="p-3 rounded-lg bg-green-50 text-green-800 text-sm border border-green-200">
                      Thank you! We'll be in touch soon.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                      status === 'loading'
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:from-cyan-600 hover:to-emerald-600'
                    }`}
                  >
                    {status === 'loading' ? 'Submitting...' : 'Register your interest'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Explore Our Services
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            As a partner, you can offer any of these professional cleaning services
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-emerald-500 opacity-90"></div>
                <div className="relative p-8 text-white">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className="text-gray-100 mb-4">
                    Professional {service.name.toLowerCase()} solutions
                  </p>
                  <div className="flex items-center text-white font-semibold">
                    Learn More
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-white/20 rounded-xl"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-500 to-emerald-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join the Amples network today and start connecting with customers across Sweden
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0764447563"
              className="bg-white text-cyan-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              📞 Call Us Now
            </a>
            <Link
              href="/"
              className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

