'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import HeroCarousel from './components/HeroCarousel';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link 
                href="/" 
                onClick={() => {
                  if (window.location.pathname === '/') {
                    window.location.reload();
                  }
                }}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/amples logo.png"
                  alt="Amples Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <button className="text-gray-700 hover:text-cyan-500 transition-colors flex items-center">
                  Services
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm font-semibold text-gray-500 border-b border-gray-100">
                      Our Services
                    </div>
                    {[
                      { name: 'Move-out Cleaning', href: '/move-out-cleaning' },
                      { name: 'Home Cleaning', href: '/home-cleaning' },
                      { name: 'Detail Cleaning', href: '/detail-cleaning' },
                      { name: 'Office Cleaning', href: '/office-cleaning' },
                      { name: 'Floor Cleaning', href: '/deep-cleaning' },
                      { name: 'Window Cleaning', href: '/window-cleaning' },
                      { name: 'Stairwell Cleaning', href: '/stairwell-cleaning' },
                      { name: 'Construction Cleaning', href: '/construction-cleaning' },
                      { name: 'Gym Cleaning', href: '/gym-cleaning' }
                    ].map((service) => (
                      <a
                        key={service.name}
                        href={service.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="text-gray-700 hover:text-cyan-500 transition-colors flex items-center">
                  Featured Cities
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm font-semibold text-gray-500 border-b border-gray-100">
                      Major Cities
                    </div>
                    {['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping', 'Lund', 'Umeå'].map((city) => (
                      <a
                        key={city}
                        href={`#${city.toLowerCase().replace('ö', 'o').replace('å', 'a').replace('ä', 'a')}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                      >
                        {city}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <a href="#contacts" className="text-gray-700 hover:text-cyan-500 transition-colors">Contact</a>
              <a href="#book" className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl">Book Now</a>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-cyan-500 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-white w-80 h-full shadow-2xl overflow-y-auto animate-slide-in-right" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <Link 
                href="/" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (window.location.pathname === '/') {
                    window.location.reload();
                  }
                }}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/amples logo.png"
                  alt="Amples Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-700 hover:text-cyan-500"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Items */}
            <div className="p-4 space-y-2">
              {/* Services Dropdown */}
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between py-3 text-gray-700 font-medium">
                  Services
                </div>
                <div className="pl-4 space-y-2">
                  {[
                    { name: 'Move-out Cleaning', href: '/move-out-cleaning' },
                    { name: 'Home Cleaning', href: '/home-cleaning' },
                    { name: 'Detail Cleaning', href: '/detail-cleaning' },
                    { name: 'Office Cleaning', href: '/office-cleaning' },
                    { name: 'Deep/Heavy-duty Cleaning', href: '/deep-cleaning' },
                    { name: 'Window Cleaning', href: '/window-cleaning' },
                    { name: 'Stairwell Cleaning', href: '/stairwell-cleaning' },
                    { name: 'Construction Cleaning', href: '/construction-cleaning' },
                    { name: 'Gym Cleaning', href: '/gym-cleaning' }
                  ].map((service) => (
                    <a
                      key={service.name}
                      href={service.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm text-gray-600 hover:text-cyan-600 hover:pl-2 transition-all"
                    >
                      {service.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Featured Cities Dropdown */}
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between py-3 text-gray-700 font-medium">
                  Featured Cities
                </div>
                <div className="pl-4 space-y-2">
                  {['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping', 'Lund', 'Umeå'].map((city) => (
                    <a
                      key={city}
                      href={`#${city.toLowerCase().replace('ö', 'o').replace('å', 'a').replace('ä', 'a')}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm text-gray-600 hover:text-cyan-600 hover:pl-2 transition-all"
                    >
                      {city}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact & Book Now */}
              <div className="border-b border-gray-100 pb-4 space-y-2">
                <a 
                  href="#contacts" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 text-gray-700 hover:text-cyan-600 transition-colors"
                >
                  Contact
                </a>
              </div>

              {/* Book Now Button */}
              <div className="pt-4 border-t border-gray-100">
                <a 
                  href="#book" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-center py-3 px-6 rounded-lg font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-lg"
                >
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section with Carousel Background */}
      <section className="relative py-20 overflow-hidden min-h-[600px]">
        {/* Background Carousel */}
        <div className="absolute inset-0 w-full h-full">
          <HeroCarousel images={[
            '/cleaningOne.jpg',
            '/cleaningTwoo.jpeg',
            '/cleaningThree.jpg'
          ]} />
        </div>
        
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in text-white drop-shadow-lg">
                Professional Cleaning Services
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto lg:mx-0 animate-fade-in-delay text-white drop-shadow">
                Transform your space with our reliable, efficient, and eco-friendly cleaning solutions. From homes to offices, we deliver exceptional results every time.
              </p>
            </div>

            {/* Right Side - Contact Form */}
            <div className="relative z-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

