import { Router } from 'express';
import { WhatsAppTemplateController } from '../controllers/WhatsAppTemplateController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Create a new template
router.post('/', WhatsAppTemplateController.createTemplate);

// Get all templates for the authenticated user
router.get('/', WhatsAppTemplateController.getUserTemplates);

// Get template statistics
router.get('/stats', WhatsAppTemplateController.getTemplateStats);

// Get a specific template by ID
router.get('/:id', WhatsAppTemplateController.getTemplateById);

// Update a template
router.put('/:id', WhatsAppTemplateController.updateTemplate);

// Delete a template
router.delete('/:id', WhatsAppTemplateController.deleteTemplate);

// Submit template to WhatsApp
router.post('/:id/submit', WhatsAppTemplateController.submitToWhatsApp);

export default router; 