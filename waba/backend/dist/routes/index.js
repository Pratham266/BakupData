"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const whatsappTemplateRoutes_1 = __importDefault(require("./whatsappTemplateRoutes"));
const router = (0, express_1.Router)();
const API_VERSION = '/v1';
router.get(`${API_VERSION}/health`, (req, res) => {
    res.json({
        success: true,
        message: 'API is running',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
    });
});
router.use(`${API_VERSION}/auth`, authRoutes_1.default);
router.use(`${API_VERSION}/templates`, whatsappTemplateRoutes_1.default);
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Waba API',
        version: '1.0.0',
        endpoints: {
            health: `${API_VERSION}/health`,
            auth: `${API_VERSION}/auth`,
            templates: `${API_VERSION}/templates`,
            webhook: '/webhook',
        },
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map