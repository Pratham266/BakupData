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

class WhatsAppService {
  private phoneNumberId: string;
  private accessToken: string;
  private apiUrl: string;

  constructor() {
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || '';
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN || '';
    this.apiUrl = 'https://graph.facebook.com/v18.0';
  }

  private async makeRequest(endpoint: string, data: WhatsAppMessage): Promise<WhatsAppResponse> {
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

      const responseData = await response.json() as any;

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

    } catch (error) {
      console.error('WhatsApp Service Error:', error);
      return {
        success: false,
        error: 'Internal server error'
      };
    }
  }

  // Send text message
  async sendTextMessage(to: string, text: string): Promise<WhatsAppResponse> {
    const message: WhatsAppMessage = {
      messaging_product: 'whatsapp',
      to: to,
      type: 'text',
      text: {
        body: text
      }
    };

    return this.makeRequest('messages', message);
  }

  // Send image message
  async sendImageMessage(to: string, imageUrl: string, caption?: string): Promise<WhatsAppResponse> {
    const message: WhatsAppMessage = {
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

  // Send document message
  async sendDocumentMessage(to: string, documentUrl: string, filename?: string, caption?: string): Promise<WhatsAppResponse> {
    const message: WhatsAppMessage = {
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

  // Send template message
  async sendTemplateMessage(to: string, templateName: string, languageCode: string = 'en_US', components?: any[]): Promise<WhatsAppResponse> {
    const message: WhatsAppMessage = {
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
    } as any;

    return this.makeRequest('messages', message);
  }

  // Check if service is configured
  isConfigured(): boolean {
    return !!(this.phoneNumberId && this.accessToken);
  }

  // Get configuration status
  getConfigStatus(): { phoneNumberId: boolean; accessToken: boolean } {
    return {
      phoneNumberId: !!this.phoneNumberId,
      accessToken: !!this.accessToken
    };
  }
}

export const whatsappService = new WhatsAppService();
export type { WhatsAppMessage, WhatsAppResponse }; 