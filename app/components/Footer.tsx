'use client';

import Image from 'next/image';
import Link from 'next/link';

const services = [
  { name: 'Move-out Cleaning', href: '/move-out-cleaning' },
  { name: 'Home Cleaning', href: '/home-cleaning' },
  { name: 'Detail Cleaning', href: '/detail-cleaning' },
  { name: 'Office Cleaning', href: '/office-cleaning' },
  { name: 'Deep/Heavy-duty Cleaning', href: '/deep-cleaning' },
  { name: 'Window Cleaning', href: '/window-cleaning' },
  { name: 'Staircase Cleaning', href: '/stairwell-cleaning' },
  { name: 'Construction Cleaning', href: '/construction-cleaning' }
];

const cities = [
  'Stockholm',
  'Göteborg',
  'Malmö',
  'Uppsala',
  'Gävle',
  'Västerås',
  'Örebro',
  'Linköping',
  'Helsingborg',
  'Jönköping',
  'Norrköping',
  'Lund',
  'Umeå'
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8">
          
          {/* Column 1: Services */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-cyan-400 pb-2 border-b-2 border-cyan-500 inline-block">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 flex items-center group"
                  >
                    <svg className="w-4 h-4 mr-2 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Cities */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-cyan-400 pb-2 border-b-2 border-cyan-500 inline-block">
              Featured Cities
            </h3>
            <ul className="space-y-2">
              {cities.map((city) => {
                const cityHref = city === 'Stockholm' ? '/stockholm' 
                  : city === 'Uppsala' ? '/uppsala' 
                  : city === 'Gävle' ? '/gavle' 
                  : city === 'Örebro' ? '/orebro' 
                  : city === 'Göteborg' ? '/gothenburg' 
                  : city === 'Malmö' ? '/malmo' 
                  : city === 'Västerås' ? '/vasteras' 
                  : city === 'Linköping' ? '/linkoping' 
                  : city === 'Helsingborg' ? '/helsingborg' 
                  : city === 'Jönköping' ? '/jonkoping' 
                  : city === 'Norrköping' ? '/norrkoping' 
                  : city === 'Lund' ? '/lund' 
                  : city === 'Umeå' ? '/umea' 
                  : '#';
                
                return (
                <li key={city}>
                    <Link
                      href={cityHref}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 flex items-center group"
                  >
                    <svg className="w-4 h-4 mr-2 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {city}
                    </Link>
                </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-cyan-400 pb-2 border-b-2 border-cyan-500 inline-block">
              Contact Us
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-cyan-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-gray-300 font-medium">Phone</p>
                  <a href="tel:+46123456789" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    0764447563
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-cyan-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-gray-300 font-medium">Email</p>
                  <a href="mailto:info@amples.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    info@amples.com
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 mr-3 text-cyan-400 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-gray-300 font-medium">Hours</p>
                  <p className="text-gray-400">
                    Mon-Sun 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section with Logo and Copyright */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Logo */}
            <div className="mb-4 md:mb-0">
              <Image
                src="/amples logo.png"
                alt="Amples Logo"
                width={140}
                height={50}
                className="h-12 w-auto opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
              />
            </div>
            
            {/* Links */}
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#privacy" className="text-gray-400 hover:text-cyan-400 transition-colors">Privacy Policy</a>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © 2025 <span className="text-cyan-400 font-semibold">Amples</span>. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Professional cleaning services you can trust.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

