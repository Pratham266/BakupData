"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawBodyMiddleware = void 0;
const express_1 = require("express");
const crypto_1 = __importDefault(require("crypto"));
const WebhookController_1 = require("../controllers/WebhookController");
const rawBodyMiddleware = (req, res, next) => {
    console.log('🔍 Raw body middleware triggered');
    console.log('📋 Request headers:', req.headers);
    console.log('📋 Request method:', req.method);
    console.log('📋 Request URL:', req.url);
    console.log('📋 Content-Type:', req.headers['content-type']);
    console.log('📋 Content-Length:', req.headers['content-length']);
    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
        console.log('📥 Received chunk:', chunk);
        data += chunk;
    });
    req.on('end', () => {
        console.log('📥 Total data received:', data);
        console.log('📥 Data length:', data.length);
        req.rawBody = Buffer.from(data, 'utf8');
        console.log('📥 Raw body stored:', req.rawBody.toString());
        console.log('📥 Raw body length:', req.rawBody.length);
        try {
            if (data.trim()) {
                req.body = JSON.parse(data);
                console.log('📥 Parsed JSON body:', req.body);
            }
            else {
                req.body = {};
                console.log('📥 Empty body, setting empty object');
            }
        }
        catch (error) {
            console.error('❌ Error parsing JSON body:', error);
            req.body = {};
        }
        next();
    });
    req.on('error', (error) => {
        console.error('❌ Error reading request body:', error);
        next(error);
    });
};
exports.rawBodyMiddleware = rawBodyMiddleware;
const verifySignature = (req, res, next) => {
    console.log('🔐 Signature verification started');
    const signature256 = req.headers['x-hub-signature-256'];
    const signature1 = req.headers['x-hub-signature'];
    const appSecret = process.env.APP_SECRET;
    console.log('🔐 appSecret', appSecret);
    console.log('🔐 X-Hub-Signature-256:', signature256);
    console.log('🔐 X-Hub-Signature (SHA1):', signature1);
    console.log('🔐 APP_SECRET exists:', !!appSecret);
    console.log('🔐 Raw body exists:', !!req.rawBody);
    console.log('🔐 Raw body length:', req.rawBody?.length);
    if (!appSecret) {
        console.log('❌ Missing APP_SECRET');
        res.status(401).json({
            success: false,
            error: 'Missing app secret'
        });
        return;
    }
    let signature = signature256;
    let signatureType = 'SHA256';
    if (!signature && signature1) {
        signature = signature1;
        signatureType = 'SHA1';
        console.log('🔐 Using SHA1 signature as fallback');
    }
    if (!signature) {
        console.log('❌ No signature found in headers');
        res.status(401).json({
            success: false,
            error: 'No signature found'
        });
        return;
    }
    const signatureHash = signature.toString().replace(/^(sha256=|sha1=)/, '');
    console.log(`🔐 ${signatureType} signature hash:`, signatureHash);
    let expectedSignature;
    if (signatureType === 'SHA256') {
        expectedSignature = crypto_1.default
            .createHmac('sha256', appSecret)
            .update(req.rawBody || '')
            .digest('hex');
    }
    else {
        expectedSignature = crypto_1.default
            .createHmac('sha1', appSecret)
            .update(req.rawBody || '')
            .digest('hex');
    }
    console.log(`🔐 Expected ${signatureType} signature:`, expectedSignature);
    console.log('🔐 Signatures match:', signatureHash === expectedSignature);
    if (signatureHash !== expectedSignature) {
        console.log('❌ Invalid signature');
        res.status(401).json({
            success: false,
            error: 'Invalid signature'
        });
        return;
    }
    console.log(`✅ ${signatureType} signature verified successfully`);
    next();
};
const router = (0, express_1.Router)();
const webhookController = new WebhookController_1.WebhookController();
router.get('/', (req, res) => {
    console.log('🔗 GET /webhook - Webhook verification request');
    console.log('📋 Query params:', req.query);
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    const verifyToken = process.env.VERIFY_TOKEN;
    console.log('🔗 Mode:', mode);
    console.log('🔗 Token:', token);
    console.log('🔗 Challenge:', challenge);
    console.log('🔗 Verify Token from env:', verifyToken);
    if (mode === 'subscribe' && token === verifyToken) {
        console.log('✅ Webhook verified successfully');
        res.status(200).send(challenge);
    }
    else {
        console.log('❌ Webhook verification failed');
        res.status(403).json({
            success: false,
            error: 'Verification failed'
        });
    }
});
router.post('/', exports.rawBodyMiddleware, verifySignature, (req, res) => {
    console.log('📱 POST /webhook - Message received');
    console.log('📋 Request body:', req.body);
    console.log('📋 Raw body:', req.rawBody?.toString());
    try {
        const payload = req.body;
        console.log('📱 WhatsApp Webhook Payload:', JSON.stringify(payload, null, 2));
        if (payload.object === 'whatsapp_business_account') {
            const entry = payload.entry?.[0];
            if (entry?.changes?.[0]?.value?.messages) {
                const messages = entry.changes[0].value.messages;
                console.log('📱 Processing messages:', messages.length);
                messages.forEach((message, index) => {
                    console.log(`📱 Message ${index + 1}:`, {
                        from: message.from,
                        timestamp: message.timestamp,
                        type: message.type,
                        id: message.id
                    });
                    if (message.type === 'text') {
                        console.log(`📱 Text message ${index + 1}:`, message.text?.body);
                    }
                    else if (message.type === 'image') {
                        console.log(`📱 Image message ${index + 1}:`, message.image);
                    }
                    else if (message.type === 'document') {
                        console.log(`📱 Document message ${index + 1}:`, message.document);
                    }
                });
            }
            else {
                console.log('📱 No messages in payload');
            }
        }
        else {
            console.log('📱 Payload object type:', payload.object);
        }
        console.log('✅ Sending 200 OK response');
        res.status(200).json({
            success: true,
            message: 'Webhook received successfully'
        });
    }
    catch (error) {
        console.error('❌ Error processing webhook:', error);
        res.status(200).json({
            success: false,
            error: 'Error processing webhook'
        });
    }
});
router.get('/test', webhookController.testWebhook);
router.get('/status', webhookController.getWebhookLogs);
router.post('/send-test', webhookController.testMessage);
exports.default = router;
//# sourceMappingURL=webhookRoutes.js.map