import { Router, Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { WebhookController } from '../controllers/WebhookController';

// Extend Request interface to include raw body
interface WebhookRequest extends Request {
  rawBody?: Buffer;
}

// Middleware to capture raw body for signature verification
export const rawBodyMiddleware = (req: WebhookRequest, res: Response, next: NextFunction) => {
  console.log('🔍 Raw body middleware triggered');
  console.log('📋 Request headers:', req.headers);
  console.log('📋 Request method:', req.method);
  console.log('📋 Request URL:', req.url);
  console.log('📋 Content-Type:', req.headers['content-type']);
  console.log('📋 Content-Length:', req.headers['content-length']);
  
  let data = '';
  
  req.setEncoding('utf8');
  
  req.on('data', (chunk: string) => {
    console.log('📥 Received chunk:', chunk);
    data += chunk;
  });
  
  req.on('end', () => {
    console.log('📥 Total data received:', data);
    console.log('📥 Data length:', data.length);
    req.rawBody = Buffer.from(data, 'utf8');
    console.log('📥 Raw body stored:', req.rawBody.toString());
    console.log('📥 Raw body length:', req.rawBody.length);
    
    // Parse JSON body for easy access
    try {
      if (data.trim()) {
        req.body = JSON.parse(data);
        console.log('📥 Parsed JSON body:', req.body);
      } else {
        req.body = {};
        console.log('📥 Empty body, setting empty object');
      }
    } catch (error) {
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

// Verify WhatsApp webhook signature (supports both SHA1 and SHA256)
const verifySignature = (req: WebhookRequest, res: Response, next: NextFunction): void => {
  console.log('🔐 Signature verification started');
  
  // Check for both SHA1 and SHA256 signatures
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
  
  // Try SHA256 first, then fallback to SHA1
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
  
  // Remove signature prefix
  const signatureHash = signature.toString().replace(/^(sha256=|sha1=)/, '');
  console.log(`🔐 ${signatureType} signature hash:`, signatureHash);
  
  // Create expected signature
  let expectedSignature: string;
  if (signatureType === 'SHA256') {
    expectedSignature = crypto
      .createHmac('sha256', appSecret)
      .update(req.rawBody || '')
      .digest('hex');
  } else {
    expectedSignature = crypto
      .createHmac('sha1', appSecret)
      .update(req.rawBody || '')
      .digest('hex');
  }
  
  console.log(`🔐 Expected ${signatureType} signature:`, expectedSignature);
  console.log('🔐 Signatures match:', signatureHash === expectedSignature);
  
  // Compare signatures
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

const router = Router();
const webhookController = new WebhookController();

// WhatsApp webhook endpoints (required by WhatsApp Cloud API)
router.get('/', (req: Request, res: Response) => {
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
  
  // Check if mode is subscribe and token matches
  if (mode === 'subscribe' && token === verifyToken) {
    console.log('✅ Webhook verified successfully');
    res.status(200).send(challenge);
  } else {
    console.log('❌ Webhook verification failed');
    res.status(403).json({
      success: false,
      error: 'Verification failed'
    });
  }
});

router.post('/', rawBodyMiddleware, verifySignature, (req: WebhookRequest, res: Response) => {
  console.log('📱 POST /webhook - Message received');
  console.log('📋 Request body:', req.body);
  console.log('📋 Raw body:', req.rawBody?.toString());
  
  try {
    // Parse the webhook payload
    const payload = req.body;
    
    // Log the webhook payload
    console.log('📱 WhatsApp Webhook Payload:', JSON.stringify(payload, null, 2));
    
    // Check if it's a message event
    if (payload.object === 'whatsapp_business_account') {
      const entry = payload.entry?.[0];
      
      if (entry?.changes?.[0]?.value?.messages) {
        const messages = entry.changes[0].value.messages;
        
        console.log('📱 Processing messages:', messages.length);
        
        // Process each message
        messages.forEach((message: any, index: number) => {
          console.log(`📱 Message ${index + 1}:`, {
            from: message.from,
            timestamp: message.timestamp,
            type: message.type,
            id: message.id
          });
          
          // Handle different message types
          if (message.type === 'text') {
            console.log(`📱 Text message ${index + 1}:`, message.text?.body);
          } else if (message.type === 'image') {
            console.log(`📱 Image message ${index + 1}:`, message.image);
          } else if (message.type === 'document') {
            console.log(`📱 Document message ${index + 1}:`, message.document);
          }
        });
      } else {
        console.log('📱 No messages in payload');
      }
    } else {
      console.log('📱 Payload object type:', payload.object);
    }
    
    // Always return 200 OK to acknowledge receipt
    console.log('✅ Sending 200 OK response');
    res.status(200).json({
      success: true,
      message: 'Webhook received successfully'
    });
    
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    
    // Still return 200 to prevent WhatsApp from retrying
    res.status(200).json({
      success: false,
      error: 'Error processing webhook'
    });
  }
});

// Test and management endpoints (for development/testing)
router.get('/test', webhookController.testWebhook);
router.get('/status', webhookController.getWebhookLogs);
router.post('/send-test', webhookController.testMessage);

export default router; 