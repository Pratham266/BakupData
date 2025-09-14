import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    fullName: string;
    companyName: string;
    businessEmail: string;
    password: string;
    phoneNumber?: string;
    acceptedTerms: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.d.ts.map