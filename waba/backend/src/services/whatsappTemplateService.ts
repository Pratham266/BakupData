import { WhatsAppTemplateModel, IWhatsAppTemplate } from '../models/WhatsAppTemplate';
import { 
  CreateTemplateRequest, 
  UpdateTemplateRequest, 
  TemplateListResponse,
  WhatsAppApiResponse,
  WhatsAppApiError 
} from '../types/whatsapp';
import { DatabaseResult } from '../types';

export class WhatsAppTemplateService {
  
  /**
   * Create a new WhatsApp template
   */
  static async createTemplate(
    templateData: CreateTemplateRequest,
    userId: string
  ): Promise<DatabaseResult<IWhatsAppTemplate>> {
    try {
      // Check if template name already exists for this user
      const existingTemplate = await WhatsAppTemplateModel.findOne({
        name: templateData.name,
        created_by: userId
      });

      if (existingTemplate) {
        return {
          success: false,
          error: 'Template name already exists for this user'
        };
      }

      // Create template with default values
      const template = new WhatsAppTemplateModel({
        ...templateData,
        parameter_format: 'POSITIONAL', // Default to POSITIONAL as requested
        created_by: userId,
        status: 'PENDING'
      });

      const savedTemplate = await template.save();
      
      return {
        success: true,
        data: savedTemplate
      };
    } catch (error) {
      console.error('Error creating WhatsApp template:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get templates for a specific user with pagination
   */
  static async getUserTemplates(
    userId: string,
    page: number = 1,
    limit: number = 10,
    status?: string,
    category?: string
  ): Promise<DatabaseResult<TemplateListResponse>> {
    try {
      const skip = (page - 1) * limit;
      
      // Build query
      const query: any = { created_by: userId };
      if (status) query.status = status;
      if (category) query.category = category;

      // Get total count
      const total = await WhatsAppTemplateModel.countDocuments(query);
      
      // Get templates
      const templates = await WhatsAppTemplateModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      const pages = Math.ceil(total / limit);

      return {
        success: true,
        data: {
          templates,
          total,
          page,
          limit,
          pages
        }
      };
    } catch (error) {
      console.error('Error fetching user templates:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get a single template by ID
   */
  static async getTemplateById(
    templateId: string,
    userId: string
  ): Promise<DatabaseResult<IWhatsAppTemplate>> {
    try {
      const template = await WhatsAppTemplateModel.findOne({
        _id: templateId,
        created_by: userId
      });

      if (!template) {
        return {
          success: false,
          error: 'Template not found'
        };
      }

      return {
        success: true,
        data: template
      };
    } catch (error) {
      console.error('Error fetching template:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Update an existing template
   */
  static async updateTemplate(
    templateId: string,
    updateData: UpdateTemplateRequest,
    userId: string
  ): Promise<DatabaseResult<IWhatsAppTemplate>> {
    try {
      const template = await WhatsAppTemplateModel.findOne({
        _id: templateId,
        created_by: userId
      });

      if (!template) {
        return {
          success: false,
          error: 'Template not found'
        };
      }

      // Check if template can be edited (only APPROVED, REJECTED, or PAUSED)
      if (!template.status || !['APPROVED', 'REJECTED', 'PAUSED'].includes(template.status)) {
        return {
          success: false,
          error: 'Template cannot be edited in its current status'
        };
      }

      // Update template
      const updatedTemplate = await WhatsAppTemplateModel.findByIdAndUpdate(
        templateId,
        {
          ...updateData,
          updated_at: new Date()
        },
        { new: true, runValidators: true }
      );

      if (!updatedTemplate) {
        return {
          success: false,
          error: 'Failed to update template'
        };
      }

      return {
        success: true,
        data: updatedTemplate
      };
    } catch (error) {
      console.error('Error updating template:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Delete a template
   */
  static async deleteTemplate(
    templateId: string,
    userId: string
  ): Promise<DatabaseResult<boolean>> {
    try {
      const template = await WhatsAppTemplateModel.findOne({
        _id: templateId,
        created_by: userId
      });

      if (!template) {
        return {
          success: false,
          error: 'Template not found'
        };
      }

      // Check if template can be deleted
      if (template.status === 'APPROVED') {
        return {
          success: false,
          error: 'Approved templates cannot be deleted'
        };
      }

      await WhatsAppTemplateModel.findByIdAndDelete(templateId);

      return {
        success: true,
        data: true
      };
    } catch (error) {
      console.error('Error deleting template:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Submit template to WhatsApp for approval
   * This would integrate with the actual WhatsApp Business Management API
   */
  static async submitToWhatsApp(
    templateId: string,
    userId: string,
    whatsappBusinessAccountId: string
  ): Promise<DatabaseResult<WhatsAppApiResponse>> {
    try {
      const template = await WhatsAppTemplateModel.findOne({
        _id: templateId,
        created_by: userId
      });

      if (!template) {
        return {
          success: false,
          error: 'Template not found'
        };
      }

      // Here you would make the actual API call to WhatsApp
      // For now, we'll simulate the response
      const mockResponse: WhatsAppApiResponse = {
        id: `mock_${Date.now()}`,
        status: 'PENDING',
        category: template.category
      };

      // Update template with WhatsApp ID and status
      await WhatsAppTemplateModel.findByIdAndUpdate(templateId, {
        whatsapp_business_account_id: whatsappBusinessAccountId,
        status: 'PENDING' as const
      });

      return {
        success: true,
        data: mockResponse
      };
    } catch (error) {
      console.error('Error submitting template to WhatsApp:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get template statistics for a user
   */
  static async getTemplateStats(userId: string): Promise<DatabaseResult<any>> {
    try {
      const stats = await WhatsAppTemplateModel.aggregate([
        { $match: { created_by: userId } },
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ]);

      const totalTemplates = await WhatsAppTemplateModel.countDocuments({ created_by: userId });

      return {
        success: true,
        data: {
          total: totalTemplates,
          byStatus: stats.reduce((acc: any, stat: any) => {
            acc[stat._id] = stat.count;
            return acc;
          }, {})
        }
      };
    } catch (error) {
      console.error('Error fetching template stats:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
} 