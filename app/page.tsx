'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [language, setLanguage] = useState('en');

  const translations = {
    en: {
      nav: {
        services: 'Services',
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
      {/* Navigation Bar */}

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
              <a href="#services" className="text-gray-700 hover:text-cyan-500 transition-colors">{t.nav.services}</a>
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
                    {['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville'].map((city) => (
                      <a
                        key={city}
                        href={`#${city.toLowerCase().replace(' ', '-')}`}
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
              <button className="text-gray-700 hover:text-cyan-500">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
   
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto lg:mx-0 animate-fade-in-delay">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 animate-slide-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t.hero.formTitle}</h2>
              <form className="space-y-6">
                {/* Name/Company Name */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.hero.form.fullName} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
                      placeholder={t.hero.form.placeholders.name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.hero.form.companyName}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
                      placeholder={t.hero.form.placeholders.company}
                    />
                  </div>
                </div>

                {/* Service Type */}
                <div className="form-group">
                  <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.hero.form.serviceType} *
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                  >
                    <option value="">{t.hero.form.services.select}</option>
                    <option value="residential">{t.hero.form.services.residential}</option>
                    <option value="commercial">{t.hero.form.services.commercial}</option>
                    <option value="deep">{t.hero.form.services.deep}</option>
                    <option value="move">{t.hero.form.services.move}</option>
                    <option value="post-construction">{t.hero.form.services.postConstruction}</option>
                    <option value="carpet">{t.hero.form.services.carpet}</option>
                    <option value="window">{t.hero.form.services.window}</option>
                    <option value="other">{t.hero.form.services.other}</option>
                  </select>
                </div>

                {/* Housing Type */}
                <div className="form-group">
                  <label htmlFor="housingType" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.hero.form.propertyType} *
                  </label>
                  <select
                    id="housingType"
                    name="housingType"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                  >
                    <option value="">{t.hero.form.properties.select}</option>
                    <option value="apartment">{t.hero.form.properties.apartment}</option>
                    <option value="house">{t.hero.form.properties.house}</option>
                    <option value="condo">{t.hero.form.properties.condo}</option>
                    <option value="office">{t.hero.form.properties.office}</option>
                    <option value="retail">{t.hero.form.properties.retail}</option>
                    <option value="warehouse">{t.hero.form.properties.warehouse}</option>
                    <option value="other">{t.hero.form.properties.other}</option>
                  </select>
                </div>

                {/* Phone and Email */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.hero.form.phone} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
                      placeholder={t.hero.form.placeholders.phone}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t.hero.form.email} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
                      placeholder={t.hero.form.placeholders.email}
                    />
                  </div>
                </div>

                {/* Square Meter Area */}
                <div className="form-group">
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.hero.form.area} *
                  </label>
                  <input
                    type="number"
                    id="area"
                    name="area"
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                    placeholder={t.hero.form.placeholders.area}
                  />
                </div>

                {/* City/Address */}
                <div className="form-group">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.hero.form.address} *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                    placeholder={t.hero.form.placeholders.address}
                  />
                </div>

                {/* Date Picker */}
                <div className="form-group">
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                    {t.hero.form.date}
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-blue-400"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-cyan-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                >
                  <span className="flex items-center justify-center">
                    {t.hero.form.submit}
                    <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">{t.services.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.services.residential.title}</h3>
              <p className="text-gray-600">{t.services.residential.desc}</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.services.commercial.title}</h3>
              <p className="text-gray-600">{t.services.commercial.desc}</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t.services.specialized.title}</h3>
              <p className="text-gray-600">{t.services.specialized.desc}</p>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contacts" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">{t.contact.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-600">{t.contact.phone}</h3>
              <p className="text-gray-600">(555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-600">{t.contact.email}</h3>
              <p className="text-gray-600">info@cleanpro.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-600">{t.contact.hours}</h3>
              <p className="text-gray-600">{t.contact.hoursText.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < t.contact.hoursText.split('\n').length - 1 && <br />}
                </span>
              ))}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">{t.footer.tagline}</p>
            </div>
            <div className="flex space-x-6">
              <a href="#terms" className="text-gray-400 hover:text-white transition-colors">{t.footer.terms}</a>
              <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">{t.footer.privacy}</a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
