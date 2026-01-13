'use client';

import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';

export default function LundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Breadcrumb cityName="Lund" />

      {/* Banner Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-600">
          <div className="absolute inset-0 bg-[url('/lund.webp')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <div className="text-sm uppercase tracking-wider text-cyan-200 mb-4">Our Location</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Lund
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-2xl">
              Professional cleaning services in Lund
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Moving cleaning in Lund
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p className="text-justify">
                Are you looking for moving cleaning in Lund at a good price?
                Do you live in or around central Lund, Or do you live a bit outside? No matter where in Lund you live, as a customer of Amples you always pay the same fixed price per square meter for moving cleaning.
              </p>
              <p className="text-justify">
                Our cleaning companies in Lund have good reviews from our customers and all our collaborations are continuously evaluated by us based on high-level goals for quality and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How does it work Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            How does it work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Column 1 - Pen Icon */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-cyan-100 rounded-full p-6 w-24 h-24 flex items-center justify-center">
                  <svg className="w-12 h-12 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
              </div>
              <p className="text-lg text-gray-700 font-medium">
                Fill in your details in our form
              </p>
            </div>

            {/* Column 2 - Inbox Icon */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-emerald-100 rounded-full p-6 w-24 h-24 flex items-center justify-center">
                  <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-lg text-gray-700 font-medium">
                Get your price via text message & email within 1 minute
              </p>
            </div>

            {/* Column 3 - Coffee Cup Icon */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-amber-100 rounded-full p-6 w-24 h-24 flex items-center justify-center">
                  <svg className="w-12 h-12 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 3h14a2 2 0 012 2v12a2 2 0 01-2 2h-3v2a1 1 0 01-1 1H9a1 1 0 01-1-1v-2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 2v12h14V5H5zm2 2h10v8H7V7z" />
                  </svg>
                </div>
              </div>
              <p className="text-lg text-gray-700 font-medium">
                Book your cleaning and sit back!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is included Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              What is included in a moving cleaning in Lund?
            </h2>

            {/* Included and Not Included Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Included Card */}
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Included:
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2 font-bold">–</span>
                    <span>Moving out cleaning of garage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2 font-bold">–</span>
                    <span>Moving-in cleaning of oven</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2 font-bold">–</span>
                    <span>Moving window cleaning</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2 font-bold">–</span>
                    <span>Moving-out cleaning of balcony (Glassed balcony is an option)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-600 mr-2 font-bold">–</span>
                    <span>Bathroom move-out cleaning</span>
                  </li>
                </ul>
              </div>

              {/* Not Included Card */}
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Not included:
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 font-bold">–</span>
                    <span>Wet drying of walls and ceilings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 font-bold">–</span>
                    <span>Cleaning the wood-burning stove</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 font-bold">–</span>
                    <span>Cleaning of water traps</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 font-bold">–</span>
                    <span>The surface layer of the facade</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
              <p className="text-lg text-gray-700 leading-relaxed text-justify">
                Any additional spaces and options, as well as whether or not they will affect your final price, you will see in the booking form safely and securely before you book your moving cleaning in Lund.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed text-justify mt-4">
                If you want to know more, we recommend that you read about the <strong>requirements for moving house cleaning</strong>. You can also read our <strong>complete moving house cleaning checklist</strong> and what is included in a moving house cleaning in Lund.
              </p>
            </div>

            {/* Tips and Preparations */}
            <div className="bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-xl p-8 border-2 border-cyan-200">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-8 h-8 mr-3 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Tips and preparations for your moving cleaning in Lund:
              </h3>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 font-bold mt-1">–</span>
                  <span>Empty the home of objects and furniture</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 font-bold mt-1">–</span>
                  <span>Defrost the fridge and freezer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 font-bold mt-1">–</span>
                  <span>Pull out appliances such as the oven and washing machine so that the cleaning staff can clean behind them</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 font-bold mt-1">–</span>
                  <span>Book the move-out cleaning 2-5 days before the keys are handed over to the new owners so that you have time to use your 14-day guarantee if the new owners are not satisfied with the move-out cleaning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty, Cancellation, Safety Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Column 1 - Warranty */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 rounded-full p-6 w-24 h-24 flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                14 day warranty
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We always aim for 100% satisfied customers. That&apos;s why as a customer in Lund you have a quality guarantee with us for 14 days.
              </p>
            </div>

            {/* Column 2 - Cancellation */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-purple-100 rounded-full p-6 w-24 h-24 flex items-center justify-center">
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Free cancellation
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Life happens! No worries, with us you can cancel without charge up to 10 days in advance.
              </p>
            </div>

            {/* Column 3 - Safety */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 rounded-full p-6 w-24 h-24 flex items-center justify-center">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Safe cleaning company
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We evaluate our collaborations with local cleaning companies in Lund on an ongoing basis with a focus on quality and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

