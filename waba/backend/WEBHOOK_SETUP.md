# WhatsApp Webhook Setup Guide

This guide explains how to set up and test the WhatsApp webhook integration for the Waba backend.

## Overview

The webhook system handles incoming WhatsApp messages and provides endpoints for:

- Webhook verification (required by WhatsApp Cloud API)
- Message reception and processing
- Testing message sending
- Configuration status checking

## Environment Variables

Add these variables to your `.env` file:

```env
# WhatsApp Webhook Configuration
VERIFY_TOKEN=your-custom-verify-token-here
APP_SECRET=your-whatsapp-app-secret-here

# WhatsApp API Configuration
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id-here
WHATSAPP_ACCESS_TOKEN=your-access-token-here
```

## WhatsApp Cloud API Setup

### 1. Create a Meta App

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create a new app or use existing one
3. Add WhatsApp Business API product

### 2. Configure Webhook

1. In your app dashboard, go to WhatsApp > Configuration
2. Set webhook URL: `https://yourdomain.com/webhook`
3. Set verify token (same as VERIFY_TOKEN in .env)
4. Subscribe to messages and messaging_postbacks

### 3. Get Credentials

1. **Phone Number ID**: Found in WhatsApp > Configuration
2. **Access Token**: Generate in WhatsApp > Configuration
3. **App Secret**: Found in App Settings > Basic

## API Endpoints

### Webhook Verification (WhatsApp Cloud API)

- **GET** `/webhook` - Webhook verification endpoint
- **POST** `/webhook` - Receives incoming messages

### Test and Management

- **GET** `/webhook/test` - Check webhook configuration
- **GET** `/webhook/status` - Get webhook status
- **POST** `/webhook/send-test` - Send test message

## Testing the Webhook

### 1. Test Configuration

```bash
curl http://localhost:5001/webhook/test
```

Expected response:

```json
{
  "success": true,
  "message": "Webhook configuration status",
  "data": {
    "configured": true,
    "phoneNumberId": true,
    "accessToken": true,
    "webhookUrl": "http://localhost:5001/webhook",
    "environment": "development"
  }
}
```

### 2. Test Message Sending

```bash
curl -X POST http://localhost:5001/webhook/send-test \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "1234567890",
    "message": "Hello from Waba!"
  }'
```

### 3. Test Webhook Status

```bash
curl http://localhost:5001/webhook/status
```

## Webhook Verification Process

1. **WhatsApp sends verification request**:

   ```
   GET /webhook?hub.mode=subscribe&hub.verify_token=YOUR_TOKEN&hub.challenge=CHALLENGE_STRING
   ```

2. **Your server responds**:

   - If `hub.verify_token` matches `VERIFY_TOKEN` → Return `hub.challenge`
   - If not → Return HTTP 403

3. **WhatsApp confirms subscription** and starts sending messages

## Message Processing

### Incoming Message Flow

1. WhatsApp sends POST to `/webhook`
2. Server verifies `X-Hub-Signature-256` header
3. Server processes message payload
4. Server logs message details
5. Server returns HTTP 200 (acknowledgment)

### Message Types Supported

- **Text messages**: `message.type === 'text'`
- **Image messages**: `message.type === 'image'`
- **Document messages**: `message.type === 'document'`

## Security Features

### Signature Verification

- Uses `APP_SECRET` to verify message authenticity
- Prevents unauthorized message injection
- Implements WhatsApp's recommended security

### Raw Body Processing

- Captures raw request body for signature verification
- Ensures accurate signature calculation
- Handles binary and text content

## Error Handling

### Webhook Verification Failures

- Returns HTTP 403 for invalid tokens
- Logs verification attempts
- Provides clear error messages

### Message Processing Errors

- Always returns HTTP 200 to prevent retries
- Logs errors for debugging
- Continues processing other messages

## Development vs Production

### Development

- Use ngrok for local testing
- Set webhook URL to ngrok URL
- Test with WhatsApp Business API sandbox

### Production

- Use HTTPS domain
- Set proper environment variables
- Monitor webhook logs
- Implement message persistence

## Troubleshooting

### Common Issues

1. **Webhook verification fails**

   - Check `VERIFY_TOKEN` matches WhatsApp configuration
   - Ensure webhook URL is accessible
   - Verify server is running

2. **Signature verification fails**

   - Check `APP_SECRET` is correct
   - Ensure raw body middleware is working
   - Verify request headers

3. **Messages not received**
   - Check webhook subscription status
   - Verify phone number is approved
   - Check server logs for errors

### Debug Commands

```bash
# Check webhook configuration
curl http://localhost:5001/webhook/test

# Test message sending
curl -X POST http://localhost:5001/webhook/send-test \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "1234567890", "message": "Test"}'

# Check server logs
tail -f backend/logs/app.log
```

## Next Steps

1. **Message Persistence**: Store messages in MongoDB
2. **Auto-replies**: Implement automated responses
3. **Message Templates**: Use WhatsApp message templates
4. **Analytics**: Track message metrics
5. **Integration**: Connect with user management system

## Support

For issues with:

- **Webhook setup**: Check this guide and WhatsApp documentation
- **API integration**: Review WhatsApp Cloud API docs
- **Backend issues**: Check server logs and configuration
