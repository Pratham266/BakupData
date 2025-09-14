"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppTemplateController = void 0;
const whatsappTemplateService_1 = require("../services/whatsappTemplateService");
class WhatsAppTemplateController {
    static async createTemplate(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
                return;
            }
            const templateData = req.body;
            if (!templateData.name || !templateData.category || !templateData.language || !templateData.components) {
                res.status(400).json({
                    success: false,
                    message: 'Missing required fields: name, category, language, components'
                });
                return;
            }
            const result = await whatsappTemplateService_1.WhatsAppTemplateService.createTemplate(templateData, userId);
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
        }
        catch (error) {
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
    static async getUserTemplates(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
                return;
            }
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const status = req.query.status;
            const category = req.query.category;
            const result = await whatsappTemplateService_1.WhatsAppTemplateService.getUserTemplates(userId, page, limit, status, category);
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
        }
        catch (error) {
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
    static async getTemplateById(req, res) {
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
            const result = await whatsappTemplateService_1.WhatsAppTemplateService.getTemplateById(templateId, userId);
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
        }
        catch (error) {
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
    static async updateTemplate(req, res) {
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
            const updateData = req.body;
            const result = await whatsappTemplateService_1.WhatsAppTemplateService.updateTemplate(templateId, updateData, userId);
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
        }
        catch (error) {
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
    static async deleteTemplate(req, res) {
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
            const result = await whatsappTemplateService_1.WhatsAppTemplateService.deleteTemplate(templateId, userId);
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
        }
        catch (error) {
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
    static async submitToWhatsApp(req, res) {
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
            const result = await whatsappTemplateService_1.WhatsAppTemplateService.submitToWhatsApp(templateId, userId, whatsapp_business_account_id);
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
        }
        catch (error) {
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
    static async getTemplateStats(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: 'User not authenticated'
                });
                return;
            }
            const result = await whatsappTemplateService_1.WhatsAppTemplateService.getTemplateStats(userId);
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
        }
        catch (error) {
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
exports.WhatsAppTemplateController = WhatsAppTemplateController;
//# sourceMappingURL=WhatsAppTemplateController.js.map