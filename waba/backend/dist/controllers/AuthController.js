"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    signup = async (req, res, next) => {
        try {
            const { fullName, companyName, businessEmail, password, phoneNumber, acceptedTerms } = req.body;
            const existingUser = await User_1.User.findOne({ businessEmail });
            if (existingUser) {
                const error = new Error('User with this business email already exists');
                error.statusCode = 400;
                throw error;
            }
            if (!acceptedTerms) {
                const error = new Error('You must accept the terms and conditions');
                error.statusCode = 400;
                throw error;
            }
            const user = await User_1.User.create({
                fullName,
                companyName,
                businessEmail,
                password,
                phoneNumber,
                acceptedTerms,
            });
            const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.businessEmail }, process.env.JWT_SECRET || 'your-super-secret-jwt-key-here', { expiresIn: '7d' });
            const userResponse = user.toJSON();
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    user: userResponse,
                    token,
                },
            });
        }
        catch (error) {
            next(error);
        }
    };
    login = async (req, res, next) => {
        try {
            const { businessEmail, password } = req.body;
            const user = await User_1.User.findOne({ businessEmail, isActive: true });
            if (!user) {
                const error = new Error('Invalid email or password');
                error.statusCode = 401;
                throw error;
            }
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                const error = new Error('Invalid email or password');
                error.statusCode = 401;
                throw error;
            }
            const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.businessEmail }, process.env.JWT_SECRET || 'your-super-secret-jwt-key-here', { expiresIn: '7d' });
            const userResponse = user.toJSON();
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    user: userResponse,
                    token,
                },
            });
        }
        catch (error) {
            next(error);
        }
    };
    getProfile = async (req, res, next) => {
        try {
            if (!req.user) {
                const error = new Error('User not authenticated');
                error.statusCode = 401;
                throw error;
            }
            res.status(200).json({
                success: true,
                data: req.user,
            });
        }
        catch (error) {
            next(error);
        }
    };
    updateProfile = async (req, res, next) => {
        try {
            if (!req.user) {
                const error = new Error('User not authenticated');
                error.statusCode = 401;
                throw error;
            }
            const { fullName, companyName, phoneNumber } = req.body;
            const updatedUser = await User_1.User.findByIdAndUpdate(req.user._id, { fullName, companyName, phoneNumber }, { new: true, runValidators: true }).select('-password');
            if (!updatedUser) {
                const error = new Error('User not found');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: updatedUser,
            });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map