import { IWhatsAppTemplate } from '../models/WhatsAppTemplate';
import { CreateTemplateRequest, UpdateTemplateRequest, TemplateListResponse, WhatsAppApiResponse } from '../types/whatsapp';
import { DatabaseResult } from '../types';
export declare class WhatsAppTemplateService {
    static createTemplate(templateData: CreateTemplateRequest, userId: string): Promise<DatabaseResult<IWhatsAppTemplate>>;
    static getUserTemplates(userId: string, page?: number, limit?: number, status?: string, category?: string): Promise<DatabaseResult<TemplateListResponse>>;
    static getTemplateById(templateId: string, userId: string): Promise<DatabaseResult<IWhatsAppTemplate>>;
    static updateTemplate(templateId: string, updateData: UpdateTemplateRequest, userId: string): Promise<DatabaseResult<IWhatsAppTemplate>>;
    static deleteTemplate(templateId: string, userId: string): Promise<DatabaseResult<boolean>>;
    static submitToWhatsApp(templateId: string, userId: string, whatsappBusinessAccountId: string): Promise<DatabaseResult<WhatsAppApiResponse>>;
    static getTemplateStats(userId: string): Promise<DatabaseResult<any>>;
}
//# sourceMappingURL=whatsappTemplateService.d.ts.map