'use client';

import { useState } from 'react';

export default function ContactSection() {
  const hoursArray = 'Mon-Fri: 8AM-6PM\nSat-Sun: 9AM-4PM'.split('\n');
  const [formData, setFormData] = useState({
    name: '',
    serviceType: '',
    phone: '',
    email: '',
    squareMeter: '',
    city: '',
    address: ''
  });

  const [errors, setErrors] = useState<{
    phone?: string;
    email?: string;
    address?: string;
    squareMeter?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const services = [
    'Move-out Cleaning',
    'Home Cleaning',
    'Detail Cleaning',
    'Office Cleaning',
    'Floor Cleaning',
    'Window Cleaning',
    'Staircase Cleaning',
    'Construction Cleaning'
  ];

  const validatePhone = (phone: string): boolean => {
    if (!phone.trim()) return false;
    // Swedish phone number validation: max 11 digits
    // Remove spaces, dashes, and country code if present
    const cleaned = phone.replace(/[\s\-+46]/g, '');
    // Swedish phone numbers: 9-11 digits, can start with 0
    // Mobile numbers typically start with 07 (10 digits total with leading 0)
    // Landlines can start with 0 followed by area code (9-11 digits)
    return /^0?\d{9,11}$/.test(cleaned) && cleaned.length <= 11;
  };

  const validateArea = (value: string): boolean => {
    if (!value.trim()) return false;
    const numValue = parseFloat(value);
    // Check if it's a valid number, max 4 digits, and between 0-1000
    return !isNaN(numValue) && numValue >= 0 && numValue <= 1000 && value.replace(/\./g, '').length <= 4;
  };

  const validateEmail = (email: string): boolean => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateAddress = (address: string): boolean => {
    // Check if address contains a 5-digit postal code
    // Swedish postal codes are exactly 5 digits
    const postalCodeMatch = address.match(/\b\d{5}\b/);
    return postalCodeMatch !== null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Validate and restrict area/square meter fields (0-1000, max 4 digits)
    if (name === 'squareMeter') {
      // Remove any non-numeric characters except decimal point
      processedValue = value.replace(/[^\d.]/g, '');
      // Limit to 4 digits total (excluding decimal point)
      const digitsOnly = processedValue.replace(/\./g, '');
      if (digitsOnly.length > 4) {
        processedValue = processedValue.slice(0, -(digitsOnly.length - 4));
      }
      // Ensure value is within 0-1000 range
      const numValue = parseFloat(processedValue) || 0;
      if (numValue > 1000) {
        processedValue = '1000';
      }
    }
    
    setFormData({
      ...formData,
      [name]: processedValue
    });

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone' && value && !validatePhone(value)) {
      setErrors({
        ...errors,
        phone: 'Please enter a valid Swedish phone number (max 11 digits)'
      });
    } else if (name === 'email' && value && !validateEmail(value)) {
      setErrors({
        ...errors,
        email: 'Please enter a valid email address'
      });
    } else if (name === 'address' && value && !validateAddress(value)) {
      setErrors({
        ...errors,
        address: 'Address must include a 5-digit postal code'
      });
    } else if (name === 'squareMeter' && value && !validateArea(value)) {
      const numValue = parseFloat(value);
      let errorMsg = 'Please enter a valid area size (0-1000 sq m, max 4 digits)';
      if (isNaN(numValue)) {
        errorMsg = 'Please enter a valid number';
      } else if (numValue < 0) {
        errorMsg = 'Area must be 0 or greater';
      } else if (numValue > 1000) {
        errorMsg = 'Area must not exceed 1000 sq m';
      } else if (value.replace(/\./g, '').length > 4) {
        errorMsg = 'Area must not exceed 4 digits';
      }
      setErrors({
        ...errors,
        squareMeter: errorMsg
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: typeof errors = {};
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid Swedish phone number (max 11 digits)';
    }
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (formData.address && !validateAddress(formData.address)) {
      newErrors.address = 'Address must include a 5-digit postal code';
    }
    if (formData.squareMeter && !validateArea(formData.squareMeter)) {
      const numValue = parseFloat(formData.squareMeter);
      let errorMsg = 'Please enter a valid area size (0-1000 sq m, max 4 digits)';
      if (isNaN(numValue)) {
        errorMsg = 'Please enter a valid number';
      } else if (numValue < 0) {
        errorMsg = 'Area must be 0 or greater';
      } else if (numValue > 1000) {
        errorMsg = 'Area must not exceed 1000 sq m';
      } else if (formData.squareMeter.replace(/\./g, '').length > 4) {
        errorMsg = 'Area must not exceed 4 digits';
      }
      newErrors.squareMeter = errorMsg;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check required fields
    if (!formData.name || !formData.serviceType || !formData.phone || !formData.email || !formData.squareMeter || !formData.city || !formData.address) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          serviceType: formData.serviceType,
          squareMeter: formData.squareMeter,
          city: formData.city,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to send email');
      }

      // Success
      setSubmitStatus({
        type: 'success',
        message: 'Email sent successfully! We will get back to you soon.'
      });

      // Reset form
      setFormData({
        name: '',
        serviceType: '',
        phone: '',
        email: '',
        squareMeter: '',
        city: '',
        address: ''
      });
      setErrors({});

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send email. Please try again.';
      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl p-[3px] bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 shadow-2xl">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Existing Content */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Get In Touch</h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">FREQUENTLY ASKED QUESTIONS</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                At Amples, we provide professional, reliable, and eco-friendly cleaning services. From homes to offices, our expert team ensures every space shines. Your satisfaction is our priority—cleaner spaces, happier places!
              </p>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-cyan-600">Phone</h3>
                <p className="text-gray-600">0764447563</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-cyan-600">Email</h3>
                <p className="text-gray-600">info@amples.com</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-cyan-600">Hours</h3>
                <p className="text-gray-600">
                  {hoursArray.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < hoursArray.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Send us an Email</h2>
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  First and Last Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder:text-gray-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Type of service
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors bg-white"
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone number
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <span className="text-2xl">🇸🇪</span>
                    <span className="text-gray-600 font-medium">+46</span>
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={11}
                    className={`w-full pl-20 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder:text-gray-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="70 123 45 67"
                    required
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder:text-gray-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="example@email.com"
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="squareMeter" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Enter square meter
                </label>
                <input
                  type="number"
                  id="squareMeter"
                  name="squareMeter"
                  value={formData.squareMeter}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="0"
                  max="1000"
                  step="1"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder:text-gray-500 ${
                    errors.squareMeter ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g. 50"
                  required
                />
                {errors.squareMeter && (
                  <p className="mt-1 text-sm text-red-600">{errors.squareMeter}</p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder:text-gray-500"
                  placeholder="e.g. Stockholm"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors placeholder:text-gray-500 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Street address, 12345"
                  required
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div className="mt-auto pt-2">
                {submitStatus.type && (
                  <div
                    className={`mb-4 p-3 rounded-lg text-sm ${
                      submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isSubmitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:from-cyan-600 hover:to-emerald-600'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send email'}
                </button>
              </div>
            </form>
          </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

