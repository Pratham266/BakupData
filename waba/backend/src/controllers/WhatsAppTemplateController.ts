import { Request, Response } from 'express';
import { WhatsAppTemplateService } from '../services/whatsappTemplateService';
import { AuthenticatedRequest, ApiResponse } from '../types';
import { CreateTemplateRequest, UpdateTemplateRequest } from '../types/whatsapp';

export class WhatsAppTemplateController {
  
  /**
   * Create a new WhatsApp template
   */
  static async createTemplate(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
        return;
      }

      const templateData: CreateTemplateRequest = req.body;

      // Validate required fields
      if (!templateData.name || !templateData.category || !templateData.language || !templateData.components) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields: name, category, language, components'
        });
        return;
      }

      const result = await WhatsAppTemplateService.createTemplate(templateData, userId);

      if (!result.success) {
        res.status(400).json({
          success: false,
          message: result.error
        });
        return;
      }

      res.status(201).json({
        success: true,
        message: 'Template created successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Error in createTemplate controller:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      });
    }
  }

  /**
   * Get templates for the authenticated user
   */
  static async getUserTemplates(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
        return;
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string;
      const category = req.query.category as string;

      const result = await WhatsAppTemplateService.getUserTemplates(userId, page, limit, status, category);

      if (!result.success) {
        res.status(400).json({
          success: false,
          message: result.error
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Error in getUserTemplates controller:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      });
    }
  }

  /**
   * Get a single template by ID
   */
  static async getTemplateById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
        return;
      }

      const templateId = req.params.id;
      if (!templateId) {
        res.status(400).json({
          success: false,
          message: 'Template ID is required'
        });
        return;
      }

      const result = await WhatsAppTemplateService.getTemplateById(templateId, userId);

      if (!result.success) {
        res.status(404).json({
          success: false,
          message: result.error
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Error in getTemplateById controller:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      });
    }
  }

  /**
   * Update an existing template
   */
  static async updateTemplate(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
        return;
      }

      const templateId = req.params.id;
      if (!templateId) {
        res.status(400).json({
          success: false,
          message: 'Template ID is required'
        });
        return;
      }

      const updateData: UpdateTemplateRequest = req.body;

      const result = await WhatsAppTemplateService.updateTemplate(templateId, updateData, userId);

      if (!result.success) {
        res.status(400).json({
          success: false,
          message: result.error
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Template updated successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Error in updateTemplate controller:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      });
    }
  }

  /**
   * Delete a template
   */
  static async deleteTemplate(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
        return;
      }

      const templateId = req.params.id;
      if (!templateId) {
        res.status(400).json({
          success: false,
          message: 'Template ID is required'
        });
        return;
      }

      const result = await WhatsAppTemplateService.deleteTemplate(templateId, userId);

      if (!result.success) {
        res.status(400).json({
          success: false,
          message: result.error
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Template deleted successfully'
      });
    } catch (error) {
      console.error('Error in deleteTemplate controller:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      });
    }
  }

  /**
   * Submit template to WhatsApp for approval
   */
  static async submitToWhatsApp(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
        return;
      }

      const templateId = req.params.id;
      if (!templateId) {
        res.status(400).json({
          success: false,
          message: 'Template ID is required'
        });
        return;
      }

      const { whatsapp_business_account_id } = req.body;
      if (!whatsapp_business_account_id) {
        res.status(400).json({
          success: false,
          message: 'WhatsApp Business Account ID is required'
        });
        return;
      }

      const result = await WhatsAppTemplateService.submitToWhatsApp(
        templateId, 
        userId, 
        whatsapp_business_account_id
      );

      if (!result.success) {
        res.status(400).json({
          success: false,
          message: result.error
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Template submitted to WhatsApp successfully',
        data: result.data
      });
    } catch (error) {
      console.error('Error in submitToWhatsApp controller:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      });
    }
  }

  /**
   * Get template statistics for the authenticated user
   */
  static async getTemplateStats(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'User not authenticated'
        });
        return;
      }

      const result = await WhatsAppTemplateService.getTemplateStats(userId);

      if (!result.success) {
        res.status(400).json({
          success: false,
          message: result.error
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: result.data
      });
    } catch (error) {
      console.error('Error in getTemplateStats controller:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: {
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        }
      });
    }
  }
} 