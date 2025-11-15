'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  { name: 'Move-out Cleaning', href: '/move-out-cleaning', icon: '🚚' },
  { name: 'Home Cleaning', href: '/home-cleaning', icon: '🏠' },
  { name: 'Detail Cleaning', href: '/detail-cleaning', icon: '✨', active: true },
  { name: 'Office Cleaning', href: '/office-cleaning', icon: '🏢' },
  { name: 'Deep/Heavy-duty Cleaning', href: '/deep-cleaning', icon: '💪' },
  { name: 'Window Cleaning', href: '/window-cleaning', icon: '🪟' },
  { name: 'Stairwell Cleaning', href: '/stairwell-cleaning', icon: '🪜' },
  { name: 'Construction Cleaning', href: '/construction-cleaning', icon: '🔨' },
  { name: 'Gym Cleaning', href: '/gym-cleaning', icon: '💪' }
];

export default function DetailCleaning() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you! We will contact you soon.');
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

      {/* Details Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
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
            <div className="relative">
              <Image
                src="/cleaningTwoo.jpeg"
                alt="Detail Cleaning Service"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-cyan-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Get Your Free Quote
            </h2>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Tell us about your cleaning needs..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Submit Quote Request
              </button>
            </form>
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
            Ready to Experience Detail Cleaning?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact us today for a free quote and experience the Amples difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+46123456789"
              className="bg-white text-cyan-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              📞 Call Us Now
            </a>
            <a
              href="#contact-form"
              className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

