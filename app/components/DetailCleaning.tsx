'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from './ContactForm';
import Footer from './Footer';

const services = [
  { name: 'Move-out Cleaning', href: '/move-out-cleaning', icon: '🚚' },
  { name: 'Home Cleaning', href: '/home-cleaning', icon: '🏠' },
  { name: 'Detail Cleaning', href: '/detail-cleaning', icon: '✨', active: true },
  { name: 'Office Cleaning', href: '/office-cleaning', icon: '🏢' },
  { name: 'Deep/Heavy-duty Cleaning', href: '/deep-cleaning', icon: '💪' },
  { name: 'Window Cleaning', href: '/window-cleaning', icon: '🪟' },
  { name: 'Staircase Cleaning', href: '/stairwell-cleaning', icon: '🪜' },
  { name: 'Construction Cleaning', href: '/construction-cleaning', icon: '🔨' },
  { name: 'Gym Cleaning', href: '/gym-cleaning', icon: '💪' }
];

export default function DetailCleaning() {

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
          <div className="absolute inset-0 bg-[url('/cleaningOne.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <div className="text-sm uppercase tracking-wider text-cyan-200 mb-4">Our Service</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Detail Cleaning
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-2xl">
              Meticulous attention to detail for a spotless, pristine environment that exceeds expectations
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Professional Detail Cleaning Services
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                At Amples, we believe that true cleanliness lies in the details. Our comprehensive detail cleaning services go beyond surface cleaning to ensure every nook, cranny, and corner of your space is immaculately clean and sanitized.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Our experienced team uses specialized tools and eco-friendly products to reach those hard-to-access areas, ensuring a level of cleanliness that standard cleaning simply cannot achieve.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-cyan-600 mb-2">✓ Thorough</h4>
                  <p className="text-sm text-gray-600">Every detail matters</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-600 mb-2">✓ Eco-Friendly</h4>
                  <p className="text-sm text-gray-600">Safe for your family</p>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-cyan-600 mb-2">✓ Experienced</h4>
                  <p className="text-sm text-gray-600">Professional team</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-600 mb-2">✓ Affordable</h4>
                  <p className="text-sm text-gray-600">Best value pricing</p>
                </div>
              </div>
            </div>

            {/* Right side - 30% Form */}
            <div className="lg:col-span-3">
              <ContactForm defaultService="Detail Cleaning" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Explore Our Other Services
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We offer a comprehensive range of professional cleaning services to meet all your needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.name}
                href={service.href}
                className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  service.active ? 'ring-2 ring-cyan-500' : ''
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-emerald-500 opacity-90"></div>
                {service.active && (
                  <div className="absolute top-4 right-4 bg-white text-cyan-600 px-3 py-1 rounded-full text-xs font-semibold">
                    Current
                  </div>
                )}
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

