export interface WhatsAppTemplateComponent {
    type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
    format?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
    text?: string;
    example?: {
        header_text?: string[][];
        body_text?: string[][];
        footer_text?: string[];
    };
    buttons?: WhatsAppTemplateButton[];
}
export interface WhatsAppTemplateButton {
    type: 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER' | 'OTP' | 'MPM' | 'CATALOG' | 'FLOW' | 'VOICE_CALL' | 'APP';
    text: string;
    url?: string;
    phone_number?: string;
}
export interface WhatsAppTemplate {
    id?: string;
    name: string;
    category: WhatsAppTemplateCategory;
    parameter_format: 'POSITIONAL' | 'NAMED';
    language: string;
    components: WhatsAppTemplateComponent[];
    status?: WhatsAppTemplateStatus;
    whatsapp_business_account_id?: string;
    created_by: string;
    created_at?: Date;
    updated_at?: Date;
}
export type WhatsAppTemplateCategory = 'AUTHENTICATION' | 'MARKETING' | 'UTILITY' | 'ACCOUNT_UPDATE' | 'ALERT_UPDATE' | 'APPOINTMENT_UPDATE' | 'AUTO_REPLY' | 'ISSUE_RESOLUTION' | 'PAYMENT_UPDATE' | 'PERSONAL_FINANCE_UPDATE' | 'RESERVATION_UPDATE' | 'SHIPPING_UPDATE' | 'TICKET_UPDATE' | 'TRANSPORTATION_UPDATE';
export type WhatsAppTemplateStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAUSED' | 'PENDING_DELETION';
export interface CreateTemplateRequest {
    name: string;
    category: WhatsAppTemplateCategory;
    language: string;
    components: WhatsAppTemplateComponent[];
}
export interface UpdateTemplateRequest {
    category?: WhatsAppTemplateCategory;
    components?: WhatsAppTemplateComponent[];
}
export interface TemplateListResponse {
    templates: WhatsAppTemplate[];
    total: number;
    page: number;
    limit: number;
    pages: number;
}
export interface WhatsAppApiResponse {
    id: string;
    status: WhatsAppTemplateStatus;
    category: WhatsAppTemplateCategory;
}
export interface WhatsAppApiError {
    error: {
        message: string;
        type: string;
        code: number;
        fbtrace_id: string;
    };
}
//# sourceMappingURL=whatsapp.d.ts.map