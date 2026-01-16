import mongoose, { Schema } from 'mongoose';

const QuoteSchema = new Schema(
  {
    // User reference and basic contact info
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    userEmail: { type: String, lowercase: true, trim: true },
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true },
    
    // Service information
    serviceType: { type: String, trim: true },
    selectedService: { type: String, trim: true },
    squareMeter: { type: String, trim: true },
    city: { type: String, trim: true },
    formType: { type: String, trim: true, enum: ['private', 'company'] },
    company: { type: String, trim: true },
    vatNumber: { type: String, trim: true },
    message: { type: String, trim: true },
    
    // Common fields for all services
    homeType: { type: String, trim: true },
    cleanAll: { type: String, trim: true },
    areaSize: { type: String, trim: true },
    frequency: { type: String, trim: true },
    preferredDateTime: { type: Date },
    numberOfRooms: { type: String, default: '0' },
    bedroom: { type: String, default: '0' },
    kitchen: { type: String, default: '0' },
    livingRoom: { type: String, default: '0' },
    floors: { type: String, trim: true },
    hasPets: { type: String, trim: true },
    comments: { type: String, trim: true },
    
    // Move-out Cleaning specific fields
    moveOutCleaningDate: { type: Date },
    isDateFlexible: { type: String, trim: true },
    dateFlexibilityRange: { type: String, trim: true },
    
    // Window Cleaning specific fields
    windowCleaningDate: { type: Date },
    windowsWithBars: { type: String, default: '0' },
    windowsWithoutBars: { type: String, default: '0' },
    topHungWindows: { type: String, default: '0' },
    windowType: [{ type: String }],
    hasGlazedBalcony: { type: String, trim: true },
    windowFloors: { type: String, trim: true },
    needsLadder: { type: String, trim: true },
    
    // Construction Cleaning specific fields
    constructionWorkType: [{ type: String }],
    constructionCleaningIncludes: [{ type: String }],
    constructionCleaningDate: { type: Date },
    constructionHomeType: { type: String, trim: true },
    constructionAreaSize: { type: String, trim: true },
    constructionFloors: { type: String, trim: true },
    
    // Floor Cleaning specific fields
    floorCleaningDate: { type: Date },
    floorCleaningIsDateFlexible: { type: String, trim: true },
    floorCleaningServices: [{ type: String }],
    floorCleaningTypes: [{ type: String }],
    
    // Office Cleaning specific fields
    officePremisesType: { type: String, trim: true },
    officeCleanAll: { type: String, trim: true },
    officeAreaSize: { type: String, trim: true },
    officeFrequency: { type: String, trim: true },
    officePreferredDateTime: { type: Date },
    officeSpace: { type: String, default: '0' },
    kitchenSpace: { type: String, default: '0' },
    diningRoom: { type: String, default: '0' },
    meetingRoom: { type: String, default: '0' },
    dressingRoom: { type: String, default: '0' },
    toilet: { type: String, default: '0' },
    otherRooms: { type: String, default: '0' },
    officeFloors: { type: String, trim: true },
    officeEntranceFloor: { type: String, trim: true },
    officeHasElevator: { type: String, trim: true },
    officeAdditionalServices: [{ type: String }],
    
    // Detail Cleaning specific fields
    detailHomeType: { type: String, trim: true },
    detailCleanAll: { type: String, trim: true },
    detailAreaSize: { type: String, trim: true },
    detailFrequency: { type: String, trim: true },
    detailPreferredDay: { type: String, trim: true },
    detailPreferredTime: { type: String, trim: true },
    detailBedroom: { type: String, default: '0' },
    detailKitchen: { type: String, default: '0' },
    detailBathroom: { type: String, default: '0' },
    detailLivingRoom: { type: String, default: '0' },
    detailOtherRooms: { type: String, default: '0' },
    detailFloors: { type: String, trim: true },
    detailAdditionalCleaning: [{ type: String }],
    
    // Staircase Cleaning specific fields
    staircaseFrequency: { type: String, trim: true },
    staircasePreferredDay: { type: String, trim: true },
    staircasePreferredTime: { type: String, trim: true },
    staircaseProperties: { type: String, trim: true },
    staircaseStairwells: { type: String, trim: true },
    staircaseFloors: { type: String, trim: true },
    staircaseAdditionalCleaning: [{ type: String }],
    staircaseAdditionalServices: [{ type: String }],
    
    // Metadata
    status: { type: String, default: 'new', enum: ['new', 'contacted', 'quoted', 'accepted', 'rejected'] },
    source: { type: String, default: 'website' },
    details: { type: Schema.Types.Mixed }, // Keep for backward compatibility and any extra data
  },
  { timestamps: true }
);

export default mongoose.models.Quote || mongoose.model('Quote', QuoteSchema);

