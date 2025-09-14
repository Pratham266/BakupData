import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
export declare class WhatsAppTemplateController {
    static createTemplate(req: AuthenticatedRequest, res: Response): Promise<void>;
    static getUserTemplates(req: AuthenticatedRequest, res: Response): Promise<void>;
    static getTemplateById(req: AuthenticatedRequest, res: Response): Promise<void>;
    static updateTemplate(req: AuthenticatedRequest, res: Response): Promise<void>;
    static deleteTemplate(req: AuthenticatedRequest, res: Response): Promise<void>;
    static submitToWhatsApp(req: AuthenticatedRequest, res: Response): Promise<void>;
    static getTemplateStats(req: AuthenticatedRequest, res: Response): Promise<void>;
}
//# sourceMappingURL=WhatsAppTemplateController.d.ts.map