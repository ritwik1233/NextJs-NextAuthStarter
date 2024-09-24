import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  profileData: Object;
  password: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
  twoFactorEnabled?: {
    type: Boolean,
    default: false,
  },
  twoFactorSecret?: {
    type: String,
    default: '',
  },
  tempTwoFactorSecret?: {
    type: String,
    default: '',
  },
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileData: { 
    type: mongoose.Schema.Types.Mixed, 
    required: false, 
    default: {},
    blackbox: true 
  },
  resetToken: String,
  resetTokenExpiry: Date,
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  twoFactorSecret: {
    type: String,
    default: '',
  },
  tempTwoFactorSecret: {
    type: String,
    default: '',
  },
}, { timestamps: true });
UserSchema.index({ email: 1 });
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);