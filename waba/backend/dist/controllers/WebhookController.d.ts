import { Request, Response, NextFunction } from 'express';
export declare class WebhookController {
    testWebhook: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    testMessage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getWebhookLogs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=WebhookController.d.ts.map