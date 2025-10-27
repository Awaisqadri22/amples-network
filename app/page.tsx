'use client';

import Image from 'next/image';
import { useState } from 'react';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import HeroCarousel from './components/HeroCarousel';

export default function Home() {
  const [language, setLanguage] = useState('en');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const translations = {
    en: {
      nav: {
        services: 'Services',
        portfolio: 'Portfolio',
        cities: 'Featured Cities',
        contact: 'Contact',
        bookNow: 'Book Now'
      },
      hero: {
        title: 'Professional Cleaning Services',
        subtitle: 'Transform your space with our reliable, efficient, and eco-friendly cleaning solutions. From homes to offices, we deliver exceptional results every time.',
        formTitle: 'Get Your Free Quote',
        form: {
          fullName: 'Full Name',
          companyName: 'Company Name',
          serviceType: 'Type of Service',
          propertyType: 'Type of Property',
          phone: 'Phone Number',
          email: 'Email Address',
          area: 'Property Area (Square Meters)',
          address: 'City/Address',
          date: 'Preferred Service Date',
          submit: 'Get Free Quote',
          placeholders: {
            name: 'Your full name',
            company: 'Company name (optional)',
            phone: '(555) 123-4567',
            email: 'your@email.com',
            area: 'e.g., 150',
            address: 'City, State, ZIP Code'
          },
          services: {
            select: 'Select a service',
            residential: 'Residential Cleaning',
            commercial: 'Commercial Cleaning',
            deep: 'Deep Cleaning',
            move: 'Move-in/Move-out',
            postConstruction: 'Post-Construction',
            carpet: 'Carpet Cleaning',
            window: 'Window Cleaning',
            other: 'Other'
          },
          properties: {
            select: 'Select property type',
            apartment: 'Apartment',
            house: 'House',
            condo: 'Condominium',
            office: 'Office',
            retail: 'Retail Space',
            warehouse: 'Warehouse',
            other: 'Other'
          }
        }
      },
      services: {
        title: 'Our Services',
        residential: {
          title: 'Residential Cleaning',
          desc: 'Complete home cleaning services including deep cleaning, regular maintenance, and move-in/out cleaning.'
        },
        commercial: {
          title: 'Commercial Cleaning',
          desc: 'Professional office and commercial space cleaning with flexible scheduling to fit your business needs.'
        },
        specialized: {
          title: 'Specialized Services',
          desc: 'Carpet cleaning, window washing, post-construction cleanup, and other specialized cleaning solutions.'
        }
      },
      contact: {
        title: 'Get In Touch',
        phone: 'Phone',
        email: 'Email',
        hours: 'Hours',
        hoursText: 'Mon-Fri: 8AM-6PM\nSat-Sun: 9AM-4PM'
      },
      footer: {
        tagline: 'Professional cleaning services you can trust.',
        terms: 'Terms of Service',
        privacy: 'Privacy Policy',
        copyright: '© 2025 Amples. All rights reserved.'
      }
    },
    sv: {
      nav: {
        services: 'Tjänster',
        portfolio: 'Portfolio',
        cities: 'Utvalda Städer',
        contact: 'Kontakt',
        bookNow: 'Boka Nu'
      },
      hero: {
        title: 'Professionella Städtjänster',
        subtitle: 'Förvandla ditt utrymme med våra pålitliga, effektiva och miljövänliga städlösningar. Från hem till kontor levererar vi exceptionella resultat varje gång.',
        formTitle: 'Få Din Gratis Offer',
        form: {
          fullName: 'Fullständigt Namn',
          companyName: 'Företagsnamn',
          serviceType: 'Typ av Tjänst',
          propertyType: 'Typ av Fastighet',
          phone: 'Telefonnummer',
          email: 'E-postadress',
          area: 'Fastighetsarea (Kvadratmeter)',
          address: 'Stad/Adress',
          date: 'Önskat Servicedatum',
          submit: 'Få Gratis Offer',
          placeholders: {
            name: 'Ditt fullständiga namn',
            company: 'Företagsnamn (valfritt)',
            phone: '(555) 123-4567',
            email: 'din@email.com',
            area: 't.ex., 150',
            address: 'Stad, Land, Postnummer'
          },
          services: {
            select: 'Välj en tjänst',
            residential: 'Bostadsstädning',
            commercial: 'Kontorsstädning',
            deep: 'Djupstädning',
            move: 'Flyttstädning',
            postConstruction: 'Efter Byggnation',
            carpet: 'Mattstädning',
            window: 'Fönsterputsning',
            other: 'Annat'
          },
          properties: {
            select: 'Välj fastighetstyp',
            apartment: 'Lägenhet',
            house: 'Hus',
            condo: 'Bostadsrätt',
            office: 'Kontor',
            retail: 'Butikslokal',
            warehouse: 'Lager',
            other: 'Annat'
          }
        }
      },
      services: {
        title: 'Våra Tjänster',
        residential: {
          title: 'Bostadsstädning',
          desc: 'Komplett hemstädning inklusive djupstädning, regelbunden underhåll och flyttstädning.'
        },
        commercial: {
          title: 'Kontorsstädning',
          desc: 'Professionell kontors- och kommersiell städning med flexibel schemaläggning som passar ditt företag.'
        },
        specialized: {
          title: 'Specialiserade Tjänster',
          desc: 'Mattstädning, fönsterputsning, efterbyggnadsstädning och andra specialiserade städlösningar.'
        }
      },
      contact: {
        title: 'Kontakta Oss',
        phone: 'Telefon',
        email: 'E-post',
        hours: 'Öppettider',
        hoursText: 'Mån-Fre: 08:00-18:00\nLör-Sön: 09:00-16:00'
      },
      footer: {
        tagline: 'Professionella städtjänster du kan lita på.',
        terms: 'Användarvillkor',
        privacy: 'Integritetspolicy',
        copyright: '© 2025 Amples. Alla rättigheter förbehållna.'
      }
    }
  };

  const t = translations[language as keyof typeof translations];
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Image
                src="/amples logo.png"
                alt="Amples Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <div className="relative group">
                <button className="text-gray-700 hover:text-cyan-500 transition-colors flex items-center">
                  {t.nav.services}
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm font-semibold text-gray-500 border-b border-gray-100">
                      {language === 'en' ? 'Our Services' : 'Våra Tjänster'}
                    </div>
                    {[
                      { en: 'Moving Cleaning', sv: 'Flyttstädning' },
                      { en: 'Construction Cleaning', sv: 'Byggstädning' },
                      { en: 'Stair Cleaning', sv: 'Trappstädning' },
                      { en: 'Estate Cleaning', sv: 'Fastighetsstädning' },
                      { en: 'General Cleaning', sv: 'Allmän Städning' },
                      { en: 'Window Cleaning', sv: 'Fönsterputsning' },
                      { en: 'Office Cleaning', sv: 'Kontorsstädning' },
                      { en: 'Home Cleaning', sv: 'Hemstädning' },
                      { en: 'Rough Cleaning', sv: 'Grovstädning' }
                    ].map((service) => (
                      <a
                        key={service.en}
                        href={`#${service.en.toLowerCase().replace(' ', '-')}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                      >
                        {language === 'en' ? service.en : service.sv}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="relative group">
                <button className="text-gray-700 hover:text-cyan-500 transition-colors flex items-center">
                  {t.nav.cities}
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm font-semibold text-gray-500 border-b border-gray-100">
                      {language === 'en' ? 'Major Cities' : 'Större Städer'}
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
              <a href="#contacts" className="text-gray-700 hover:text-cyan-500 transition-colors">{t.nav.contact}</a>
              <a href="#book" className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl">{t.nav.bookNow}</a>
              
              {/* Language Switcher */}
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-cyan-500 transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'SV'}</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <button
                      onClick={() => setLanguage('en')}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        language === 'en' 
                          ? 'bg-cyan-50 text-cyan-600 font-medium' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      🇺🇸 English
                    </button>
                    <button
                      onClick={() => setLanguage('sv')}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        language === 'sv' 
                          ? 'bg-cyan-50 text-cyan-600 font-medium' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      🇸🇪 Svenska
                    </button>
                  </div>
                </div>
              </div>
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
              <Image
                src="/amples logo.png"
                alt="Amples Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
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
                  {t.nav.services}
                </div>
                <div className="pl-4 space-y-2">
                  {[
                    { en: 'Moving Cleaning', sv: 'Flyttstädning' },
                    { en: 'Construction Cleaning', sv: 'Byggstädning' },
                    { en: 'Stair Cleaning', sv: 'Trappstädning' },
                    { en: 'Estate Cleaning', sv: 'Fastighetsstädning' },
                    { en: 'General Cleaning', sv: 'Allmän Städning' },
                    { en: 'Window Cleaning', sv: 'Fönsterputsning' },
                    { en: 'Office Cleaning', sv: 'Kontorsstädning' },
                    { en: 'Home Cleaning', sv: 'Hemstädning' },
                    { en: 'Rough Cleaning', sv: 'Grovstädning' }
                  ].map((service) => (
                    <a
                      key={service.en}
                      href={`#${service.en.toLowerCase().replace(' ', '-')}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm text-gray-600 hover:text-cyan-600 hover:pl-2 transition-all"
                    >
                      {language === 'en' ? service.en : service.sv}
                    </a>
                  ))}
                </div>
              </div>

              {/* Featured Cities Dropdown */}
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between py-3 text-gray-700 font-medium">
                  {t.nav.cities}
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
                  {t.nav.contact}
                </a>
              </div>

              {/* Language Switcher */}
              <div className="py-4">
                <div className="flex items-center space-x-4 px-4">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      language === 'en' 
                        ? 'bg-cyan-50 text-cyan-600 font-medium' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('sv');
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      language === 'sv' 
                        ? 'bg-cyan-50 text-cyan-600 font-medium' 
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    🇸🇪 Svenska
                  </button>
                </div>
              </div>

              {/* Book Now Button */}
              <div className="pt-4 border-t border-gray-100">
                <a 
                  href="#book" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-center py-3 px-6 rounded-lg font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-lg"
                >
                  {t.nav.bookNow}
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
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto lg:mx-0 animate-fade-in-delay text-white drop-shadow">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Right Side - Contact Form */}
            <div className="relative z-10">
              <ContactForm t={t} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection t={t} />

      {/* Contact Section */}
      <ContactSection t={t} />

      {/* Footer */}
      <Footer t={t} />
    </div>
  );
}

