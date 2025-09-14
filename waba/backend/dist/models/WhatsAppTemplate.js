"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppTemplateModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const buttonSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
        enum: ['QUICK_REPLY', 'URL', 'PHONE_NUMBER', 'OTP', 'MPM', 'CATALOG', 'FLOW', 'VOICE_CALL', 'APP']
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                if (this.type === 'URL') {
                    return /^https?:\/\/.+/.test(v);
                }
                return true;
            },
            message: 'URL is required and must be valid for URL button type'
        }
    },
    phone_number: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                if (this.type === 'PHONE_NUMBER') {
                    return /^[\+]?[1-9][\d]{0,15}$/.test(v);
                }
                return true;
            },
            message: 'Phone number is required and must be valid for PHONE_NUMBER button type'
        }
    }
});
const componentSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
        enum: ['HEADER', 'BODY', 'FOOTER', 'BUTTONS']
    },
    format: {
        type: String,
        enum: ['TEXT', 'IMAGE', 'VIDEO', 'DOCUMENT'],
        default: 'TEXT'
    },
    text: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                if (this.type === 'HEADER' || this.type === 'BODY') {
                    return Boolean(v && v.length > 0);
                }
                return true;
            },
            message: 'Text is required for HEADER and BODY components'
        }
    },
    example: {
        header_text: [[String]],
        body_text: [[String]],
        footer_text: [String]
    },
    buttons: [buttonSchema]
});
const whatsappTemplateSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Template name is required'],
        trim: true,
        maxlength: [512, 'Template name cannot exceed 512 characters'],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9_-]+$/.test(v);
            },
            message: 'Template name can only contain letters, numbers, underscores, and hyphens'
        }
    },
    category: {
        type: String,
        required: [true, 'Template category is required'],
        enum: [
            'AUTHENTICATION', 'MARKETING', 'UTILITY', 'ACCOUNT_UPDATE',
            'ALERT_UPDATE', 'APPOINTMENT_UPDATE', 'AUTO_REPLY',
            'ISSUE_RESOLUTION', 'PAYMENT_UPDATE', 'PERSONAL_FINANCE_UPDATE',
            'RESERVATION_UPDATE', 'SHIPPING_UPDATE', 'TICKET_UPDATE',
            'TRANSPORTATION_UPDATE'
        ]
    },
    parameter_format: {
        type: String,
        required: true,
        enum: ['POSITIONAL', 'NAMED'],
        default: 'POSITIONAL'
    },
    language: {
        type: String,
        required: [true, 'Template language is required'],
        trim: true,
        validate: {
            validator: function (v) {
                return /^[a-z]{2}_[A-Z]{2}$/.test(v);
            },
            message: 'Language must be in format: en_US, es_ES, etc.'
        }
    },
    components: {
        type: [componentSchema],
        required: [true, 'Template must have at least one component'],
        validate: {
            validator: function (components) {
                if (!components || components.length === 0)
                    return false;
                const bodyComponents = components.filter(c => c.type === 'BODY');
                if (bodyComponents.length !== 1)
                    return false;
                const bodyComponent = bodyComponents[0];
                if (!bodyComponent.text || bodyComponent.text.trim().length === 0)
                    return false;
                return true;
            },
            message: 'Template must have exactly one BODY component with text content'
        }
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'REJECTED', 'PAUSED', 'PENDING_DELETION'],
        default: 'PENDING'
    },
    whatsapp_business_account_id: {
        type: String,
        trim: true
    },
    created_by: {
        type: String,
        ref: 'User',
        required: [true, 'Template creator is required']
    }
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
});
whatsappTemplateSchema.index({ name: 1, language: 1 });
whatsappTemplateSchema.index({ category: 1 });
whatsappTemplateSchema.index({ status: 1 });
whatsappTemplateSchema.index({ created_by: 1 });
whatsappTemplateSchema.index({ created_at: -1 });
whatsappTemplateSchema.index({ name: 1, created_by: 1 }, { unique: true });
exports.WhatsAppTemplateModel = mongoose_1.default.model('WhatsAppTemplate', whatsappTemplateSchema);
//# sourceMappingURL=WhatsAppTemplate.js.map