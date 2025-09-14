import { Request, Response, NextFunction } from 'express';
interface WebhookRequest extends Request {
    rawBody?: Buffer;
}
export declare const rawBodyMiddleware: (req: WebhookRequest, res: Response, next: NextFunction) => void;
declare const router: import("express-serve-static-core").Router;
export default router;
//# sourceMappingURL=webhookRoutes.d.ts.map