'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type ServiceType = 'Move-out Cleaning' | 'Home Cleaning' | 'Detail Cleaning' | 'Office Cleaning' | 'Floor Cleaning' | 'Window Cleaning' | 'Staircase Cleaning' | 'Construction Cleaning';

interface ContactFormProps {
  defaultService?: ServiceType | null;
}

export default function ContactForm({ defaultService = null }: ContactFormProps = {}) {
  const router = useRouter();
  const [formType, setFormType] = useState<'private' | 'company'>('private');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(defaultService);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Form State new
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
    message: '',
    // Move-out Cleaning fields
    moveOutCleaningDate: '',
    isDateFlexible: '',
    dateFlexibilityRange: '',
    // Window Cleaning fields
    windowCleaningDate: '',
    windowsWithBars: '0',
    windowsWithoutBars: '0',
    topHungWindows: '0',
    windowType: [] as string[],
    hasGlazedBalcony: '',
    windowHomeType: '',
    windowFloors: '',
    needsLadder: '',
    // Construction Cleaning fields
    constructionWorkType: [] as string[],
    constructionCleaningIncludes: [] as string[],
    constructionCleaningDate: '',
    constructionHomeType: '',
    constructionAreaSize: '',
    constructionFloors: '',
    // Floor Cleaning fields
    floorCleaningDate: '',
    floorCleaningIsDateFlexible: '',
    floorCleaningServices: [] as string[],
    floorCleaningTypes: [] as string[],
    // Office Cleaning fields
    officePremisesType: '',
    officeCleanAll: '',
    officeAreaSize: '',
    officeFrequency: '',
    officePreferredDateTime: '',
    officeSpace: '0',
    kitchenSpace: '0',
    diningRoom: '0',
    meetingRoom: '0',
    dressingRoom: '0',
    toilet: '0',
    otherRooms: '0',
    officeFloors: '',
    officeEntranceFloor: '',
    officeHasElevator: '',
    officeAdditionalServices: [] as string[],
    // Detail Cleaning fields
    detailHomeType: '',
    detailCleanAll: '',
    detailAreaSize: '',
    detailFrequency: '',
    detailPreferredDay: '',
    detailPreferredTime: '',
    detailBedroom: '0',
    detailKitchen: '0',
    detailBathroom: '0',
    detailLivingRoom: '0',
    detailOtherRooms: '0',
    detailFloors: '',
    detailAdditionalCleaning: [] as string[],
    // Staircase Cleaning fields
    staircaseFrequency: '',
    staircasePreferredDay: '',
    staircasePreferredTime: '',
    staircaseProperties: '',
    staircaseStairwells: '',
    staircaseFloors: '',
    staircaseAdditionalCleaning: [] as string[],
    staircaseAdditionalServices: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const fieldName = e.target.name;
    // Mark field as touched when user interacts with it
    setTouchedFields(prev => new Set(prev).add(fieldName));
    
    setFormData({
      ...formData,
      [fieldName]: e.target.value
    });
  };

  // Validation helper functions
  const isFieldInvalid = (fieldName: string, value: string) => {
    if (!touchedFields.has(fieldName)) return false; // Don't show error until field is touched
    
    switch (fieldName) {
      case 'name':
        return value.trim() === '';
      case 'phone':
        return value.trim() === '';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return value.trim() === '' || !emailRegex.test(value);
      case 'address':
        return value.trim() === '' || !hasValidPostalCode(value);
      case 'company':
        return formType === 'company' && value.trim() === '';
      case 'vatNumber':
        return formType === 'company' && value.trim() === '';
      default:
        return value.trim() === '';
    }
  };

  const getFieldError = (fieldName: string, value: string) => {
    if (!touchedFields.has(fieldName)) return null;
    
    switch (fieldName) {
      case 'name':
        return value.trim() === '' ? 'Name is required' : null;
      case 'phone':
        return value.trim() === '' ? 'Phone number is required' : null;
      case 'email':
        if (value.trim() === '') return 'Email address is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : null;
      case 'address':
        if (value.trim() === '') return 'Address is required';
        return !hasValidPostalCode(value) ? 'Please include a 5-digit postal code in your address' : null;
      case 'company':
        return formType === 'company' && value.trim() === '' ? 'Company name is required' : null;
      case 'vatNumber':
        return formType === 'company' && value.trim() === '' ? 'VAT number is required' : null;
      default:
        return null;
    }
  };

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    const currentValues = formData[name as keyof typeof formData] as string[];
    if (checked) {
      setFormData({
        ...formData,
        [name]: [...currentValues, value]
      });
    } else {
      setFormData({
        ...formData,
        [name]: currentValues.filter(item => item !== value)
      });
    }
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

  // Helper function to validate postal code (5 digits)
  const hasValidPostalCode = (address: string) => {
    // Check if address contains a 5-digit postal code
    // Matches 5 consecutive digits (with optional spaces/dashes before or after)
    const postalCodeRegex = /\b\d{5}\b/;
    return postalCodeRegex.test(address);
  };

  // Helper function to get current date-time in format for datetime-local input
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Helper function to get current date in format for date input
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Validation function to check if contact info is valid
  const isContactInfoValid = () => {
    return formData.name.trim() !== '' && 
           formData.phone.trim() !== '' && 
           formData.email.trim() !== '' &&
           formData.address.trim() !== '' &&
           hasValidPostalCode(formData.address);
  };

  // Validation function to check if current step is valid
  const isCurrentStepValid = () => {
    if (!selectedService) return true;
    
    // Always require contact info
    if (!isContactInfoValid()) return false;
    
    if (selectedService === 'Home Cleaning') {
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
    }
    
    if (selectedService === 'Move-out Cleaning') {
      if (currentStep === 1) {
        // Step 1 validation for Move-out Cleaning
        return formData.moveOutCleaningDate !== '' && 
               formData.isDateFlexible !== '' &&
               (formData.isDateFlexible === 'No' || formData.dateFlexibilityRange !== '');
      }
      
      if (currentStep === 2) {
        // Step 2 validation - room fields are always filled (default '0')
        return true;
      }
      
      if (currentStep === 3) {
        // Step 3 validation for Construction Cleaning - no fields required
        return true;
      }
    }
    
    if (selectedService === 'Window Cleaning') {
      if (currentStep === 1) {
        // Step 1 validation for Window Cleaning
        return formData.windowCleaningDate !== '';
      }
      
      if (currentStep === 2) {
        // Step 2 validation for Window Cleaning
        return (formData.windowType as string[]).length > 0 && formData.hasGlazedBalcony !== '';
      }
      
      if (currentStep === 3) {
        // Step 3 validation for Window Cleaning
        return formData.floors !== '' && 
               formData.hasPets !== '' &&
               formData.windowFloors !== '' &&
               formData.needsLadder !== '';
      }
    }
    
    if (selectedService === 'Construction Cleaning') {
      if (currentStep === 1) {
        // Step 1 validation for Construction Cleaning
        return (formData.constructionWorkType as string[]).length > 0;
      }
      
      if (currentStep === 2) {
        // Step 2 validation - room fields are always filled (default '0')
        return true;
      }
      
      if (currentStep === 3) {
        // Step 3 validation for Floor Cleaning
        return (formData.floorCleaningTypes as string[]).length > 0 && formData.floors !== '' && formData.hasPets !== '';
      }
    }

    if (selectedService === 'Detail Cleaning') {
      if (currentStep === 1) {
        // Step 1 validation
        return formData.detailHomeType !== '' && 
               formData.detailCleanAll !== '' && 
               formData.detailAreaSize !== '';
      }
      if (currentStep === 2) {
        // Step 2 validation
        return formData.detailFrequency !== '' && 
               formData.detailPreferredDay !== '' && 
               formData.detailPreferredTime !== '';
      }
      if (currentStep === 3) {
        // Step 3 validation - room fields are always filled (default '0'), only floors is required
        return formData.detailFloors !== '';
      }
      return true;
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
    
    if (selectedService === 'Move-out Cleaning') {
      // Step 1 validation
      const step1Valid = 
        formData.moveOutCleaningDate !== '' &&
        formData.isDateFlexible !== '' &&
        (formData.isDateFlexible === 'No' || formData.dateFlexibilityRange !== '');
      
      // Step 2 validation - room fields are always filled (default '0')
      const step2Valid = true;
      
      // Step 3 validation
      const step3Valid = 
        formData.floors !== '' &&
        formData.hasPets !== '';
      
      return step1Valid && step2Valid && step3Valid;
    }
    
    if (selectedService === 'Window Cleaning') {
      // Step 1 validation
      const step1Valid = formData.windowCleaningDate !== '';
      
      // Step 2 validation
      const step2Valid = (formData.windowType as string[]).length > 0 && formData.hasGlazedBalcony !== '';
      
      // Step 3 validation
      const step3Valid = 
        formData.floors !== '' &&
        formData.hasPets !== '' &&
        formData.windowFloors !== '' &&
        formData.needsLadder !== '';
      
      return step1Valid && step2Valid && step3Valid;
    }
    
    if (selectedService === 'Construction Cleaning') {
      // Step 1 validation
      const step1Valid = (formData.constructionWorkType as string[]).length > 0;
      
      // Step 2 validation
      const step2Valid = (formData.constructionCleaningIncludes as string[]).length > 0;
      
      // Step 3 validation
      const step3Valid = 
        formData.constructionCleaningDate !== '' &&
        formData.constructionHomeType !== '' &&
        formData.constructionAreaSize !== '' &&
        formData.constructionFloors !== '';
      
      return step1Valid && step2Valid && step3Valid;
    }
    
    if (selectedService === 'Floor Cleaning') {
      // Step 1 validation
      const step1Valid = formData.floorCleaningDate !== '' && formData.floorCleaningIsDateFlexible !== '';
      
      // Step 2 validation
      const step2Valid = (formData.floorCleaningServices as string[]).length > 0;
      
      // Step 3 validation
      const step3Valid = 
        (formData.floorCleaningTypes as string[]).length > 0 &&
        formData.floors !== '' &&
        formData.hasPets !== '';
      
      return step1Valid && step2Valid && step3Valid;
    }
    
    if (selectedService === 'Office Cleaning') {
      // Step 1 validation
      const step1Valid = 
        formData.officePremisesType !== '' &&
        formData.officeCleanAll !== '' &&
        formData.officeAreaSize !== '';
      
      // Step 2 validation
      const step2Valid = 
        formData.officeFrequency !== '' &&
        formData.officePreferredDateTime !== '';
      
      // Step 3 validation - all fields are optional
      const step3Valid = true;
      
      // Step 4 validation
      const step4Valid = 
        formData.officeFloors !== '' &&
        formData.officeEntranceFloor !== '' &&
        formData.officeHasElevator !== '';
      
      return step1Valid && step2Valid && step3Valid && step4Valid;
    }

    if (selectedService === 'Detail Cleaning') {
      // Step 1 validation
      const step1Valid = 
        formData.detailHomeType !== '' &&
        formData.detailCleanAll !== '' &&
        formData.detailAreaSize !== '';
      
      // Step 2 validation
      const step2Valid = 
        formData.detailFrequency !== '' &&
        formData.detailPreferredDay !== '' &&
        formData.detailPreferredTime !== '';
      
      return step1Valid && step2Valid;
    }
    
    if (selectedService === 'Staircase Cleaning') {
      // Step 1 validation
      const step1Valid = 
        formData.staircaseFrequency !== '' &&
        formData.staircasePreferredDay !== '' &&
        formData.staircasePreferredTime !== '';
      
      // Step 2 validation
      const step2Valid = 
        formData.staircaseProperties !== '' &&
        formData.staircaseStairwells !== '' &&
        formData.staircaseFloors !== '';
      
      // Step 3 validation - checkboxes are optional
      const step3Valid = true;
      
      return step1Valid && step2Valid && step3Valid;
    }
    
    // For other services, return true (they might have different validation)
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all required contact fields as touched to show validation errors
    const requiredFields = ['name', 'phone', 'email', 'address'];
    if (formType === 'company') {
      requiredFields.push('company', 'vatNumber');
    }
    setTouchedFields(prev => {
      const newSet = new Set(prev);
      requiredFields.forEach(field => newSet.add(field));
      return newSet;
    });
    
    // Check if contact info is valid before proceeding
    const contactInfoValid = requiredFields.every(field => {
      if (field === 'address') {
        return formData.address.trim() !== '' && hasValidPostalCode(formData.address);
      }
      if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return formData.email.trim() !== '' && emailRegex.test(formData.email);
      }
      return formData[field as keyof typeof formData].toString().trim() !== '';
    });
    
    if (!contactInfoValid || !isFormValid()) {
      setStatus('idle');
      return;
    }
    
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
        setShowSuccessModal(true);
        setFormData({
          name: '', phone: '', email: '', address: '', company: '', vatNumber: '',
          homeType: '', cleanAll: '', areaSize: '', frequency: '', preferredDateTime: '', 
          numberOfRooms: '0', bedroom: '0', kitchen: '0', livingRoom: '0', 
          floors: '', hasPets: '', comments: '', message: '',
          moveOutCleaningDate: '', isDateFlexible: '', dateFlexibilityRange: '',
          windowCleaningDate: '', windowsWithBars: '0', windowsWithoutBars: '0', topHungWindows: '0',
          windowType: [], hasGlazedBalcony: '', windowHomeType: '', windowFloors: '', needsLadder: '',
          constructionWorkType: [], constructionCleaningIncludes: [],
          constructionCleaningDate: '', constructionHomeType: '', constructionAreaSize: '', constructionFloors: '',
          floorCleaningDate: '', floorCleaningIsDateFlexible: '', floorCleaningServices: [], floorCleaningTypes: [],
          officePremisesType: '', officeCleanAll: '', officeAreaSize: '', officeFrequency: '', officePreferredDateTime: '',
          officeSpace: '0', kitchenSpace: '0', diningRoom: '0', meetingRoom: '0', dressingRoom: '0', toilet: '0', otherRooms: '0',
          officeFloors: '', officeEntranceFloor: '', officeHasElevator: '', officeAdditionalServices: [],
          detailHomeType: '', detailCleanAll: '', detailAreaSize: '',
          detailFrequency: '', detailPreferredDay: '', detailPreferredTime: '',
          detailBedroom: '0', detailKitchen: '0', detailBathroom: '0', detailLivingRoom: '0', detailOtherRooms: '0', detailFloors: '',
          detailAdditionalCleaning: [],
          staircaseFrequency: '', staircasePreferredDay: '', staircasePreferredTime: '',
          staircaseProperties: '', staircaseStairwells: '', staircaseFloors: '',
          staircaseAdditionalCleaning: [], staircaseAdditionalServices: []
        });
        setCurrentStep(1);
        setSelectedService(null);
        
        // Hide modal after 3 seconds, then redirect to home page
        setTimeout(() => {
          setShowSuccessModal(false);
          setTimeout(() => {
            router.push('/');
          }, 300); // Small delay for fade-out animation
        }, 3000);
      } else {
        // Try to get error details from response
        try {
          const errorData = await response.json();
          console.error('API Error Response:', errorData);
          if (errorData.error) {
            console.error('Error:', errorData.error);
          }
          if (errorData.details) {
            console.error('Error Details:', errorData.details);
          }
          if (errorData.hint) {
            console.error('Hint:', errorData.hint);
          }
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
          console.error('Response status:', response.status);
          console.error('Response statusText:', response.statusText);
        }
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform animate-fade-in-up">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600 mb-6">
                Your quote request has been submitted successfully. We&apos;ll get back to you soon!
              </p>
              <p className="text-sm text-gray-500 mb-4">
                You will be redirected to the home page in a few seconds...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 h-2 rounded-full" style={{ animation: 'progress 3s linear forwards', width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

    <div className="bg-white rounded-2xl shadow-2xl p-6 animate-slide-in">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Get Your Free Quote</h2>

      {/* Service Selection - Vertical List */}
      {!selectedService ? (
        <div className="space-y-2 mb-6">
          {(['Move-out Cleaning', 'Home Cleaning', 'Detail Cleaning', 'Office Cleaning', 'Floor Cleaning', 'Window Cleaning', 'Staircase Cleaning', 'Construction Cleaning'] as ServiceType[]).map((service) => (
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
                  onBlur={(e) => setTouchedFields(prev => new Set(prev).add(e.target.name))}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 transition-all placeholder:text-black ${
                    isFieldInvalid('name', formData.name)
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-cyan-500 focus:border-transparent'
                  }`}
                  placeholder="Your name"
                />
                {getFieldError('name', formData.name) && (
                  <p className="mt-1 text-sm text-red-600">
                    {getFieldError('name', formData.name)}
                  </p>
                )}
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
                  onBlur={(e) => setTouchedFields(prev => new Set(prev).add(e.target.name))}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 transition-all placeholder:text-black ${
                    isFieldInvalid('phone', formData.phone)
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-cyan-500 focus:border-transparent'
                  }`}
                  placeholder="0764447563"
                />
                {getFieldError('phone', formData.phone) && (
                  <p className="mt-1 text-sm text-red-600">
                    {getFieldError('phone', formData.phone)}
                  </p>
                )}
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
                onBlur={(e) => setTouchedFields(prev => new Set(prev).add(e.target.name))}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 transition-all placeholder:text-black ${
                  isFieldInvalid('email', formData.email)
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-cyan-500 focus:border-transparent'
                }`}
                placeholder="your@email.com"
              />
              {getFieldError('email', formData.email) && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError('email', formData.email)}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address * (Must include 5-digit postal code)
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                onBlur={(e) => setTouchedFields(prev => new Set(prev).add(e.target.name))}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 transition-all placeholder:text-black ${
                  isFieldInvalid('address', formData.address)
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-cyan-500 focus:border-transparent'
                }`}
                placeholder="Street address, City, 12345"
              />
              {getFieldError('address', formData.address) && (
                <p className="mt-1 text-sm text-red-600">
                  {getFieldError('address', formData.address)}
                </p>
              )}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all placeholder:text-black"
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
                    min={getCurrentDateTime()}
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
                    min={getCurrentDateTime()}
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

          {/* Move-out Cleaning Form */}
          {selectedService === 'Move-out Cleaning' && (
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

              {/* Step 1: Move-out Cleaning Details */}
              {currentStep === 1 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Step 1: Move-out Cleaning Details
                  </h3>

                  {/* Move-out Cleaning Date/Time Picker */}
                  <div className="form-group">
                    <label htmlFor="moveOutCleaningDate" className="block text-sm font-medium text-gray-700 mb-1">
                      When will the moving-out cleaning take place? *
                    </label>
                    <input
                      type="datetime-local"
                      id="moveOutCleaningDate"
                      name="moveOutCleaningDate"
                      value={formData.moveOutCleaningDate}
                      onChange={handleChange}
                      min={getCurrentDateTime()}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Is Date Flexible Radio */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Is the cleaning date flexible? Can the cleaning take place on dates other than the selected cleaning date above? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="isDateFlexible"
                            value="Yes"
                            checked={formData.isDateFlexible === 'Yes'}
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
                            name="isDateFlexible"
                            value="No"
                            checked={formData.isDateFlexible === 'No'}
                            onChange={handleChange}
                            className="peer h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300"
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Conditional Date Flexibility Range Dropdown */}
                  {formData.isDateFlexible === 'Yes' && (
                    <div className="form-group animate-fade-in border-t border-gray-200 pt-4">
                      <label htmlFor="dateFlexibilityRange" className="block text-sm font-medium text-gray-700 mb-1">
                        Date Flexibility Range *
                      </label>
                      <select
                        id="dateFlexibilityRange"
                        name="dateFlexibilityRange"
                        value={formData.dateFlexibilityRange}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                      >
                        <option value="">Select flexibility range</option>
                        <option value="+- 1 day">+- 1 day</option>
                        <option value="+- 2 days">+- 2 days</option>
                        <option value="+- 3 days">+- 3 days</option>
                        <option value="+- 1 week">+- 1 week</option>
                        <option value="+- 2 weeks">+- 2 weeks</option>
                        <option value="+- 1 month">+- 1 month</option>
                        <option value="+- more than a month">+- more than a month</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Room Details (Same as Home Cleaning) */}
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

              {/* Step 3: Additional Information (Same as Home Cleaning) */}
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

          {/* Window Cleaning Form */}
          {selectedService === 'Window Cleaning' && (
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

              {/* Step 1: Window Cleaning Details */}
              {currentStep === 1 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Step 1: Window Cleaning Details
                  </h3>

                  {/* Window Cleaning Date/Time Picker */}
                  <div className="form-group">
                    <label htmlFor="windowCleaningDate" className="block text-sm font-medium text-gray-700 mb-1">
                      When should the window cleaning take place? *
                    </label>
                    <input
                      type="datetime-local"
                      id="windowCleaningDate"
                      name="windowCleaningDate"
                      value={formData.windowCleaningDate}
                      onChange={handleChange}
                      min={getCurrentDateTime()}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* How many windows need to be cleaned? */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      How many windows need to be cleaned? *
                    </label>
                    
                    {/* Windows with bars */}
                    <div className="mb-4">
                      <label htmlFor="windowsWithBars" className="block text-sm font-medium text-gray-700 mb-2">
                        Windows with bars
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDecrement('windowsWithBars')}
                          className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={parseInt(formData.windowsWithBars) <= 0}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <input
                          type="number"
                          id="windowsWithBars"
                          name="windowsWithBars"
                          value={formData.windowsWithBars}
                          onChange={(e) => handleNumberChange('windowsWithBars', e.target.value)}
                          min="0"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                        />
                        <button
                          type="button"
                          onClick={() => handleIncrement('windowsWithBars')}
                          className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Windows without bars */}
                    <div className="mb-4">
                      <label htmlFor="windowsWithoutBars" className="block text-sm font-medium text-gray-700 mb-2">
                        Windows without bars
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDecrement('windowsWithoutBars')}
                          className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={parseInt(formData.windowsWithoutBars) <= 0}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <input
                          type="number"
                          id="windowsWithoutBars"
                          name="windowsWithoutBars"
                          value={formData.windowsWithoutBars}
                          onChange={(e) => handleNumberChange('windowsWithoutBars', e.target.value)}
                          min="0"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                        />
                        <button
                          type="button"
                          onClick={() => handleIncrement('windowsWithoutBars')}
                          className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Top-hung windows */}
                    <div>
                      <label htmlFor="topHungWindows" className="block text-sm font-medium text-gray-700 mb-2">
                        Top-hung windows
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDecrement('topHungWindows')}
                          className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={parseInt(formData.topHungWindows) <= 0}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <input
                          type="number"
                          id="topHungWindows"
                          name="topHungWindows"
                          value={formData.topHungWindows}
                          onChange={(e) => handleNumberChange('topHungWindows', e.target.value)}
                          min="0"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                        />
                        <button
                          type="button"
                          onClick={() => handleIncrement('topHungWindows')}
                          className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Window Type Details (Window Cleaning specific) */}
              {currentStep === 2 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Step 2: Window Details
                  </h3>

                  {/* Window Type Checkboxes */}
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What type of windows do you have? *
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: 'Single-glazed window (2 sides)', label: 'Single-glazed window (2 sides)' },
                        { value: 'Double-glazed windows (4 sides)', label: 'Double-glazed windows (4 sides)' },
                        { value: 'Triple-glazed window (6 sides)', label: 'Triple-glazed window (6 sides)' },
                        { value: "Don't know", label: "Don't know" }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center cursor-pointer group p-3 rounded-lg border-2 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 transition-all">
                          <input
                            type="checkbox"
                            name="windowType"
                            value={option.value}
                            checked={(formData.windowType as string[]).includes(option.value)}
                            onChange={(e) => handleCheckboxChange('windowType', option.value, e.target.checked)}
                            className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-700 transition-colors">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Glazed Balcony/Patio Radio */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Do you have a glazed balcony or patio that needs window cleaning? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="hasGlazedBalcony"
                            value="Yes"
                            checked={formData.hasGlazedBalcony === 'Yes'}
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
                            name="hasGlazedBalcony"
                            value="No"
                            checked={formData.hasGlazedBalcony === 'No'}
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

              {/* Step 3: Additional Information (Window Cleaning specific) */}
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

                  {/* Window Floors Dropdown */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="windowFloors" className="block text-sm font-medium text-gray-700 mb-1">
                      How many floors does your home have? *
                    </label>
                    <select
                      id="windowFloors"
                      name="windowFloors"
                      value={formData.windowFloors}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select number of floors</option>
                      <option value="1 floor">1 floor</option>
                      <option value="2 floors">2 floors</option>
                      <option value="3 or more floors">3 or more floors</option>
                    </select>
                  </div>

                  {/* Needs Ladder Radio */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Does the cleaning company need to bring a ladder to reach all the windows? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="needsLadder"
                            value="Yes"
                            checked={formData.needsLadder === 'Yes'}
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
                            name="needsLadder"
                            value="No"
                            checked={formData.needsLadder === 'No'}
                            onChange={handleChange}
                            className="peer h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300"
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">No</span>
                      </label>
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="needsLadder"
                            value="Don't know"
                            checked={formData.needsLadder === "Don't know"}
                            onChange={handleChange}
                            className="peer h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300"
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Don&apos;t know</span>
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

          {/* Construction Cleaning Form */}
          {selectedService === 'Construction Cleaning' && (
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

              {/* Step 1: Construction Work Details */}
              {currentStep === 1 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Step 1: Construction Work Details
                  </h3>

                  {/* Construction Work Type Checkboxes */}
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What kind of work have you done? *
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: 'Renovation/Remodeling', label: 'Renovation/Remodeling' },
                        { value: 'Extension/Expansion', label: 'Extension/Expansion' },
                        { value: 'Painting/Sanding', label: 'Painting/Sanding' },
                        { value: 'Flooring/Floor sanding', label: 'Flooring/Floor sanding' },
                        { value: 'Other', label: 'Other' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center cursor-pointer group p-3 rounded-lg border-2 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 transition-all">
                          <input
                            type="checkbox"
                            name="constructionWorkType"
                            value={option.value}
                            checked={(formData.constructionWorkType as string[]).includes(option.value)}
                            onChange={(e) => handleCheckboxChange('constructionWorkType', option.value, e.target.checked)}
                            className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-700 transition-colors">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Cleaning Includes */}
              {currentStep === 2 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Step 2: Cleaning Includes
                  </h3>

                  {/* Construction Cleaning Includes Checkboxes */}
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What should be included in the cleaning? *
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: 'Dust Drying', label: 'Dust Drying' },
                        { value: 'Vacuuming', label: 'Vacuuming' },
                        { value: 'Floor Cleaning', label: 'Floor Cleaning' },
                        { value: 'Window Cleaning', label: 'Window Cleaning' },
                        { value: 'Kitchen cleaning', label: 'Kitchen cleaning' },
                        { value: 'Bathroom cleaning', label: 'Bathroom cleaning' },
                        { value: 'Cleaning of walls and ceiling', label: 'Cleaning of walls and ceiling' },
                        { value: 'Throw away trash and waste', label: 'Throw away trash and waste' },
                        { value: 'Other', label: 'Other' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center cursor-pointer group p-3 rounded-lg border-2 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 transition-all">
                          <input
                            type="checkbox"
                            name="constructionCleaningIncludes"
                            value={option.value}
                            checked={(formData.constructionCleaningIncludes as string[]).includes(option.value)}
                            onChange={(e) => handleCheckboxChange('constructionCleaningIncludes', option.value, e.target.checked)}
                            className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-700 transition-colors">{option.label}</span>
                        </label>
                      ))}
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

                  {/* Construction Cleaning Date */}
                  <div className="form-group">
                    <label htmlFor="constructionCleaningDate" className="block text-sm font-medium text-gray-700 mb-1">
                      When will the cleaning take place? *
                    </label>
                    <input
                      type="datetime-local"
                      id="constructionCleaningDate"
                      name="constructionCleaningDate"
                      value={formData.constructionCleaningDate}
                      onChange={handleChange}
                      min={getCurrentDateTime()}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    />
                  </div>

                  {/* Construction Home Type Dropdown */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="constructionHomeType" className="block text-sm font-medium text-gray-700 mb-1">
                      What type of home should be cleaned? *
                    </label>
                    <select
                      id="constructionHomeType"
                      name="constructionHomeType"
                      value={formData.constructionHomeType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select home type</option>
                      <option value="Villa">Villa</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Townhouse">Townhouse</option>
                      <option value="Holiday Home">Holiday Home</option>
                    </select>
                  </div>

                  {/* Construction Area Size Input */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="constructionAreaSize" className="block text-sm font-medium text-gray-700 mb-1">
                      Approximately how large an area should be cleaned? (sq m) *
                    </label>
                    <input
                      type="number"
                      id="constructionAreaSize"
                      name="constructionAreaSize"
                      value={formData.constructionAreaSize}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="Enter area in square meters"
                    />
                  </div>

                  {/* Construction Floors Dropdown */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="constructionFloors" className="block text-sm font-medium text-gray-700 mb-1">
                      How many floors need to be cleaned? *
                    </label>
                    <select
                      id="constructionFloors"
                      name="constructionFloors"
                      value={formData.constructionFloors}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select number of floors</option>
                      <option value="1 floor">1 floor</option>
                      <option value="2 floors">2 floors</option>
                      <option value="3 or more floors">3 or more floors</option>
                    </select>
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

          {/* Floor Cleaning Form */}
          {selectedService === 'Floor Cleaning' && (
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

              {/* Step 1: Service Date */}
              {currentStep === 1 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Step 1: Service Date
                  </h3>

                  {/* Floor Cleaning Date */}
                  <div className="form-group">
                    <label htmlFor="floorCleaningDate" className="block text-sm font-medium text-gray-700 mb-1">
                      When should the service be performed? *
                    </label>
                    <input
                      type="date"
                      id="floorCleaningDate"
                      name="floorCleaningDate"
                      value={formData.floorCleaningDate}
                      onChange={handleChange}
                      min={getCurrentDate()}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    />
                  </div>

                  {/* Is Date Flexible Radio */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Is the date flexible? Can the work be done on dates other than the selected date above? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="floorCleaningIsDateFlexible"
                            value="Yes"
                            checked={formData.floorCleaningIsDateFlexible === 'Yes'}
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
                            name="floorCleaningIsDateFlexible"
                            value="No"
                            checked={formData.floorCleaningIsDateFlexible === 'No'}
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

              {/* Step 2: Services */}
              {currentStep === 2 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Step 2: Services
                  </h3>

                  {/* Floor Cleaning Services Checkboxes */}
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What services do you want? *
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: 'abode', label: 'abode' },
                        { value: 'vacuuming', label: 'vacuuming' },
                        { value: 'painting/oil/polish/waxing', label: 'painting/oil/polish/waxing' },
                        { value: 'carpet cleaning', label: 'carpet cleaning' },
                        { value: 'grinding and honing', label: 'grinding and honing' },
                        { value: 'sealing', label: 'sealing' },
                        { value: 'wet drying', label: 'wet drying' },
                        { value: 'other', label: 'other' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center cursor-pointer group p-3 rounded-lg border-2 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 transition-all">
                          <input
                            type="checkbox"
                            name="floorCleaningServices"
                            value={option.value}
                            checked={(formData.floorCleaningServices as string[]).includes(option.value)}
                            onChange={(e) => handleCheckboxChange('floorCleaningServices', option.value, e.target.checked)}
                            className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-700 transition-colors">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Additional Information (Floor Cleaning) */}
              {currentStep === 3 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Step 3: Additional Information
                  </h3>

                  {/* Floor Types Checkboxes */}
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What types of floors should be treated? *
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: 'carpet/textile flooring', label: 'carpet/textile flooring' },
                        { value: 'tiled floor', label: 'tiled floor' },
                        { value: 'laminate flooring', label: 'laminate flooring' },
                        { value: 'linoleum flooring', label: 'linoleum flooring' },
                        { value: 'marble floor', label: 'marble floor' },
                        { value: 'solid wood floor', label: 'solid wood floor' },
                        { value: 'parquet floor', label: 'parquet floor' },
                        { value: 'plastic, vinyl and PVC floors', label: 'plastic, vinyl and PVC floors' },
                        { value: 'stone floor', label: 'stone floor' },
                        { value: 'other', label: 'other' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center cursor-pointer group p-3 rounded-lg border-2 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 transition-all">
                          <input
                            type="checkbox"
                            name="floorCleaningTypes"
                            value={option.value}
                            checked={(formData.floorCleaningTypes as string[]).includes(option.value)}
                            onChange={(e) => handleCheckboxChange('floorCleaningTypes', option.value, e.target.checked)}
                            className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-700 transition-colors">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Type of Residence Dropdown */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="floors" className="block text-sm font-medium text-gray-700 mb-1">
                      Type of residence
                    </label>
                    <select
                      id="floors"
                      name="floors"
                      value={formData.floors}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select type of residence</option>
                      <option value="villa">villa</option>
                      <option value="apartment">apartment</option>
                      <option value="townhouse">townhouse</option>
                      <option value="semi-detached house">semi-detached house</option>
                      <option value="holiday-home">holiday-home</option>
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

          {/* Office Cleaning Form */}
          {selectedService === 'Office Cleaning' && (
            <>
              {/* Step Indicator */}
              <div className="flex justify-center items-center space-x-2 mb-6">
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
                <div className={`w-12 h-1 ${currentStep >= 4 ? 'bg-cyan-500' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 4 ? 'bg-cyan-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  <span className="text-sm font-semibold">4</span>
                </div>
              </div>

              {/* Step 1: Premises Type */}
              {currentStep === 1 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Step 1: Premises Information
                  </h3>

                  {/* Premises Type Dropdown */}
                  <div className="form-group">
                    <label htmlFor="officePremisesType" className="block text-sm font-medium text-gray-700 mb-1">
                      TYPE OF PREMISES *
                    </label>
                    <select
                      id="officePremisesType"
                      name="officePremisesType"
                      value={formData.officePremisesType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select type of premises</option>
                      <option value="office">office</option>
                      <option value="shop/trade">shop/trade</option>
                      <option value="warehouse/industry">warehouse/industry</option>
                      <option value="restaurant/serving">restaurant/serving</option>
                      <option value="teaching">teaching</option>
                      <option value="hotel">hotel</option>
                    </select>
                  </div>

                  {/* Should Entire Premises be Cleaned Radio */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Should the entire premises be cleaned? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="officeCleanAll"
                            value="Yes"
                            checked={formData.officeCleanAll === 'Yes'}
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
                            name="officeCleanAll"
                            value="No"
                            checked={formData.officeCleanAll === 'No'}
                            onChange={handleChange}
                            className="peer h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300"
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Area Size Numeric Input */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="officeAreaSize" className="block text-sm font-medium text-gray-700 mb-1">
                      Approximately how large an area should be cleaned? *
                    </label>
                    <input
                      type="number"
                      id="officeAreaSize"
                      name="officeAreaSize"
                      value={formData.officeAreaSize}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                      placeholder="Enter area in sq m"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Cleaning Schedule */}
              {currentStep === 2 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Step 2: Cleaning Schedule
                  </h3>

                  {/* Frequency Dropdown */}
                  <div className="form-group">
                    <label htmlFor="officeFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                      How often do you want cleaning help? *
                    </label>
                    <select
                      id="officeFrequency"
                      name="officeFrequency"
                      value={formData.officeFrequency}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select frequency</option>
                      <option value="an opportunity">an opportunity</option>
                      <option value="several times a week">several times a week</option>
                      <option value="weekly">weekly</option>
                      <option value="every month">every month</option>
                      <option value="other">other</option>
                    </select>
                  </div>

                  {/* Day and Time Picker */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="officePreferredDateTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Add at least one suitable cleaning day and time *
                    </label>
                    <input
                      type="datetime-local"
                      id="officePreferredDateTime"
                      name="officePreferredDateTime"
                      value={formData.officePreferredDateTime}
                      onChange={handleChange}
                      min={getCurrentDateTime()}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Room Details */}
              {currentStep === 3 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                    Step 3: Room Details
                  </h3>

                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Enter the number of rooms to be cleaned
                    </label>
                    <div className="space-y-4">
                      {/* Office Space */}
                      <div className="form-group">
                        <label htmlFor="officeSpace" className="block text-sm font-medium text-gray-700 mb-1">
                          office space
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDecrement('officeSpace')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={parseInt(formData.officeSpace) <= 0}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            id="officeSpace"
                            name="officeSpace"
                            value={formData.officeSpace}
                            onChange={(e) => handleNumberChange('officeSpace', e.target.value)}
                            min="0"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => handleIncrement('officeSpace')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Kitchen Space */}
                      <div className="form-group border-t border-gray-200 pt-4">
                        <label htmlFor="kitchenSpace" className="block text-sm font-medium text-gray-700 mb-1">
                          Kitchen space
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDecrement('kitchenSpace')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={parseInt(formData.kitchenSpace) <= 0}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            id="kitchenSpace"
                            name="kitchenSpace"
                            value={formData.kitchenSpace}
                            onChange={(e) => handleNumberChange('kitchenSpace', e.target.value)}
                            min="0"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => handleIncrement('kitchenSpace')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Dining Room */}
                      <div className="form-group border-t border-gray-200 pt-4">
                        <label htmlFor="diningRoom" className="block text-sm font-medium text-gray-700 mb-1">
                          dining room
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDecrement('diningRoom')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={parseInt(formData.diningRoom) <= 0}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            id="diningRoom"
                            name="diningRoom"
                            value={formData.diningRoom}
                            onChange={(e) => handleNumberChange('diningRoom', e.target.value)}
                            min="0"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => handleIncrement('diningRoom')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Meeting Room */}
                      <div className="form-group border-t border-gray-200 pt-4">
                        <label htmlFor="meetingRoom" className="block text-sm font-medium text-gray-700 mb-1">
                          meeting room
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDecrement('meetingRoom')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={parseInt(formData.meetingRoom) <= 0}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            id="meetingRoom"
                            name="meetingRoom"
                            value={formData.meetingRoom}
                            onChange={(e) => handleNumberChange('meetingRoom', e.target.value)}
                            min="0"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => handleIncrement('meetingRoom')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Dressing Room */}
                      <div className="form-group border-t border-gray-200 pt-4">
                        <label htmlFor="dressingRoom" className="block text-sm font-medium text-gray-700 mb-1">
                          dressing room
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDecrement('dressingRoom')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={parseInt(formData.dressingRoom) <= 0}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            id="dressingRoom"
                            name="dressingRoom"
                            value={formData.dressingRoom}
                            onChange={(e) => handleNumberChange('dressingRoom', e.target.value)}
                            min="0"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => handleIncrement('dressingRoom')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Toilet */}
                      <div className="form-group border-t border-gray-200 pt-4">
                        <label htmlFor="toilet" className="block text-sm font-medium text-gray-700 mb-1">
                          toilet
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDecrement('toilet')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={parseInt(formData.toilet) <= 0}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            id="toilet"
                            name="toilet"
                            value={formData.toilet}
                            onChange={(e) => handleNumberChange('toilet', e.target.value)}
                            min="0"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => handleIncrement('toilet')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Other Rooms */}
                      <div className="form-group border-t border-gray-200 pt-4">
                        <label htmlFor="otherRooms" className="block text-sm font-medium text-gray-700 mb-1">
                          other rooms
                        </label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDecrement('otherRooms')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={parseInt(formData.otherRooms) <= 0}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            id="otherRooms"
                            name="otherRooms"
                            value={formData.otherRooms}
                            onChange={(e) => handleNumberChange('otherRooms', e.target.value)}
                            min="0"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => handleIncrement('otherRooms')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Additional Information */}
              {currentStep === 4 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Step 4: Additional Information
                  </h3>

                  {/* Floors Dropdown */}
                  <div className="form-group">
                    <label htmlFor="officeFloors" className="block text-sm font-medium text-gray-700 mb-1">
                      How many floors need to be cleaned? *
                    </label>
                    <select
                      id="officeFloors"
                      name="officeFloors"
                      value={formData.officeFloors}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select number of floors</option>
                      <option value="1 floor">1 floor</option>
                      <option value="2 floors">2 floors</option>
                      <option value="3 floors">3 floors</option>
                      <option value="4 floors">4 floors</option>
                      <option value="5 floors">5 floors</option>
                      <option value="6 floors">6 floors</option>
                      <option value="7 floors">7 floors</option>
                      <option value="8 floors">8 floors</option>
                      <option value="9 floors">9 floors</option>
                      <option value="10 or more floors">10 or more floors</option>
                    </select>
                  </div>

                  {/* Entrance Floor Dropdown */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="officeEntranceFloor" className="block text-sm font-medium text-gray-700 mb-1">
                      What floor is the entrance to the venue on? *
                    </label>
                    <select
                      id="officeEntranceFloor"
                      name="officeEntranceFloor"
                      value={formData.officeEntranceFloor}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select entrance floor</option>
                      <option value="all floors have entrances">all floors have entrances</option>
                      <option value="basement">basement</option>
                      <option value="entrance floor">entrance floor</option>
                      <option value="floor 1">floor 1</option>
                      <option value="floor 2">floor 2</option>
                      <option value="floor 3">floor 3</option>
                      <option value="any other higher floor">any other higher floor</option>
                    </select>
                  </div>

                  {/* Has Elevator Radio */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Is there an elevator in the building? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="officeHasElevator"
                            value="Yes"
                            checked={formData.officeHasElevator === 'Yes'}
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
                            name="officeHasElevator"
                            value="No"
                            checked={formData.officeHasElevator === 'No'}
                            onChange={handleChange}
                            className="peer h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300"
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Additional Services Checkboxes */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Additional services
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: 'want washing up', label: 'want washing up' },
                        { value: 'want window cleaning', label: 'want window cleaning' },
                        { value: 'request a refill of paper towels', label: 'request a refill of paper towels' },
                        { value: 'request a refill of toilet paper', label: 'request a refill of toilet paper' },
                        { value: 'want a garbage disposal', label: 'want a garbage disposal' },
                        { value: 'want plant service', label: 'want plant service' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center cursor-pointer group p-3 rounded-lg border-2 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 transition-all">
                          <input
                            type="checkbox"
                            name="officeAdditionalServices"
                            value={option.value}
                            checked={(formData.officeAdditionalServices as string[]).includes(option.value)}
                            onChange={(e) => handleCheckboxChange('officeAdditionalServices', option.value, e.target.checked)}
                            className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-700 transition-colors">{option.label}</span>
                        </label>
                      ))}
                    </div>
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
                {currentStep < 4 ? (
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

          {/* Detail Cleaning Form */}
          {selectedService === 'Detail Cleaning' && (
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
                    <label htmlFor="detailHomeType" className="block text-sm font-medium text-gray-700 mb-1">
                      What type of home should be cleaned? *
                    </label>
                    <select
                      id="detailHomeType"
                      name="detailHomeType"
                      value={formData.detailHomeType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select home type</option>
                      <option value="villa">villa</option>
                      <option value="apartment">apartment</option>
                      <option value="semi-detached house">semi-detached house</option>
                      <option value="holiday-home">holiday-home</option>
                    </select>
                  </div>

                  {/* Should Entire Home be Cleaned Radio */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Should the entire home be cleaned? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            name="detailCleanAll"
                            value="Yes"
                            checked={formData.detailCleanAll === 'Yes'}
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
                            name="detailCleanAll"
                            value="No"
                            checked={formData.detailCleanAll === 'No'}
                            onChange={handleChange}
                            className="peer h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-gray-300"
                          />
                        </div>
                        <span className="ml-2 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">No</span>
                      </label>
                    </div>
                  </div>

                  {/* Area Size Numeric Input */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="detailAreaSize" className="block text-sm font-medium text-gray-700 mb-1">
                      Approximately how large an area should be cleaned? *
                    </label>
                    <input
                      type="number"
                      id="detailAreaSize"
                      name="detailAreaSize"
                      value={formData.detailAreaSize}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                      placeholder="Enter area in sq m"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Cleaning Schedule */}
              {currentStep === 2 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Step 2: Cleaning Schedule
                  </h3>

                  {/* Frequency Dropdown */}
                  <div className="form-group">
                    <label htmlFor="detailFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                      How often do you want cleaning help? *
                    </label>
                    <select
                      id="detailFrequency"
                      name="detailFrequency"
                      value={formData.detailFrequency}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select frequency</option>
                      <option value="an opportunity">an opportunity</option>
                      <option value="every month">every month</option>
                      <option value="every other month">every other month</option>
                      <option value="every three months">every three months</option>
                    </select>
                  </div>

                  {/* Preferred Day and Time */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add at least one suitable cleaning day and time *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Day Dropdown */}
                      <div>
                        <label htmlFor="detailPreferredDay" className="block text-xs font-medium text-gray-600 mb-1">
                          Day
                        </label>
                        <select
                          id="detailPreferredDay"
                          name="detailPreferredDay"
                          value={formData.detailPreferredDay}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                        >
                          <option value="">Select day</option>
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                          <option value="Saturday">Saturday</option>
                          <option value="Sunday">Sunday</option>
                        </select>
                      </div>

                      {/* Time Dropdown */}
                      <div>
                        <label htmlFor="detailPreferredTime" className="block text-xs font-medium text-gray-600 mb-1">
                          Time
                        </label>
                        <select
                          id="detailPreferredTime"
                          name="detailPreferredTime"
                          value={formData.detailPreferredTime}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                        >
                          <option value="">Select time</option>
                          <option value="6-9">6-9</option>
                          <option value="9-12">9-12</option>
                          <option value="12-15">12-15</option>
                          <option value="15-18">15-18</option>
                          <option value="18-21">18-21</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Room Details */}
              {currentStep === 3 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Step 3: Room Details
                  </h3>

                  {/* Room Count Inputs */}
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Enter the number of rooms to be cleaned
                    </label>
                    <div className="space-y-3">
                      {/* Bedroom */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 font-medium">Bedroom</label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDecrement('detailBedroom')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={parseInt(formData.detailBedroom) <= 0}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            name="detailBedroom"
                            value={formData.detailBedroom}
                            onChange={(e) => handleNumberChange('detailBedroom', e.target.value)}
                            min="0"
                            className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => handleIncrement('detailBedroom')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Kitchen */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 font-medium">Kitchen</label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDecrement('detailKitchen')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={parseInt(formData.detailKitchen) <= 0}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            name="detailKitchen"
                            value={formData.detailKitchen}
                            onChange={(e) => handleNumberChange('detailKitchen', e.target.value)}
                            min="0"
                            className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => handleIncrement('detailKitchen')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Bathroom */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 font-medium">Bathroom</label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDecrement('detailBathroom')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={parseInt(formData.detailBathroom) <= 0}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            name="detailBathroom"
                            value={formData.detailBathroom}
                            onChange={(e) => handleNumberChange('detailBathroom', e.target.value)}
                            min="0"
                            className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => handleIncrement('detailBathroom')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Living Room */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 font-medium">Living Room</label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDecrement('detailLivingRoom')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={parseInt(formData.detailLivingRoom) <= 0}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            name="detailLivingRoom"
                            value={formData.detailLivingRoom}
                            onChange={(e) => handleNumberChange('detailLivingRoom', e.target.value)}
                            min="0"
                            className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => handleIncrement('detailLivingRoom')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Other Rooms */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-700 font-medium">Other Rooms</label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDecrement('detailOtherRooms')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={parseInt(formData.detailOtherRooms) <= 0}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <input
                            type="number"
                            name="detailOtherRooms"
                            value={formData.detailOtherRooms}
                            onChange={(e) => handleNumberChange('detailOtherRooms', e.target.value)}
                            min="0"
                            className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center text-lg font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => handleIncrement('detailOtherRooms')}
                            className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white text-gray-600 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floors Dropdown */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="detailFloors" className="block text-sm font-medium text-gray-700 mb-1">
                      How many floors need to be cleaned? *
                    </label>
                    <select
                      id="detailFloors"
                      name="detailFloors"
                      value={formData.detailFloors}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select number of floors</option>
                      <option value="1 floor">1 floor</option>
                      <option value="2 floors">2 floors</option>
                      <option value="3 or more floors">3 or more floors</option>
                    </select>
                  </div>

                  {/* Additional Cleaning Options */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Choose whether you want cleaning of the following:
                    </label>
                    <div className="space-y-3">
                      {/* Garage */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="detailAdditionalCleaning"
                            value="garage"
                            checked={(formData.detailAdditionalCleaning as string[]).includes('garage')}
                            onChange={(e) => handleCheckboxChange('detailAdditionalCleaning', 'garage', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Garage</span>
                      </label>

                      {/* Balcony/Veranda/Terrace */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="detailAdditionalCleaning"
                            value="balcony/veranda/terrace"
                            checked={(formData.detailAdditionalCleaning as string[]).includes('balcony/veranda/terrace')}
                            onChange={(e) => handleCheckboxChange('detailAdditionalCleaning', 'balcony/veranda/terrace', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Balcony/Veranda/Terrace</span>
                      </label>

                      {/* Storage/Outbuilding */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="detailAdditionalCleaning"
                            value="storage/outbuilding"
                            checked={(formData.detailAdditionalCleaning as string[]).includes('storage/outbuilding')}
                            onChange={(e) => handleCheckboxChange('detailAdditionalCleaning', 'storage/outbuilding', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Storage/Outbuilding</span>
                      </label>
                    </div>
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

          {/* Staircase Cleaning Form */}
          {selectedService === 'Staircase Cleaning' && (
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

              {/* Step 1: Cleaning Schedule */}
              {currentStep === 1 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Step 1: Cleaning Schedule
                  </h3>

                  {/* Frequency Dropdown */}
                  <div className="form-group">
                    <label htmlFor="staircaseFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                      How often do you want stairs cleaned? *
                    </label>
                    <select
                      id="staircaseFrequency"
                      name="staircaseFrequency"
                      value={formData.staircaseFrequency}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select frequency</option>
                      <option value="an opportunity">an opportunity</option>
                      <option value="several times a week">several times a week</option>
                      <option value="weekly">weekly</option>
                      <option value="every other week">every other week</option>
                      <option value="every month">every month</option>
                    </select>
                  </div>

                  {/* Preferred Day and Time */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add at least one suitable cleaning day and time *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Day Dropdown */}
                      <div>
                        <label htmlFor="staircasePreferredDay" className="block text-xs font-medium text-gray-600 mb-1">
                          Day
                        </label>
                        <select
                          id="staircasePreferredDay"
                          name="staircasePreferredDay"
                          value={formData.staircasePreferredDay}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                        >
                          <option value="">Select day</option>
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                          <option value="Saturday">Saturday</option>
                          <option value="Sunday">Sunday</option>
                        </select>
                      </div>

                      {/* Time Dropdown */}
                      <div>
                        <label htmlFor="staircasePreferredTime" className="block text-xs font-medium text-gray-600 mb-1">
                          Time
                        </label>
                        <select
                          id="staircasePreferredTime"
                          name="staircasePreferredTime"
                          value={formData.staircasePreferredTime}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                        >
                          <option value="">Select time</option>
                          <option value="6-9">6-9</option>
                          <option value="9-12">9-12</option>
                          <option value="12-15">12-15</option>
                          <option value="15-18">15-18</option>
                          <option value="18-21">18-21</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Property and Stairwell Details */}
              {currentStep === 2 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Step 2: Property and Stairwell Details
                  </h3>

                  {/* Properties Dropdown */}
                  <div className="form-group">
                    <label htmlFor="staircaseProperties" className="block text-sm font-medium text-gray-700 mb-1">
                      How many properties need stair cleaning? *
                    </label>
                    <select
                      id="staircaseProperties"
                      name="staircaseProperties"
                      value={formData.staircaseProperties}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select number of properties</option>
                      <option value="1 property">1 property</option>
                      <option value="2 properties">2 properties</option>
                      <option value="3 or more properties">3 or more properties</option>
                      <option value="10 or more properties">10 or more properties</option>
                    </select>
                  </div>

                  {/* Stairwells Dropdown */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="staircaseStairwells" className="block text-sm font-medium text-gray-700 mb-1">
                      How many stairwells need cleaning? *
                    </label>
                    <select
                      id="staircaseStairwells"
                      name="staircaseStairwells"
                      value={formData.staircaseStairwells}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select number of stairwells</option>
                      <option value="1 stairwell">1 stairwell</option>
                      <option value="2 stairwells">2 stairwells</option>
                      <option value="3 or more stairwells">3 or more stairwells</option>
                      <option value="10 or more stairwells">10 or more stairwells</option>
                    </select>
                  </div>

                  {/* Floors Dropdown */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label htmlFor="staircaseFloors" className="block text-sm font-medium text-gray-700 mb-1">
                      Approximately how many floors does each stairwell have? *
                    </label>
                    <select
                      id="staircaseFloors"
                      name="staircaseFloors"
                      value={formData.staircaseFloors}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                    >
                      <option value="">Select number of floors</option>
                      <option value="1 floor">1 floor</option>
                      <option value="2 floors">2 floors</option>
                      <option value="3 floors">3 floors</option>
                      <option value="4 floors">4 floors</option>
                      <option value="5 or more floors">5 or more floors</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Additional Cleaning Options */}
              {currentStep === 3 && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <svg className="w-5 h-5 mr-2 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Step 3: Additional Cleaning Options
                  </h3>

                  {/* Additional Cleaning Options */}
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Choose whether you want cleaning of the following:
                    </label>
                    <div className="space-y-3">
                      {/* Operating Spaces */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="staircaseAdditionalCleaning"
                            value="operating spaces"
                            checked={(formData.staircaseAdditionalCleaning as string[]).includes('operating spaces')}
                            onChange={(e) => handleCheckboxChange('staircaseAdditionalCleaning', 'operating spaces', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Operating Spaces</span>
                      </label>

                      {/* Community Center/Meeting Room */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="staircaseAdditionalCleaning"
                            value="community center/meeting room"
                            checked={(formData.staircaseAdditionalCleaning as string[]).includes('community center/meeting room')}
                            onChange={(e) => handleCheckboxChange('staircaseAdditionalCleaning', 'community center/meeting room', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Community Center/Meeting Room</span>
                      </label>

                      {/* Storage/Outbuilding */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="staircaseAdditionalCleaning"
                            value="storage/outbuilding"
                            checked={(formData.staircaseAdditionalCleaning as string[]).includes('storage/outbuilding')}
                            onChange={(e) => handleCheckboxChange('staircaseAdditionalCleaning', 'storage/outbuilding', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Storage/Outbuilding</span>
                      </label>

                      {/* Garage */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="staircaseAdditionalCleaning"
                            value="garage"
                            checked={(formData.staircaseAdditionalCleaning as string[]).includes('garage')}
                            onChange={(e) => handleCheckboxChange('staircaseAdditionalCleaning', 'garage', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Garage</span>
                      </label>

                      {/* Guest Apartment */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="staircaseAdditionalCleaning"
                            value="guest apartment"
                            checked={(formData.staircaseAdditionalCleaning as string[]).includes('guest apartment')}
                            onChange={(e) => handleCheckboxChange('staircaseAdditionalCleaning', 'guest apartment', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Guest Apartment</span>
                      </label>

                      {/* Basement Passage */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="staircaseAdditionalCleaning"
                            value="basement passage"
                            checked={(formData.staircaseAdditionalCleaning as string[]).includes('basement passage')}
                            onChange={(e) => handleCheckboxChange('staircaseAdditionalCleaning', 'basement passage', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Basement Passage</span>
                      </label>

                      {/* Laundry */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="staircaseAdditionalCleaning"
                            value="laundry"
                            checked={(formData.staircaseAdditionalCleaning as string[]).includes('laundry')}
                            onChange={(e) => handleCheckboxChange('staircaseAdditionalCleaning', 'laundry', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Laundry</span>
                      </label>

                      {/* Terrace */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="staircaseAdditionalCleaning"
                            value="terrace"
                            checked={(formData.staircaseAdditionalCleaning as string[]).includes('terrace')}
                            onChange={(e) => handleCheckboxChange('staircaseAdditionalCleaning', 'terrace', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Terrace</span>
                      </label>

                      {/* Attic Space */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="staircaseAdditionalCleaning"
                            value="attic space"
                            checked={(formData.staircaseAdditionalCleaning as string[]).includes('attic space')}
                            onChange={(e) => handleCheckboxChange('staircaseAdditionalCleaning', 'attic space', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Attic Space</span>
                      </label>
                    </div>
                  </div>

                  {/* Additional Services */}
                  <div className="form-group border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Additional services
                    </label>
                    <div className="space-y-3">
                      {/* Elevator Cleaning */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="staircaseAdditionalServices"
                            value="want elevator cleaning"
                            checked={(formData.staircaseAdditionalServices as string[]).includes('want elevator cleaning')}
                            onChange={(e) => handleCheckboxChange('staircaseAdditionalServices', 'want elevator cleaning', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Want Elevator Cleaning</span>
                      </label>

                      {/* Window Cleaning */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="staircaseAdditionalServices"
                            value="want window cleaning"
                            checked={(formData.staircaseAdditionalServices as string[]).includes('want window cleaning')}
                            onChange={(e) => handleCheckboxChange('staircaseAdditionalServices', 'want window cleaning', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Want Window Cleaning</span>
                      </label>

                      {/* Floor Care */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="staircaseAdditionalServices"
                            value="want floor care"
                            checked={(formData.staircaseAdditionalServices as string[]).includes('want floor care')}
                            onChange={(e) => handleCheckboxChange('staircaseAdditionalServices', 'want floor care', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Want Floor Care</span>
                      </label>

                      {/* Entrance Mats Cleaned */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="staircaseAdditionalServices"
                            value="want entrance mats cleaned"
                            checked={(formData.staircaseAdditionalServices as string[]).includes('want entrance mats cleaned')}
                            onChange={(e) => handleCheckboxChange('staircaseAdditionalServices', 'want entrance mats cleaned', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Want Entrance Mats Cleaned</span>
                      </label>

                      {/* Outdoor Sweeping */}
                      <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            name="staircaseAdditionalServices"
                            value="want outdoor sweeping"
                            checked={(formData.staircaseAdditionalServices as string[]).includes('want outdoor sweeping')}
                            onChange={(e) => handleCheckboxChange('staircaseAdditionalServices', 'want outdoor sweeping', e.target.checked)}
                            className="peer h-5 w-5 text-cyan-500 focus:ring-cyan-500 border-gray-300 rounded"
                          />
                        </div>
                        <span className="ml-3 text-sm text-gray-700 group-hover:text-cyan-600 transition-colors">Want Outdoor Sweeping</span>
                      </label>
                    </div>
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

          {/* Submit button for other services (non-Home Cleaning, non-Move-out Cleaning, non-Window Cleaning, non-Construction Cleaning, non-Floor Cleaning, non-Office Cleaning, non-Detail Cleaning, and non-Staircase Cleaning) */}
          {selectedService && selectedService !== 'Home Cleaning' && selectedService !== 'Move-out Cleaning' && selectedService !== 'Window Cleaning' && selectedService !== 'Construction Cleaning' && selectedService !== 'Floor Cleaning' && selectedService !== 'Office Cleaning' && selectedService !== 'Detail Cleaning' && selectedService !== 'Staircase Cleaning' && (
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

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
