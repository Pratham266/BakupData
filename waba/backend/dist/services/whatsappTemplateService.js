"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppTemplateService = void 0;
const WhatsAppTemplate_1 = require("../models/WhatsAppTemplate");
class WhatsAppTemplateService {
    static async createTemplate(templateData, userId) {
        try {
            const existingTemplate = await WhatsAppTemplate_1.WhatsAppTemplateModel.findOne({
                name: templateData.name,
                created_by: userId
            });
            if (existingTemplate) {
                return {
                    success: false,
                    error: 'Template name already exists for this user'
                };
            }
            const template = new WhatsAppTemplate_1.WhatsAppTemplateModel({
                ...templateData,
                parameter_format: 'POSITIONAL',
                created_by: userId,
                status: 'PENDING'
            });
            const savedTemplate = await template.save();
            return {
                success: true,
                data: savedTemplate
            };
        }
        catch (error) {
            console.error('Error creating WhatsApp template:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }
    static async getUserTemplates(userId, page = 1, limit = 10, status, category) {
        try {
            const skip = (page - 1) * limit;
            const query = { created_by: userId };
            if (status)
                query.status = status;
            if (category)
                query.category = category;
            const total = await WhatsAppTemplate_1.WhatsAppTemplateModel.countDocuments(query);
            const templates = await WhatsAppTemplate_1.WhatsAppTemplateModel
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
        }
        catch (error) {
            console.error('Error fetching user templates:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }
    static async getTemplateById(templateId, userId) {
        try {
            const template = await WhatsAppTemplate_1.WhatsAppTemplateModel.findOne({
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
        }
        catch (error) {
            console.error('Error fetching template:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }
    static async updateTemplate(templateId, updateData, userId) {
        try {
            const template = await WhatsAppTemplate_1.WhatsAppTemplateModel.findOne({
                _id: templateId,
                created_by: userId
            });
            if (!template) {
                return {
                    success: false,
                    error: 'Template not found'
                };
            }
            if (!template.status || !['APPROVED', 'REJECTED', 'PAUSED'].includes(template.status)) {
                return {
                    success: false,
                    error: 'Template cannot be edited in its current status'
                };
            }
            const updatedTemplate = await WhatsAppTemplate_1.WhatsAppTemplateModel.findByIdAndUpdate(templateId, {
                ...updateData,
                updated_at: new Date()
            }, { new: true, runValidators: true });
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
        }
        catch (error) {
            console.error('Error updating template:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }
    static async deleteTemplate(templateId, userId) {
        try {
            const template = await WhatsAppTemplate_1.WhatsAppTemplateModel.findOne({
                _id: templateId,
                created_by: userId
            });
            if (!template) {
                return {
                    success: false,
                    error: 'Template not found'
                };
            }
            if (template.status === 'APPROVED') {
                return {
                    success: false,
                    error: 'Approved templates cannot be deleted'
                };
            }
            await WhatsAppTemplate_1.WhatsAppTemplateModel.findByIdAndDelete(templateId);
            return {
                success: true,
                data: true
            };
        }
        catch (error) {
            console.error('Error deleting template:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }
    static async submitToWhatsApp(templateId, userId, whatsappBusinessAccountId) {
        try {
            const template = await WhatsAppTemplate_1.WhatsAppTemplateModel.findOne({
                _id: templateId,
                created_by: userId
            });
            if (!template) {
                return {
                    success: false,
                    error: 'Template not found'
                };
            }
            const mockResponse = {
                id: `mock_${Date.now()}`,
                status: 'PENDING',
                category: template.category
            };
            await WhatsAppTemplate_1.WhatsAppTemplateModel.findByIdAndUpdate(templateId, {
                whatsapp_business_account_id: whatsappBusinessAccountId,
                status: 'PENDING'
            });
            return {
                success: true,
                data: mockResponse
            };
        }
        catch (error) {
            console.error('Error submitting template to WhatsApp:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }
    static async getTemplateStats(userId) {
        try {
            const stats = await WhatsAppTemplate_1.WhatsAppTemplateModel.aggregate([
                { $match: { created_by: userId } },
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 }
                    }
                }
            ]);
            const totalTemplates = await WhatsAppTemplate_1.WhatsAppTemplateModel.countDocuments({ created_by: userId });
            return {
                success: true,
                data: {
                    total: totalTemplates,
                    byStatus: stats.reduce((acc, stat) => {
                        acc[stat._id] = stat.count;
                        return acc;
                    }, {})
                }
            };
        }
        catch (error) {
            console.error('Error fetching template stats:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred'
            };
        }
    }
}
exports.WhatsAppTemplateService = WhatsAppTemplateService;
//# sourceMappingURL=whatsappTemplateService.js.map