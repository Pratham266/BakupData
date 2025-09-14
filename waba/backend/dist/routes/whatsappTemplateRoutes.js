"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WhatsAppTemplateController_1 = require("../controllers/WhatsAppTemplateController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.use(auth_1.authenticateToken);
router.post('/', WhatsAppTemplateController_1.WhatsAppTemplateController.createTemplate);
router.get('/', WhatsAppTemplateController_1.WhatsAppTemplateController.getUserTemplates);
router.get('/stats', WhatsAppTemplateController_1.WhatsAppTemplateController.getTemplateStats);
router.get('/:id', WhatsAppTemplateController_1.WhatsAppTemplateController.getTemplateById);
router.put('/:id', WhatsAppTemplateController_1.WhatsAppTemplateController.updateTemplate);
router.delete('/:id', WhatsAppTemplateController_1.WhatsAppTemplateController.deleteTemplate);
router.post('/:id/submit', WhatsAppTemplateController_1.WhatsAppTemplateController.submitToWhatsApp);
exports.default = router;
//# sourceMappingURL=whatsappTemplateRoutes.js.map