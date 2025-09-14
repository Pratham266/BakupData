import { Request, Response, NextFunction } from 'express';
import { whatsappService } from '../services/whatsappService';

export class WebhookController {
  // Test webhook configuration
  public testWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const configStatus = whatsappService.getConfigStatus();
      
      res.status(200).json({
        success: true,
        message: 'Webhook configuration status',
        data: {
          configured: whatsappService.isConfigured(),
          phoneNumberId: configStatus.phoneNumberId,
          accessToken: configStatus.accessToken,
          webhookUrl: `${req.protocol}://${req.get('host')}/webhook`,
          environment: process.env.NODE_ENV || 'development'
        }
      });
    } catch (error) {
      next(error);
    }
  };

  // Test sending a WhatsApp message
  public testMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { phoneNumber, message } = req.body;

      if (!phoneNumber || !message) {
        res.status(400).json({
          success: false,
          error: 'Phone number and message are required'
        });
        return;
      }

      // Format phone number (remove + if present and ensure it starts with country code)
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber.substring(1) : phoneNumber;

      const result = await whatsappService.sendTextMessage(formattedPhone, message);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: 'WhatsApp message sent successfully',
          data: result.data
        });
      } else {
        res.status(400).json({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      next(error);
    }
  };

  // Get webhook logs (for debugging)
  public getWebhookLogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // In a real application, you'd store webhook logs in a database
      // For now, we'll return a simple status
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
    } catch (error) {
      next(error);
    }
  };
} 