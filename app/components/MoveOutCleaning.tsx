'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  { name: 'Move-out-Cleaning', slug: 'move-out-cleaning' },
  { name: 'Home Cleaning', slug: 'home-cleaning' },
  { name: 'Detail Cleaning', slug: 'detail-cleaning' },
  { name: 'Office Cleaning', slug: 'office-cleaning' },
  { name: 'Deep/Heavy-duty Cleaning', slug: 'deep-heavy-duty-cleaning' },
  { name: 'Window Cleaning', slug: 'window-cleaning' },
  { name: 'Stairwell Cleaning', slug: 'stairwell-cleaning' },
  { name: 'ConstructionCleaning', slug: 'construction-cleaning' },
  { name: 'Gym Cleaning', slug: 'gym-cleaning' }
];

export default function MoveOutCleaning() {
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

      {/* Hero Banner */}
      <section className="relative h-[500px] bg-gradient-to-br from-cyan-500 via-emerald-500 to-cyan-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: "url('/cleaningOne.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3
        }}></div>
        
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="inline-block px-4 py-2 bg-cyan-500/80 backdrop-blur-sm rounded-full mb-6">
              <span className="text-white font-semibold">Professional Service</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              Move-out Cleaning
            </h1>
            <p className="text-xl md:text-2xl text-white drop-shadow max-w-3xl mx-auto">
              A comprehensive cleaning service to ensure you get your full security deposit back. 
              We handle every detail so you don&apos;t have to.
            </p>
          </div>
        </div>
      </section>

      {/* Page Details Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Complete Move-out Cleaning Service
              </h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  When you&apos;re moving out of a rental property, getting your security deposit back is crucial. 
                  Our comprehensive move-out cleaning service ensures your property is spotless and meets all 
                  landlord requirements.
                </p>
                <p>
                  We understand the stress of moving. That&apos;s why we handle the deep cleaning so you can focus 
                  on settling into your new home. Our experienced team follows a detailed checklist to ensure 
                  every corner is cleaned to perfection.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Clean:</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'All rooms and hallways',
                    'Kitchen and appliances',
                    'Bathrooms (deep clean)',
                    'Windows and sills',
                    'Baseboards and moldings',
                    'Light fixtures',
                    'Closets and cabinets',
                    'Inside all drawers',
                    'Floors (vacuum and mop)',
                    'Carpet cleaning',
                    'Oven and refrigerator',
                    'Walls and doors',
                    'Ceiling fans',
                    'Ventilation grilles'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-cyan-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-xl border border-cyan-200">
                <div className="flex items-start">
                  <svg className="w-8 h-8 text-cyan-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Why Choose Us?</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Satisfaction guaranteed or we&apos;ll return to reclean</li>
                      <li>• Green cleaning products available</li>
                      <li>• Insured and bonded professionals</li>
                      <li>• Flexible scheduling to fit your move-out date</li>
                      <li>• Competitive pricing with no hidden fees</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/cleaningThree.jpg"
                  alt="Move-out Cleaning"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Form Section */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Get Your Free Quote Today
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the form below and we&apos;ll contact you within 24 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="0764447563"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Tell us about your cleaning needs..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-cyan-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Request Free Quote
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Other Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Our Other Services
            </h2>
            <p className="text-xl text-gray-600">
              We offer a complete range of professional cleaning services
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <a
                key={service.slug}
                href={`#${service.slug}`}
                className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-cyan-400"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Professional cleaning service tailored to your needs
                  </p>
                  <div className="flex items-center text-cyan-600 font-semibold group-hover:text-cyan-700">
                    Learn more
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 bg-gradient-to-br from-cyan-500 to-emerald-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Book your move-out cleaning service today and ensure a smooth transition to your new home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0764447563"
              className="px-8 py-4 bg-white text-cyan-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Call Now: 0764447563
            </a>
            <a
              href="#book"
              className="px-8 py-4 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white"
            >
              Book Online
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

