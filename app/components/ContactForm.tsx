'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formType, setFormType] = useState<'private' | 'company'>('private');

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 animate-slide-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get Your Free Quote</h2>
      
      {/* Private/Company Radio Buttons */}
      <div className="mb-6">
        <div className="flex gap-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="formType"
              value="private"
              checked={formType === 'private'}
              onChange={(e) => setFormType(e.target.value as 'private' | 'company')}
              className="h-5 w-5 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 cursor-pointer"
            />
            <span className="ml-3 text-sm font-medium text-gray-700">
              Private
            </span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="formType"
              value="company"
              checked={formType === 'company'}
              onChange={(e) => setFormType(e.target.value as 'private' | 'company')}
              className="h-5 w-5 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 cursor-pointer"
            />
            <span className="ml-3 text-sm font-medium text-gray-700">
              Company
            </span>
          </label>
        </div>
      </div>

      <form className="space-y-6">
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
            placeholder="Your full name"
          />
        </div>

        {/* Company Name & VAT Number (shown only when company is selected) */}
        {formType === 'company' && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
                placeholder="Company name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="vatNumber" className="block text-sm font-medium text-gray-700 mb-2">
                VAT Number *
              </label>
              <input
                type="text"
                id="vatNumber"
                name="vatNumber"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
                placeholder="e.g., SE123456789001"
              />
            </div>
          </div>
        )}

        {/* Service Type */}
        <div className="form-group">
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-2">
            Type of Service *
          </label>
          <select
            id="serviceType"
            name="serviceType"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
          >
            <option value="">Select a service</option>
            <option value="residential">Residential Cleaning</option>
            <option value="commercial">Commercial Cleaning</option>
            <option value="deep">Deep Cleaning</option>
            <option value="move">Move-in/Move-out</option>
            <option value="post-construction">Post-Construction</option>
            <option value="carpet">Carpet Cleaning</option>
            <option value="window">Window Cleaning</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Housing Type */}
        <div className="form-group">
          <label htmlFor="housingType" className="block text-sm font-medium text-gray-700 mb-2">
            Type of Property *
          </label>
          <select
            id="housingType"
            name="housingType"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
          >
            <option value="">Select property type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condominium</option>
            <option value="office">Office</option>
            <option value="retail">Retail Space</option>
            <option value="warehouse">Warehouse</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Phone and Email */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
              placeholder="(555) 123-4567"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Square Meter Area */}
        <div className="form-group">
          <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
            Property Area (Square Meters) *
          </label>
          <input
            type="number"
            id="area"
            name="area"
            required
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
            placeholder="e.g., 150"
          />
        </div>

        {/* City/Address */}
        <div className="form-group">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            City/Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
            placeholder="City, State, ZIP Code"
          />
        </div>

        {/* Date Picker */}
        <div className="form-group">
          <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Service Date
          </label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 hover:border-cyan-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-cyan-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
        >
          <span className="flex items-center justify-center">
            Get Free Quote
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </form>
    </div>
  );
}

