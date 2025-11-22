'use client';

import Image from 'next/image';
import Link from 'next/link';
import QuoteForm from './QuoteForm';
import Footer from './Footer';

const services = [
  { name: 'Move-out Cleaning', href: '/move-out-cleaning', icon: '🚚', active: true },
  { name: 'Home Cleaning', href: '/home-cleaning', icon: '🏠' },
  { name: 'Detail Cleaning', href: '/detail-cleaning', icon: '✨' },
  { name: 'Office Cleaning', href: '/office-cleaning', icon: '🏢' },
  { name: 'Deep/Heavy-duty Cleaning', href: '/deep-cleaning', icon: '💪' },
  { name: 'Window Cleaning', href: '/window-cleaning', icon: '🪟' },
  { name: 'Stairwell Cleaning', href: '/stairwell-cleaning', icon: '🪜' },
  { name: 'Construction Cleaning', href: '/construction-cleaning', icon: '🔨' },
  { name: 'Gym Cleaning', href: '/gym-cleaning', icon: '💪' }
];

export default function MoveOutCleaning() {
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

      {/* Form Section - 70/30 Split */}
      <section id="contact-form" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
            {/* Left side - 70% Text Content */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Complete Move-out Cleaning Service
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-justify">
                  Moving is a big and often stressful process, and one of the most time-consuming tasks is the move-out cleaning. Amples Städfirma offers professional move-out cleaning services in several cities to make your move smoother and worry-free. We ensure that your home is sparkling clean and meets all requirements for an approved inspection.
                </p>

                <p className="text-justify">
                  <a
                    href="/move-out-cleaning/details"
                    className="text-cyan-600 hover:text-cyan-700 underline font-semibold transition-colors"
                  >
                    We have collected everything you need to know about what is included in a moving out cleaning here.
                  </a>
                  {' '}We are a serious cleaning company that works with moving house cleaning on a daily basis. Something that we prioritize highly is that the customer can trust us. Unfortunately, it happens that cleaning companies give the customer a cheap price but with hidden fees that are added. With us, you will immediately know the total cost and will not have to worry about a lot of extra costs that you did not expect at the end.
                </p>

                <p className="text-justify">
                  If you want to know more about what is included in a moving house cleaning and perhaps want to clean it yourself,
                  we at Qleano have developed a{' '}
                  <a
                    href="/move-out-cleaning/checklist"
                    className="text-cyan-600 hover:text-cyan-700 underline font-semibold transition-colors"
                  >
                    comprehensive moving house cleaning checklist
                  </a>
                  . We provide the safest type of cleaning guarantee that can be given, you go through the cleaning together with the cleaning manager on the same day the cleaning is carried out. This way you get the cleaning done the way you want.
                </p>

                <p className="text-justify">
                  We of course also carry out cleaning on weekends and public holidays. If you want to know more about the{' '}
                  <a
                    href="/move-out-cleaning/price"
                    className="text-cyan-600 hover:text-cyan-700 underline font-semibold transition-colors"
                  >
                    price of moving house cleaning
                  </a>
                  , you can read more about what moving house cleaning usually costs here!
                </p>

                <p className="text-justify">
                  Fill out the form on the page and you will shortly receive an email with detailed information about how a moving house cleaning is done and what is done. If you have any questions, just reply to the email. If you wish to book, you can also do this by replying to the email with the information needed to make a booking. Then we will come to you at the desired time and clean!
                </p>
              </div>
            </div>

            {/* Right side - 30% Form */}
            <div className="lg:col-span-3">
              <QuoteForm idPrefix="move-out" />
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
                className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${service.active ? 'ring-2 ring-cyan-500' : ''
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
            Ready to Get Started?
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

      {/* Footer */}
      <Footer />
    </div >
  );
}

