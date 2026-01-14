'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [citiesDropdownOpen, setCitiesDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setCitiesDropdownOpen(false);
  };

  return (
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
                    { name: 'Staircase Cleaning', href: '/stairwell-cleaning' },
                    { name: 'Construction Cleaning', href: '/construction-cleaning' }
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
                    {['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping', 'Lund', 'Umeå'].map((city) => {
                      const cityHref = city === 'Stockholm' ? '/stockholm' : city === 'Uppsala' ? '/uppsala' : city === 'Örebro' ? '/orebro' : city === 'Göteborg' ? '/gothenburg' : city === 'Malmö' ? '/malmo' : city === 'Västerås' ? '/vasteras' : city === 'Linköping' ? '/linkoping' : city === 'Helsingborg' ? '/helsingborg' : city === 'Jönköping' ? '/jonkoping' : city === 'Norrköping' ? '/norrkoping' : city === 'Lund' ? '/lund' : city === 'Umeå' ? '/umea' : `#${city.toLowerCase().replace('ö', 'o').replace('å', 'a').replace('ä', 'a')}`;
                      return (
                        <a
                          key={city}
                          href={cityHref}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                        >
                          {city}
                        </a>
                      );
                    })}
                </div>
              </div>
            </div>
            <Link href="/move-out-cleaning/checklist" className="text-gray-700 hover:text-cyan-500 transition-colors">Moving Cleaning Checklist</Link>
            <Link href={isHomePage ? "#contacts" : "/#contacts"} className="text-gray-700 hover:text-cyan-500 transition-colors">Contact US</Link>
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMobileMenu}>
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
                onClick={closeMobileMenu}
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
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className="flex items-center justify-between w-full py-3 text-gray-700 font-medium hover:text-cyan-600 transition-colors"
                >
                  <span>Services</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {servicesDropdownOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    {[
                      { name: 'Move-out Cleaning', href: '/move-out-cleaning' },
                      { name: 'Home Cleaning', href: '/home-cleaning' },
                      { name: 'Detail Cleaning', href: '/detail-cleaning' },
                      { name: 'Office Cleaning', href: '/office-cleaning' },
                      { name: 'Deep/Heavy-duty Cleaning', href: '/deep-cleaning' },
                      { name: 'Window Cleaning', href: '/window-cleaning' },
                      { name: 'Staircase Cleaning', href: '/stairwell-cleaning' },
                      { name: 'Construction Cleaning', href: '/construction-cleaning' }
                    ].map((service) => (
                      <a
                        key={service.name}
                        href={service.href}
                        onClick={closeMobileMenu}
                        className="block py-2 text-sm text-gray-600 hover:text-cyan-600 hover:pl-2 transition-all"
                      >
                        {service.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Featured Cities Dropdown */}
              <div className="border-b border-gray-100 pb-4">
                <button
                  onClick={() => setCitiesDropdownOpen(!citiesDropdownOpen)}
                  className="flex items-center justify-between w-full py-3 text-gray-700 font-medium hover:text-cyan-600 transition-colors"
                >
                  <span>Featured Cities</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${citiesDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {citiesDropdownOpen && (
                  <div className="pl-4 space-y-2 mt-2">
                    {['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Västerås', 'Örebro', 'Linköping', 'Helsingborg', 'Jönköping', 'Norrköping', 'Lund', 'Umeå'].map((city) => {
                      const cityHref = city === 'Stockholm' ? '/stockholm' : city === 'Uppsala' ? '/uppsala' : city === 'Örebro' ? '/orebro' : city === 'Göteborg' ? '/gothenburg' : city === 'Malmö' ? '/malmo' : city === 'Västerås' ? '/vasteras' : city === 'Linköping' ? '/linkoping' : city === 'Helsingborg' ? '/helsingborg' : city === 'Jönköping' ? '/jonkoping' : city === 'Norrköping' ? '/norrkoping' : city === 'Lund' ? '/lund' : city === 'Umeå' ? '/umea' : `#${city.toLowerCase().replace('ö', 'o').replace('å', 'a').replace('ä', 'a')}`;
                      return (
                        <a
                          key={city}
                          href={cityHref}
                          onClick={closeMobileMenu}
                          className="block py-2 text-sm text-gray-600 hover:text-cyan-600 hover:pl-2 transition-all"
                        >
                          {city}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Moving Cleaning Checklist */}
              <div className="border-b border-gray-100 pb-4 space-y-2">
                <Link 
                  href="/move-out-cleaning/checklist" 
                  onClick={closeMobileMenu}
                  className="block py-3 text-gray-700 hover:text-cyan-600 transition-colors"
                >
                  Moving Cleaning Checklist
                </Link>
              </div>

              {/* Contact */}
              <div className="border-b border-gray-100 pb-4 space-y-2">
                <Link 
                  href={isHomePage ? "#contacts" : "/#contacts"} 
                  onClick={closeMobileMenu}
                  className="block py-3 text-gray-700 hover:text-cyan-600 transition-colors"
                >
                  Contact US
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

