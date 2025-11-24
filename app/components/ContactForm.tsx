'use client';

import { useState } from 'react';

type ServiceType = 'Move-out Cleaning' | 'Home Cleaning' | 'Detail Cleaning' | 'Office Cleaning' | 'Deep/Heavy-duty Cleaning' | 'Window Cleaning' | 'Stairwell Cleaning' | 'Construction Cleaning' | 'Gym Cleaning';

export default function ContactForm() {
  const [formType, setFormType] = useState<'private' | 'company'>('private');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    vatNumber: '',
    homeType: '',
    cleanAll: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          formType,
          selectedService
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '', phone: '', email: '', company: '', vatNumber: '',
          homeType: '', cleanAll: '', message: ''
        });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 animate-slide-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get Your Free Quote</h2>

      {/* Service Selection - Vertical List */}
      {!selectedService ? (
        <div className="space-y-3 mb-8">
          {(['Move-out Cleaning', 'Home Cleaning', 'Detail Cleaning', 'Office Cleaning', 'Deep/Heavy-duty Cleaning', 'Window Cleaning', 'Stairwell Cleaning', 'Construction Cleaning', 'Gym Cleaning'] as ServiceType[]).map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => setSelectedService(service)}
              className="w-full text-left py-4 px-6 rounded-xl transition-all duration-200 border-2 flex items-center justify-between group border-gray-100 bg-white text-gray-600 hover:border-cyan-200 hover:bg-gray-50 hover:shadow-md"
            >
              <span className="font-semibold text-lg group-hover:text-cyan-700 transition-colors">{service}</span>
              <div className="h-8 w-8 rounded-full bg-gray-50 group-hover:bg-cyan-100 flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between bg-cyan-50 p-4 rounded-xl border border-cyan-100 mb-6">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-cyan-500 rounded-full flex items-center justify-center mr-4 shadow-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-cyan-600 font-medium">Selected Service</p>
                <h3 className="text-xl font-bold text-gray-900">{selectedService}</h3>
              </div>
            </div>
            <button
              onClick={() => setSelectedService(null)}
              className="text-sm text-gray-500 hover:text-cyan-600 font-medium underline decoration-2 decoration-transparent hover:decoration-cyan-600 transition-all"
            >
              Change Service
            </button>
          </div>
        </div>
      )}

      {/* Form - Only shows when a service is selected */}
      {selectedService && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">

          {/* Dynamic Fields based on Service */}
          {selectedService === 'Home Cleaning' && (
            <div className="space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-100 animate-fade-in">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home Cleaning Details
              </h3>

              {/* Home Type Dropdown */}
              <div className="form-group">
                <label htmlFor="homeType" className="block text-sm font-medium text-gray-700 mb-2">
                  What type of home should be cleaned?
                </label>
                <select
                  id="homeType"
                  name="homeType"
                  value={formData.homeType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="">Select home type</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Holiday Home">Holiday Home</option>
                  <option value="Terraced House">Terraced House</option>
                </select>
              </div>

              {/* Clean All Radio */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Should the entire home be cleaned?
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        name="cleanAll"
                        value="Yes"
                        checked={formData.cleanAll === 'Yes'}
                        onChange={handleChange}
                        className="peer h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300"
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        name="cleanAll"
                        value="No"
                        checked={formData.cleanAll === 'No'}
                        onChange={handleChange}
                        className="peer h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300"
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">No</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Private/Company Toggle */}
          <div className="flex gap-6 pt-4 border-t border-gray-100">
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="formType"
                value="private"
                checked={formType === 'private'}
                onChange={(e) => setFormType(e.target.value as 'private' | 'company')}
                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-cyan-600 transition-colors">Private</span>
            </label>
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="formType"
                value="company"
                checked={formType === 'company'}
                onChange={(e) => setFormType(e.target.value as 'private' | 'company')}
                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-cyan-600 transition-colors">Company</span>
            </label>
          </div>

          {/* Common Contact Fields */}
          <div className="space-y-4">
            <div className="form-group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="Your name"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Phone number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Email address"
                />
              </div>
            </div>

            {formType === 'company' && (
              <div className="grid md:grid-cols-2 gap-4 animate-fade-in">
                <div className="form-group">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="Company name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="vatNumber" className="block text-sm font-medium text-gray-700 mb-1">VAT Number *</label>
                  <input
                    type="text"
                    id="vatNumber"
                    name="vatNumber"
                    required
                    value={formData.vatNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="VAT Number"
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                placeholder="Any specific details..."
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-cyan-600 hover:to-emerald-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {status === 'loading' ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : status === 'success' ? (
              'Request Sent Successfully! ✓'
            ) : status === 'error' ? (
              'Failed to Send. Try Again ✕'
            ) : (
              'Get Free Quote'
            )}
          </button>
        </form>
      )}
    </div>
  );
}
