'use client';

import { useState } from 'react';

type ServiceType = 'Move-out Cleaning' | 'Home Cleaning' | 'Detail Cleaning' | 'Office Cleaning' | 'Deep/Heavy-duty Cleaning' | 'Window Cleaning' | 'Stairwell Cleaning' | 'Construction Cleaning' | 'Gym Cleaning';

export default function ContactForm() {
  const [formType, setFormType] = useState<'private' | 'company'>('private');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    company: '',
    vatNumber: '',
    homeType: '',
    cleanAll: '',
    areaSize: '',
    frequency: '',
    preferredDateTime: '',
    numberOfRooms: '0',
    bedroom: '0',
    kitchen: '0',
    livingRoom: '0',
    floors: '',
    hasPets: '',
    comments: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNumberChange = (name: string, value: string) => {
    // Only allow positive numbers
    const numValue = parseInt(value) || 0;
    if (numValue >= 0) {
      setFormData({
        ...formData,
        [name]: numValue.toString()
      });
    }
  };

  const handleIncrement = (name: string) => {
    const currentValue = parseInt(formData[name as keyof typeof formData] as string) || 0;
    setFormData({
      ...formData,
      [name]: (currentValue + 1).toString()
    });
  };

  const handleDecrement = (name: string) => {
    const currentValue = parseInt(formData[name as keyof typeof formData] as string) || 0;
    if (currentValue > 0) {
      setFormData({
        ...formData,
        [name]: (currentValue - 1).toString()
      });
    }
  };

  // Validation function to check if contact info is valid
  const isContactInfoValid = () => {
    return formData.name.trim() !== '' && 
           formData.phone.trim() !== '' && 
           formData.email.trim() !== '' &&
           formData.address.trim() !== '';
  };

  // Validation function to check if current step is valid
  const isCurrentStepValid = () => {
    if (!selectedService || selectedService !== 'Home Cleaning') return true;
    
    // Always require contact info
    if (!isContactInfoValid()) return false;
    
    if (currentStep === 1) {
      // Step 1 validation
      const basicFields = 
        formData.homeType !== '' &&
        formData.areaSize !== '' &&
        formData.frequency !== '' &&
        formData.cleanAll !== '';
      
      // preferredDateTime is required if frequency is "Specific Date & Time" OR if cleanAll is selected
      const dateTimeValid = 
        (formData.frequency === 'Specific Date & Time' ? formData.preferredDateTime !== '' : true) &&
        (formData.cleanAll !== '' ? formData.preferredDateTime !== '' : true);
      
      return basicFields && dateTimeValid;
    }
    
    if (currentStep === 2) {
      // Step 2 validation - room fields are always filled (default '0')
      return true; // All room fields have default values
    }
    
    if (currentStep === 3) {
      // Step 3 validation
      return formData.floors !== '' && formData.hasPets !== '';
    }
    
    return true;
  };

  // Validation function to check if all required fields are filled (for final submission)
  const isFormValid = () => {
    if (!selectedService) return false;
    
    // Always require contact info
    if (!isContactInfoValid()) return false;
    
    if (selectedService === 'Home Cleaning') {
      // Step 1 validation
      const step1Valid = 
        formData.homeType !== '' &&
        formData.areaSize !== '' &&
        formData.frequency !== '' &&
        formData.cleanAll !== '' &&
        // preferredDateTime is required if frequency is "Specific Date & Time" OR if cleanAll is selected
        (formData.frequency === 'Specific Date & Time' ? formData.preferredDateTime !== '' : true) &&
        (formData.cleanAll !== '' ? formData.preferredDateTime !== '' : true);
      
      // Step 2 validation - room fields are always filled (default '0')
      const step2Valid = true; // All room fields have default values
      
      // Step 3 validation
      const step3Valid = 
        formData.floors !== '' &&
        formData.hasPets !== '';
      
      return step1Valid && step2Valid && step3Valid;
    }
    
    // For other services, return true (they might have different validation)
    return true;
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
          name: '', phone: '', email: '', address: '', company: '', vatNumber: '',
          homeType: '', cleanAll: '', areaSize: '', frequency: '', preferredDateTime: '', 
          numberOfRooms: '0', bedroom: '0', kitchen: '0', livingRoom: '0', 
          floors: '', hasPets: '', comments: '', message: ''
        });
        setCurrentStep(1);
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
    <div className="bg-white rounded-2xl shadow-2xl p-6 animate-slide-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Get Your Free Quote</h2>

      {/* Service Selection - Vertical List */}
      {!selectedService ? (
        <div className="space-y-2 mb-6">
          {(['Move-out Cleaning', 'Home Cleaning', 'Detail Cleaning', 'Office Cleaning', 'Deep/Heavy-duty Cleaning', 'Window Cleaning', 'Stairwell Cleaning', 'Construction Cleaning', 'Gym Cleaning'] as ServiceType[]).map((service) => (
            <button
              key={service}
              type="button"
              onClick={() => setSelectedService(service)}
              className="w-full text-left py-2.5 px-4 rounded-xl transition-all duration-200 border-2 flex items-center justify-between group border-gray-100 bg-white text-gray-600 hover:border-cyan-200 hover:bg-gray-50 hover:shadow-md"
            >
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-cyan-500 group-hover:bg-cyan-50 mr-3 flex items-center justify-center transition-all">
                  <svg className="w-3 h-3 text-cyan-600 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-medium text-lg group-hover:text-cyan-700 transition-colors">{service}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-gray-50 group-hover:bg-cyan-100 flex items-center justify-center transition-colors">
                <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center justify-between bg-cyan-50 p-3 rounded-xl border border-cyan-100 mb-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-cyan-500 rounded-full flex items-center justify-center mr-3 shadow-sm">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-cyan-600 font-medium">Selected Service</p>
                <h3 className="text-lg font-bold text-gray-900">{selectedService}</h3>
              </div>
            </div>
            <button
              onClick={() => setSelectedService(null)}
              className="text-sm text-gray-500 hover:text-cyan-600 font-medium underline decoration-2 decoration-transparent hover:decoration-cyan-600 transition-all"
            >
              Change
            </button>
          </div>
        </div>
      )}

      {/* Form - Only shows when a service is selected */}
      {selectedService && (
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in-up">

          {/* Contact Information Fields - Always shown */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
            <h3 className="font-semibold text-gray-900 flex items-center mb-4">
              <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="0764447563"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                placeholder="Street address, City, Postal code"
              />
            </div>
          </div>

          {/* Dynamic Fields based on Service */}
          {selectedService === 'Home Cleaning' && (
            <>
              {/* Step Indicator */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    <span className="text-sm font-semibold">1</span>
                  </div>
                  <div className={`w-12 h-1 ${currentStep >= 2 ? 'bg-cyan-500' : 'bg-gray-200'}`}></div>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    <span className="text-sm font-semibold">2</span>
                  </div>
                  <div className={`w-12 h-1 ${currentStep >= 3 ? 'bg-cyan-500' : 'bg-gray-200'}`}></div>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    <span className="text-sm font-semibold">3</span>
                  </div>
                </div>
              </div>

              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
            <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                    Step 1: Basic Information
              </h3>

              {/* Home Type Dropdown */}
              <div className="form-group">
                <label htmlFor="homeType" className="block text-sm font-medium text-gray-700 mb-1">
                  What type of home should be cleaned?
                </label>
                <select
                  id="homeType"
                  name="homeType"
                  value={formData.homeType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="">Select home type</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Holiday Home">Holiday Home</option>
                  <option value="Terraced House">Terraced House</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Area Size Input */}
              <div className="form-group">
                <label htmlFor="areaSize" className="block text-sm font-medium text-gray-700 mb-1">
                  Approximately how large an area should be cleaned? (sq m)
                </label>
                <input
                      type="number"
                  id="areaSize"
                  name="areaSize"
                  value={formData.areaSize}
                  onChange={handleChange}
                      min="0"
                      step="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="e.g. 120"
                />
              </div>

              {/* Frequency Dropdown */}
              <div className="form-group">
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                  How often do you want cleaning help?
                </label>
                <select
                  id="frequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="">Select frequency</option>
                  <option value="An opportunity">An opportunity (One-time)</option>
                  <option value="Several times a week">Several times a week</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Every other week">Every other week</option>
                  <option value="Every month">Every month</option>
                  <option value="Specific Date & Time">Specific Date & Time</option>
                </select>
              </div>

              {/* Conditional Date/Time Picker */}
              {formData.frequency === 'Specific Date & Time' && (
                <div className="form-group animate-fade-in">
                  <label htmlFor="preferredDateTime" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    id="preferredDateTime"
                    name="preferredDateTime"
                    value={formData.preferredDateTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>
              )}

              {/* Clean All Radio */}
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-2">
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
              {/* Conditional Date/Time Picker - Shows after Clean All is selected */}
              {formData.cleanAll && (
                <div className="form-group animate-fade-in border-t border-gray-100 pt-4 mt-4">
                  <label htmlFor="preferredDateTime" className="block text-sm font-medium text-gray-700 mb-1 uppercase tracking-wide">
                    Preferred Date Time
                  </label>
                  <input
                    type="datetime-local"
                    id="preferredDateTime"
                    name="preferredDateTime"
                    value={formData.preferredDateTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>
              )}
            </div>
          )}

              {/* Step 2: Room Details */}
              {currentStep === 2 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                    Step 2: Room Details
                  </h3>

                  {/* Number of Rooms Input - Increment/Decrement */}
                  <div className="form-group">
                    <label htmlFor="numberOfRooms" className="block text-sm font-medium text-gray-700 mb-1">
                      Enter number of rooms to be cleaned
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDecrement('numberOfRooms')}
                        className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={parseInt(formData.numberOfRooms) <= 0}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <input
                        type="number"
                        id="numberOfRooms"
                        name="numberOfRooms"
                        value={formData.numberOfRooms}
                        onChange={(e) => handleNumberChange('numberOfRooms', e.target.value)}
                        min="0"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => handleIncrement('numberOfRooms')}
                        className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Bedroom Input - Increment/Decrement */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="bedroom" className="block text-sm font-medium text-gray-700 mb-1">
                      Bedroom
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDecrement('bedroom')}
                        className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={parseInt(formData.bedroom) <= 0}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <input
                        type="number"
                        id="bedroom"
                        name="bedroom"
                        value={formData.bedroom}
                        onChange={(e) => handleNumberChange('bedroom', e.target.value)}
                        min="0"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => handleIncrement('bedroom')}
                        className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Kitchen Input - Increment/Decrement */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="kitchen" className="block text-sm font-medium text-gray-700 mb-1">
                      Kitchen
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDecrement('kitchen')}
                        className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={parseInt(formData.kitchen) <= 0}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <input
                        type="number"
                        id="kitchen"
                        name="kitchen"
                        value={formData.kitchen}
                        onChange={(e) => handleNumberChange('kitchen', e.target.value)}
                        min="0"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => handleIncrement('kitchen')}
                        className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Living Room Input - Increment/Decrement */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="livingRoom" className="block text-sm font-medium text-gray-700 mb-1">
                      Living Room
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDecrement('livingRoom')}
                        className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={parseInt(formData.livingRoom) <= 0}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <input
                        type="number"
                        id="livingRoom"
                        name="livingRoom"
                        value={formData.livingRoom}
                        onChange={(e) => handleNumberChange('livingRoom', e.target.value)}
                        min="0"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => handleIncrement('livingRoom')}
                        className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Additional Information */}
              {currentStep === 3 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Step 3: Additional Information
                  </h3>

                  {/* Floors Dropdown */}
                  <div className="form-group">
                    <label htmlFor="floors" className="block text-sm font-medium text-gray-700 mb-1">
                      How many floors need to be cleaned?
                    </label>
                    <select
                      id="floors"
                      name="floors"
                      value={formData.floors}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select number of floors</option>
                      <option value="1 floor">1 floor</option>
                      <option value="2 floors">2 floors</option>
                      <option value="3 or more floors">3 or more floors</option>
                    </select>
                  </div>

                  {/* Has Pets Radio */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Does the household have pets?
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="hasPets"
                            value="Yes"
                            checked={formData.hasPets === 'Yes'}
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
                            name="hasPets"
                            value="No"
                            checked={formData.hasPets === 'No'}
                            onChange={handleChange}
                            className="peer h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300"
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Comments Textarea */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                      Comments/Optional
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                      placeholder="Any additional information or special requests..."
                    />
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 mt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentStep(currentStep - 1);
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transform hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (isCurrentStepValid()) {
                        setCurrentStep(currentStep + 1);
                      }
                    }}
                    disabled={!isCurrentStepValid()}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-emerald-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={status === 'loading' || !isFormValid()}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-emerald-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
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
                )}
              </div>
            </>
          )}

          {/* Submit button for other services (non-Home Cleaning) */}
          {selectedService && selectedService !== 'Home Cleaning' && (
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-emerald-600 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
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
          )}
        </form>
      )}
    </div>
  );
}
