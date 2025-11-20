'use client';

import Link from 'next/link';
import Image from 'next/image';
import QuoteForm from '../../components/QuoteForm';

export default function Checklist() {
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
            <Link href="/move-out-cleaning" className="text-gray-700 hover:text-cyan-500 transition-colors">
              ← Back to Move-out Cleaning
            </Link>
          </div>
        </div>
      </nav>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-12">
            {/* Left side - 70% Content */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Moving House Cleaning Checklist
              </h1>
              <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg text-justify">
                  A comprehensive moving house cleaning checklist is essential to ensure you leave your property in perfect condition. This checklist covers all areas that need attention during a move-out cleaning to help you get your security deposit back and meet landlord requirements.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Kitchen Cleaning Checklist
                </h2>
                <ul className="space-y-2 text-lg">
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean inside and outside of all cabinets and drawers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Deep clean oven and stovetop (remove all grease and food residue)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean refrigerator and freezer (defrost if needed)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean dishwasher inside and out</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean microwave inside and out</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean countertops and backsplash</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean sink and faucet</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Sweep and mop floors</span>
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Bathroom Cleaning Checklist
                </h2>
                <ul className="space-y-2 text-lg">
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean toilet (inside, outside, and behind)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean shower and bathtub (remove soap scum and limescale)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean sink and faucet</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean mirrors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean medicine cabinet and drawers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean tiles and grout</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Sweep and mop floors</span>
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Living Areas & Bedrooms Checklist
                </h2>
                <ul className="space-y-2 text-lg">
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Dust all surfaces (shelves, tables, window sills)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean windows (inside and outside if accessible)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean window frames and tracks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean light fixtures and ceiling fans</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Vacuum carpets and rugs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Sweep and mop hard floors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean baseboards and moldings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean inside all closets and drawers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Wipe down walls and doors (remove marks and fingerprints)</span>
                  </li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Additional Areas Checklist
                </h2>
                <ul className="space-y-2 text-lg">
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean garage (sweep, mop, clean windows)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean balcony or patio (sweep, clean railings)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean entryway and hallways</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean laundry room (if applicable)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Clean ventilation grilles and air vents</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Remove all trash and personal items</span>
                  </li>
                </ul>

                <div className="mt-8 p-6 bg-gradient-to-br from-cyan-50 to-emerald-50 rounded-xl border border-cyan-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    💡 Pro Tips
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Start cleaning from top to bottom to avoid re-cleaning areas</li>
                    <li>• Use appropriate cleaning products for each surface</li>
                    <li>• Allow time for deep cleaning - it takes longer than regular cleaning</li>
                    <li>• Take photos after cleaning for your records</li>
                    <li>• Consider hiring professionals for a thorough job</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right side - 30% Form */}
            <div className="lg:col-span-3">
              <QuoteForm idPrefix="checklist" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

