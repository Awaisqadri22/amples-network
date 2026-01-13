import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function Checklist() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="w-full py-16">
        {/* Top Section with Animation */}
        <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 mb-16">
          <div className="relative bg-gradient-to-br from-white via-cyan-50/30 to-emerald-50/30 rounded-2xl border-2 border-cyan-300/50 shadow-2xl p-8 md:p-12 animate-fade-in-up animate-border-glow overflow-hidden">
            {/* Animated border gradient overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-50"></div>
            
            {/* Content */}
            <div className="relative z-10 space-y-6">
              {/* Main Heading */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight text-center">
                Find out what&apos;s included in our cleaning checklist
              </h1>
              
              {/* Subheading */}
              <h2 className="text-xl md:text-2xl font-semibold text-cyan-600 mt-8 mb-6 text-center">
                Flyttstäd Checklista
              </h2>
              
              {/* Description Paragraph */}
              <div className="w-full">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
                  Make sure your move-out cleaning lives up to the highest standards. We&apos;ve created a detailed move-out cleaning checklist, based on the guidelines from the Swedish Real Estate Association. It&apos;s easy to print and bring along when inspecting the cleaning of an apartment (rental or condominium) or a villa, or when comparing cleaning companies. Feel confident knowing that every requirement is covered — plus, enjoy the added peace of mind with our 7-day cleaning guarantee.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">

          {/* Two Equal Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 px-4 sm:px-8 lg:px-16 xl:px-24">
            {/* Left Column - Kitchen */}
            <div className="w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Kitchen
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Wet wipe and dry lighting fixtures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean stove (inside, outside, and behind), including oven trays and grates</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean microwave oven</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean refrigerator and freezer (must be defrosted, turned off, and pulled out beforehand)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean cabinets, drawers, doors, and workbenches</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean kitchen hood/stove hood</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean dishwasher (inside and outside, but not behind)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean tiles and floors</span>
                </li>
              </ul>
            </div>

            {/* Right Column - Bathroom and Toilet */}
            <div className="w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Bathroom and Toilet
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean bathroom cabinets and mirrors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean bathtub</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean shower wall/glass door</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean toilet</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean washbasin and exposed pipes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean floor drains (including internal parts)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Descale and clean tiles and clinker</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean valve (outside and inside where accessible)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean washing machine, dryer, and drying cabinet (inside and outside)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean heating elements (radiators)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Second Two Equal Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 px-4 sm:px-8 lg:px-16 xl:px-24">
            {/* Left Column - All Rooms */}
            <div className="w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                All Rooms
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean cabinets, wardrobes, and skirting boards</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean electrical sockets, switches, and electrical cabinets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean doors, door frames, and thresholds</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean heating elements (including behind) and valves</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Vacuum and wet mop all floors</span>
                </li>
              </ul>
            </div>

            {/* Right Column - Windows */}
            <div className="w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Windows
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div className="flex-1">
                    <span className="text-gray-700 text-base leading-relaxed">Clean windows (inside, outside, and between panes)</span>
                    <p className="text-sm text-gray-500 italic mt-1 ml-0">(Note: Cracked or very difficult-to-open windows will not be repaired)</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean window benches</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-base leading-relaxed">Clean window frames</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Full Width Section with Animation */}
          <div className="w-full mt-16 px-4 sm:px-8 lg:px-16 xl:px-24">
            <div className="relative bg-gradient-to-br from-white via-cyan-50/30 to-emerald-50/30 rounded-2xl border-2 border-cyan-300/50 shadow-2xl p-8 md:p-12 animate-fade-in-up animate-border-glow overflow-hidden">
              {/* Animated border gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-50"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                  Extra Services You Can Add to Your Move-Out Cleaning with Amples
                </h3>
                
                <div className="space-y-6 max-w-3xl mx-auto">
                  {/* Cleaning of Basement / Storage Room / Garage / Balcony */}
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Cleaning of Basement / Storage Room / Garage / Balcony
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-center">
                        <span className="text-cyan-600 mr-3 flex-shrink-0">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700 text-base leading-relaxed">Rough sweeping of floors, shelves, cobwebs, and windows</span>
                      </li>
                    </ul>
                  </div>

                  {/* Cleaning of Glazed Balcony / Patio */}
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Cleaning of Glazed Balcony / Patio
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-center">
                        <span className="text-cyan-600 mr-3 flex-shrink-0">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700 text-base leading-relaxed">Cleaning of windows and frames</span>
                      </li>
                      <li className="flex items-center justify-center">
                        <span className="text-cyan-600 mr-3 flex-shrink-0">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700 text-base leading-relaxed">Cleaning of doors and moldings</span>
                      </li>
                      <li className="flex items-center justify-center">
                        <span className="text-cyan-600 mr-3 flex-shrink-0">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700 text-base leading-relaxed">Rough sweeping of floors</span>
                      </li>
                    </ul>
                  </div>

                  {/* Cleaning the Water Trap */}
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Cleaning the Water Trap
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-center">
                        <span className="text-cyan-600 mr-3 flex-shrink-0">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700 text-base leading-relaxed">Includes disassembly and reassembly</span>
                      </li>
                    </ul>
                  </div>

                  {/* Dusting and Cleaning of Blinds */}
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Dusting and Cleaning of Blinds
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-center justify-center">
                        <span className="text-cyan-600 mr-3 flex-shrink-0">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <div className="flex flex-col items-center">
                          <span className="text-gray-700 text-base leading-relaxed">Cleaning of blinds</span>
                          <p className="text-sm text-gray-500 italic mt-2">(Note: For older blinds, the customer is responsible for any damage that may occur during cleaning.)</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Full Width Section - Important Information */}
          <div className="w-full mt-16 px-4 sm:px-8 lg:px-16 xl:px-24">
            <div className="relative bg-gradient-to-br from-white via-cyan-50/30 to-emerald-50/30 rounded-2xl border-2 border-cyan-300/50 shadow-2xl p-8 md:p-12 animate-fade-in-up animate-border-glow overflow-hidden">
              {/* Animated border gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-50"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                  Amples Move-Out Cleaning Checklist – Important Information
                </h3>
                
                <div className="space-y-6 max-w-3xl mx-auto text-center">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    This checklist also serves as a guide for move-in cleaning for both apartments (rental and condominium) and villas.
                  </p>

                  <div className="mt-8">
                    <h4 className="text-xl font-semibold text-gray-800 mb-6">
                      Things to Keep in Mind:
                    </h4>
                    <ul className="space-y-4 text-left">
                      <li className="flex items-start">
                        <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700 text-base leading-relaxed">
                          There are no standardized rules for how a move-out cleaning must be carried out. That&apos;s why it&apos;s smart to review different cleaning companies&apos; checklists — they can vary. Always ensure the cleaning company follows the Swedish Real Estate Association&apos;s guidelines for move-out cleaning to guarantee a thorough job.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700 text-base leading-relaxed">
                          When comparing quotes from cleaning companies, don&apos;t just look at the price. Check carefully what is included.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700 text-base leading-relaxed">
                          At Amples, window cleaning and final delivery are included in the service. Cleaning materials are also provided by us — we use trained staff and maintain strict standards for cleaning products.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700 text-base leading-relaxed">
                          In cases where extra-heavy cleaning is required beyond the ordinary, additional fees may apply — but we will always contact you first.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Third Full Width Section - What's Not Included */}
          <div className="w-full mt-16 px-4 sm:px-8 lg:px-16 xl:px-24">
            <div className="relative bg-gradient-to-br from-white via-cyan-50/30 to-emerald-50/30 rounded-2xl border-2 border-cyan-300/50 shadow-2xl p-8 md:p-12 animate-fade-in-up animate-border-glow overflow-hidden">
              {/* Animated border gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-50"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                  What&apos;s Not Included in Amples&apos; Move-Out Cleaning
                </h3>
                
                <div className="space-y-4 max-w-3xl mx-auto">
                  <ul className="space-y-4 text-left">
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Wet wiping of walls and ceilings (unless covered with wet room wallpaper or tiles — dust wiping is included).
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Window cleaning if windows are damaged, fixed, or cannot be opened. In winter months, window cleaning is limited due to weather, but we always do our best.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Cleaning of windows and balconies that are fixed and require special safety measures (e.g., if over 2 meters in height).
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Removal of stains such as stickers, tape residue, or paint splatters — customers must handle these before cleaning.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Cleaning between older blinds (over 5 years old) is done carefully, but Amples is not responsible for any damage due to the fragility of aged blinds.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Specific joint scrubbing between tiles is not included. We perform a light cleaning with a sponge to remove soap residue, but deeper discoloration of grout is not addressed.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        If a property is deemed to be exceptionally dirty, Amples reserves the right to adjust the final price after consultation with the customer.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Fourth Full Width Section - Pre-Move Cleaning Checklist */}
          <div className="w-full mt-16 px-4 sm:px-8 lg:px-16 xl:px-24">
            <div className="relative bg-gradient-to-br from-white via-cyan-50/30 to-emerald-50/30 rounded-2xl border-2 border-cyan-300/50 shadow-2xl p-8 md:p-12 animate-fade-in-up animate-border-glow overflow-hidden">
              {/* Animated border gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-50"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
                  Pre-Move Cleaning Checklist
                </h3>
                <p className="text-lg font-semibold text-gray-700 mb-8 text-center">
                  Important steps to complete before your move-out cleaning with Amples
                </p>
                
                <div className="space-y-6 max-w-3xl mx-auto">
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed text-center">
                    When you&apos;re preparing to move, there&apos;s a lot to organize — packing, storage clearing, and more. Whether you&apos;re moving yourself or hiring a cleaning company, it&apos;s crucial to be ready before cleaning day. Follow this checklist to ensure a smooth process:
                  </p>

                  <ul className="space-y-4 text-left mt-8">
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Clear out all furniture unless otherwise agreed beforehand. The home must be empty to allow thorough cleaning.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Move large bathtubs or remove bathtub fronts if cleaning behind is required. Also, pull out appliances such as ovens, refrigerators, freezers, dishwashers, and washing machines to prevent floor damage during cleaning.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Turn off and defrost refrigerators and freezers before cleaning day.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Empty the water trap — cleaning of drains is included in the service, but water trap cleaning must be ordered separately if needed.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Remove all decals, stickers, and adhesives from walls, doors, or surfaces.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Remove all nails and hooks from walls and fill any holes.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Clean stains from wallpaper or similar surfaces yourself to prevent damage during cleaning.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <div className="flex-1">
                        <span className="text-gray-700 text-base leading-relaxed font-semibold">Inform us about window conditions:</span>
                        <ul className="mt-2 ml-4 space-y-2">
                          <li className="text-gray-700 text-base leading-relaxed">
                            • If windows have bars, an extra charge applies — contact us for a quote.
                          </li>
                          <li className="text-gray-700 text-base leading-relaxed">
                            • Windows that are difficult to open must be opened beforehand, as we will not force them open.
                          </li>
                          <li className="text-gray-700 text-base leading-relaxed">
                            • If special tools are needed to open between window panes, ensure this is done before our arrival.
                          </li>
                          <li className="text-gray-700 text-base leading-relaxed">
                            • Notify us in advance if a long ladder is required for high windows.
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Auxiliary areas like balconies, garages, or storage rooms must be ordered in advance for cleaning. <span className="italic">(Note: We perform basic sweeping/cleaning only, not algae removal or high-pressure washing.)</span>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Notify us about any heavily soiled areas in advance. Standard move-out cleaning assumes the property is in normally maintained condition. Additional cleaning hours may be needed for heavily soiled surfaces.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Dusting of walls and ceilings is included. Wet wiping is only done on tiled or wet-room wallpapered surfaces unless otherwise ordered. <span className="italic">(Please note: the customer assumes responsibility for any damage when wet-wiping non-tiled walls or ceilings.)</span>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Ensure electricity and hot water are available during the cleaning.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Inform us about any items that should not be discarded before cleaning begins.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-600 mr-3 mt-1 flex-shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 text-base leading-relaxed">
                        Book your cleaning inspection well in advance of your move-out or lease expiration date.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
