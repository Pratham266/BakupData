"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            const error = new Error('Access token required');
            error.statusCode = 401;
            throw error;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key-here');
        const user = await User_1.User.findById(decoded.userId).select('-password');
        if (!user || !user.isActive) {
            const error = new Error('User not found or inactive');
            error.statusCode = 401;
            throw error;
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            const jwtError = new Error('Invalid token');
            jwtError.statusCode = 401;
            next(jwtError);
        }
        else {
            next(error);
        }
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth.js.map