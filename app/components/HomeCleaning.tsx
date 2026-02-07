'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from './ContactForm';
import Footer from './Footer';

const services = [
  { name: 'Move-out Cleaning', href: '/move-out-cleaning', icon: '🚚' },
  { name: 'Home Cleaning', href: '/home-cleaning', icon: '🏠', active: true },
  { name: 'Detail Cleaning', href: '/detail-cleaning', icon: '✨' },
  { name: 'Office Cleaning', href: '/office-cleaning', icon: '🏢' },
  { name: 'Deep/Heavy-duty Cleaning', href: '/deep-cleaning', icon: '💪' },
  { name: 'Window Cleaning', href: '/window-cleaning', icon: '🪟' },
  { name: 'Staircase Cleaning', href: '/stairwell-cleaning', icon: '🪜' },
  { name: 'Construction Cleaning', href: '/construction-cleaning', icon: '🔨' },
  { name: 'Gym Cleaning', href: '/gym-cleaning', icon: '💪' }
];

export default function HomeCleaning() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [isSubAccordionOpen, setIsSubAccordionOpen] = useState(false);
  const [isKeyManagementOpen, setIsKeyManagementOpen] = useState(false);
  const [isSurfaceOpen, setIsSurfaceOpen] = useState(false);
  const [isCancellationOpen, setIsCancellationOpen] = useState(false);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
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
              Home Cleaning
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-2xl">
              Professional, reliable home cleaning services to keep your space spotless and comfortable
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section - 70/30 Split */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
            {/* Left side - 60% Text Content */}
            <div className="lg:col-span-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Home cleaning – a simpler everyday life
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="text-justify">
                  There are those who enjoy cleaning while others prefer to spend their time on other things when they have some spare time. Cleaning can be difficult to get started on, tiring and, above all, it takes a lot of time. However, most of us like to come home to a clean and fresh home. It can feel problematic for many to manage to keep their home clean and tidy at the same time as taking care of their job, taking care of their family, hopefully keeping up with their exercise and possibly also a hobby. Many of us would probably rather spend our time on other things, which are probably both more fun and more rewarding than cleaning.
                </p>

                <p className="text-justify">
                  By hiring a cleaning company via Amples to clean your home, you can save yourself a lot of time and trouble. This time and energy can instead be spent on things you enjoy. In addition, you avoid the bad conscience that often arises when you don&apos;t have the energy or time to keep your own home clean and tidy. At A, we have cleaning partners throughout Sweden. Our experienced and professional employees are always ready to step in and help with your home cleaning.
                </p>

                <p className="text-justify">
                  Currently, it is also economically advantageous for private individuals to purchase help with home cleaning. This type of household-related services is deductible in accordance with the RUT deduction. This deduction means a tax reduction of as much as 50%. In practice, this means that a person can hire help with home cleaning for a sum of SEK 50,000 a year, but in reality they only pay half of this amount.
                </p>

                <p className="text-justify">
                  If you are looking for help with home cleaning, we at Amples can help you. Amples undertakes all types of cleaning assignments in the home, regardless of whether it is a one-off cleaning or recurring weekly cleaning. Contact us and we will get back to you with a price proposal that is relevant for the cleaning of your home.
                </p>
              </div>

              {/* Accordion Section */}
              <div className="mt-8 space-y-4">
                {/* Accordion 1: Included */}
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleAccordion('included')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900">what is included in the home cleaning?</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openAccordion === 'included' ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === 'included' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-6 bg-white border-t border-gray-100">
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">✓</span>
                          Dusting of all accessible surfaces
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">✓</span>
                          Vacuuming and mopping of all floors
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">✓</span>
                          Cleaning of mirrors and glass surfaces
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">✓</span>
                          Kitchen cleaning including exterior of appliances
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">✓</span>
                          Bathroom sanitization and tile scrubbing
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">✓</span>
                          Emptying of trash bins
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Accordion 2: Not Included */}
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleAccordion('not-included')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900">What is not included in home cleaning?</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openAccordion === 'not-included' ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === 'not-included' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-6 bg-white border-t border-gray-100">
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                          <span className="mr-2 text-red-500">✕</span>
                          Wet drying of walls and ceilings.
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-red-500">✕</span>
                          Wood-burning stove.
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-red-500">✕</span>
                          Water trap.
                        </li>

                      </ul>
                    </div>
                  </div>
                </div>

                {/* Accordion 3: Invoice Information */}
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleAccordion('invoice-info')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900">Invoice information</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openAccordion === 'invoice-info' ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === 'invoice-info' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-6 bg-white border-t border-gray-100">
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">•</span>
                          Payment period is 10 days.
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">•</span>
                          The invoice is usually sent via email. If the invoice is to be sent via regular mail, an invoice fee of 25 SEK will be added.
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">•</span>
                          Material costs, travel costs and any deductions are always included in the price and are specified on the invoice.
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">•</span>
                          For private individuals who hire us, payment of the invoice is made to Serafim Finans AB (serafimfinans.se).
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">•</span>
                          <span>
                            Any objections to the invoice must be made no later than the same day as the due date on the invoice in order for them to be taken into account. If payment is made after the due date, late payment interest of 24% per year will be charged. If payment is not made, a reminder fee of SEK 60 will be added. If payment continues to be made, the matter will be transferred to debt collection.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">•</span>
                          When paying the invoice, the sender must be the person to whom the RUT deduction should be made.
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">•</span>
                          A standard credit check is carried out at the time of booking which may result in a requested copy being sent to you.
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">•</span>
                          Personal data is handled in accordance with the General Data Protection Regulation (GDPR) which came into effect on May 25, 2018.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Accordion 4: Things to consider */}
                <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleAccordion('things-to-consider')}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold text-gray-900">Things to consider before doing home cleaning</span>
                      <span className="bg-cyan-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">4</span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${openAccordion === 'things-to-consider' ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openAccordion === 'things-to-consider' ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-6 bg-white border-t border-gray-100">
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">•</span>
                          Please declutter surfaces to allow for thorough cleaning.
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">•</span>
                          Secure any pets that might be anxious around strangers or cleaning equipment.
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">•</span>
                          Inform us of any delicate items or areas that require special attention.
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-cyan-500">•</span>
                          Ensure access to the property at the scheduled time.
                        </li>
                      </ul>

                      {/* Sub-Accordion: Remember this */}
                      <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsSubAccordionOpen(!isSubAccordionOpen);
                          }}
                          className="w-full flex items-center justify-between p-3 hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-md font-semibold text-gray-800">Remember this before your home cleaning</span>
                          <svg
                            className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${isSubAccordionOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${isSubAccordionOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <div className="p-4 bg-white border-t border-gray-200">
                            <ul className="space-y-3 text-gray-600 text-sm">
                              <li className="flex items-start">
                                <span className="mr-2 text-cyan-500">•</span>
                                Due to the risk of damage to the surface layer, we cannot wet wipe walls and ceilings. Here we only vacuum.
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2 text-cyan-500">•</span>
                                It&apos;s always easier to clean when you can see. That&apos;s why there needs to be electricity and lighting in the home.
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2 text-cyan-500">•</span>
                                Before we arrive, it would be good if you could clear away as much as possible and free up open spaces. This makes our work easier and more efficient and we have time to do more things when we are on site.
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2 text-cyan-500">•</span>
                                No matter how strong we are, we don&apos;t move furniture because of the risk of damage to the floor&apos;s surface.
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2 text-cyan-500">•</span>
                                If there is damage/wear and tear in the home that we should be aware of, please contact our customer support.
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2 text-cyan-500">•</span>
                                If you have a dog, cat or other pet at home, it&apos;s great if you let us know in advance. Our cleaning teams, like everyone else, may be allergic to furry animals or have phobias towards big scary spiders.
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2 text-cyan-500">•</span>
                                When we say hourly billing, this refers to the number of hours per person. If two people are on site for two hours, this will be four hours of work.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Sub-Accordion: Key management */}
                      <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsKeyManagementOpen(!isKeyManagementOpen);
                          }}
                          className="w-full flex items-center justify-between p-3 hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-md font-semibold text-gray-800">Key management</span>
                          <svg
                            className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${isKeyManagementOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${isKeyManagementOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <div className="p-4 bg-white border-t border-gray-200">
                            <ul className="space-y-3 text-gray-600 text-sm">
                              <li className="flex items-start">
                                <span className="mr-2 text-cyan-500">•</span>
                                If you as a customer want us to leave the key to your home in a mailbox, letterbox or letterbox, we are not responsible for the key from the time we have placed it in the designated place.
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2 text-cyan-500">•</span>
                                If the key must be picked up at a location other than the execution address, an additional charge will apply. Contact our customer support.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Sub-Accordion: Surface of the home */}
                      <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsSurfaceOpen(!isSurfaceOpen);
                          }}
                          className="w-full flex items-center justify-between p-3 hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-md font-semibold text-gray-800">The surface of the home</span>
                          <svg
                            className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${isSurfaceOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${isSurfaceOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <div className="p-4 bg-white border-t border-gray-200">
                            <ul className="space-y-3 text-gray-600 text-sm">
                              <li className="flex items-start">
                                <span className="mr-2 text-cyan-500">•</span>
                                In the event that the surface layer in your home is not deemed to be of a normal grade, our employees will contact you to discuss a possible additional charge. If we cannot reach you, the service may be interrupted.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Sub-Accordion: Cancellation and error reporting */}
                      <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsCancellationOpen(!isCancellationOpen);
                          }}
                          className="w-full flex items-center justify-between p-3 hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-md font-semibold text-gray-800">Cancellation and error reporting</span>
                          <svg
                            className={`w-4 h-4 text-gray-500 transform transition-transform duration-200 ${isCancellationOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${isCancellationOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <div className="p-4 bg-white border-t border-gray-200">
                            <ul className="space-y-3 text-gray-600 text-sm">
                              <li className="flex items-start">
                                <span className="mr-2 text-cyan-500">•</span>
                                Cancellation of the service must be made at least 48 hours before cleaning is carried out, otherwise a cancellation fee of SEK 250 incl. VAT will be charged. (This fee includes costs for booked personnel).
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2 text-cyan-500">•</span>
                                Comments on the cleaning must be reported no later than 48 hours after the date of completion.
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2 text-cyan-500">•</span>
                                If you wish to make a rebooking or have comments about the performance of the service, please contact your cleaning provider. Contact details can be found in your booking confirmation.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - 30% Form */}
            <div className="lg:col-span-4">
              <ContactForm defaultService="Home Cleaning" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 bg-gray-50">
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
    </div >
  );
}

