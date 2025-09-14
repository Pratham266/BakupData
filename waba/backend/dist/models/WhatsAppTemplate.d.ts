import mongoose, { Document } from 'mongoose';
import { WhatsAppTemplate } from '../types/whatsapp';
export interface IWhatsAppTemplate extends Document, Omit<WhatsAppTemplate, 'id'> {
}
export declare const WhatsAppTemplateModel: mongoose.Model<IWhatsAppTemplate, {}, {}, {}, mongoose.Document<unknown, {}, IWhatsAppTemplate, {}, {}> & IWhatsAppTemplate & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=WhatsAppTemplate.d.ts.map