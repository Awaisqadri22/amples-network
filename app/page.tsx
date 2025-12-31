'use client';

import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import HeroCarousel from './components/HeroCarousel';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

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

