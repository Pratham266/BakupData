"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const authController = new AuthController_1.AuthController();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile', auth_1.authenticateToken, authController.getProfile);
router.put('/profile', auth_1.authenticateToken, authController.updateProfile);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map