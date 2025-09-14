import { Router } from 'express';
import authRoutes from './authRoutes';
import whatsappTemplateRoutes from './whatsappTemplateRoutes';

const router = Router();

// API version prefix
const API_VERSION = '/v1';

// Health check route
router.get(`${API_VERSION}/health`, (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Mount route modules
router.use(`${API_VERSION}/auth`, authRoutes);
router.use(`${API_VERSION}/templates`, whatsappTemplateRoutes);

// Default route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Waba API',
    version: '1.0.0',
          endpoints: {
        health: `${API_VERSION}/health`,
        auth: `${API_VERSION}/auth`,
        templates: `${API_VERSION}/templates`,
        webhook: '/webhook', // Note: webhook is at root level
      },
  });
});

export default router; 