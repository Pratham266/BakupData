"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookController = void 0;
const whatsappService_1 = require("../services/whatsappService");
class WebhookController {
    testWebhook = async (req, res, next) => {
        try {
            const configStatus = whatsappService_1.whatsappService.getConfigStatus();
            res.status(200).json({
                success: true,
                message: 'Webhook configuration status',
                data: {
                    configured: whatsappService_1.whatsappService.isConfigured(),
                    phoneNumberId: configStatus.phoneNumberId,
                    accessToken: configStatus.accessToken,
                    webhookUrl: `${req.protocol}://${req.get('host')}/webhook`,
                    environment: process.env.NODE_ENV || 'development'
                }
            });
        }
        catch (error) {
            next(error);
        }
    };
    testMessage = async (req, res, next) => {
        try {
            const { phoneNumber, message } = req.body;
            if (!phoneNumber || !message) {
                res.status(400).json({
                    success: false,
                    error: 'Phone number and message are required'
                });
                return;
            }
            const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber.substring(1) : phoneNumber;
            const result = await whatsappService_1.whatsappService.sendTextMessage(formattedPhone, message);
            if (result.success) {
                res.status(200).json({
                    success: true,
                    message: 'WhatsApp message sent successfully',
                    data: result.data
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    error: result.error
                });
            }
        }
        catch (error) {
            next(error);
        }
    };
    getWebhookLogs = async (req, res, next) => {
        try {
            res.status(200).json({
                success: true,
                message: 'Webhook is active and receiving messages',
                data: {
                    status: 'active',
                    endpoint: '/webhook',
                    methods: ['GET', 'POST'],
                    verification: 'enabled',
                    signatureVerification: 'enabled'
                }
            });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.WebhookController = WebhookController;
//# sourceMappingURL=WebhookController.js.map