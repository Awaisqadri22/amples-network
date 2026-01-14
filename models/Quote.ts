import mongoose, { Schema } from 'mongoose';

const QuoteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    userEmail: { type: String, lowercase: true, trim: true },
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    serviceType: { type: String, trim: true },
    selectedService: { type: String, trim: true },
    squareMeter: { type: String, trim: true },
    city: { type: String, trim: true },
    formType: { type: String, trim: true },
    status: { type: String, default: 'new' },
    source: { type: String, default: 'website' },
    details: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.models.Quote || mongoose.model('Quote', QuoteSchema);

