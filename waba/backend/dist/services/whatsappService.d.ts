interface WhatsAppMessage {
    messaging_product: string;
    to: string;
    type: string;
    text?: {
        body: string;
    };
    image?: {
        id?: string;
        link?: string;
        caption?: string;
    };
    document?: {
        id?: string;
        link?: string;
        caption?: string;
        filename?: string;
    };
}
interface WhatsAppResponse {
    success: boolean;
    data?: any;
    error?: string;
}
declare class WhatsAppService {
    private phoneNumberId;
    private accessToken;
    private apiUrl;
    constructor();
    private makeRequest;
    sendTextMessage(to: string, text: string): Promise<WhatsAppResponse>;
    sendImageMessage(to: string, imageUrl: string, caption?: string): Promise<WhatsAppResponse>;
    sendDocumentMessage(to: string, documentUrl: string, filename?: string, caption?: string): Promise<WhatsAppResponse>;
    sendTemplateMessage(to: string, templateName: string, languageCode?: string, components?: any[]): Promise<WhatsAppResponse>;
    isConfigured(): boolean;
    getConfigStatus(): {
        phoneNumberId: boolean;
        accessToken: boolean;
    };
}
export declare const whatsappService: WhatsAppService;
export type { WhatsAppMessage, WhatsAppResponse };
//# sourceMappingURL=whatsappService.d.ts.map