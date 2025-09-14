"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsappService = void 0;
class WhatsAppService {
    phoneNumberId;
    accessToken;
    apiUrl;
    constructor() {
        this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
        this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN || '';
        this.apiUrl = 'https://graph.facebook.com/v18.0';
    }
    async makeRequest(endpoint, data) {
        try {
            const url = `${this.apiUrl}/${this.phoneNumberId}/messages`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if (!response.ok) {
                console.error('WhatsApp API Error:', responseData);
                return {
                    success: false,
                    error: responseData.error?.message || 'Failed to send WhatsApp message'
                };
            }
            return {
                success: true,
                data: responseData
            };
        }
        catch (error) {
            console.error('WhatsApp Service Error:', error);
            return {
                success: false,
                error: 'Internal server error'
            };
        }
    }
    async sendTextMessage(to, text) {
        const message = {
            messaging_product: 'whatsapp',
            to: to,
            type: 'text',
            text: {
                body: text
            }
        };
        return this.makeRequest('messages', message);
    }
    async sendImageMessage(to, imageUrl, caption) {
        const message = {
            messaging_product: 'whatsapp',
            to: to,
            type: 'image',
            image: {
                link: imageUrl,
                caption: caption
            }
        };
        return this.makeRequest('messages', message);
    }
    async sendDocumentMessage(to, documentUrl, filename, caption) {
        const message = {
            messaging_product: 'whatsapp',
            to: to,
            type: 'document',
            document: {
                link: documentUrl,
                filename: filename,
                caption: caption
            }
        };
        return this.makeRequest('messages', message);
    }
    async sendTemplateMessage(to, templateName, languageCode = 'en_US', components) {
        const message = {
            messaging_product: 'whatsapp',
            to: to,
            type: 'template',
            template: {
                name: templateName,
                language: {
                    code: languageCode
                },
                components: components
            }
        };
        return this.makeRequest('messages', message);
    }
    isConfigured() {
        return !!(this.phoneNumberId && this.accessToken);
    }
    getConfigStatus() {
        return {
            phoneNumberId: !!this.phoneNumberId,
            accessToken: !!this.accessToken
        };
    }
}
exports.whatsappService = new WhatsAppService();
//# sourceMappingURL=whatsappService.js.map