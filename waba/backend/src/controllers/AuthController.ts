import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/User';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: IUser;
}

export class AuthController {
  // User signup
  public signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { fullName, companyName, businessEmail, password, phoneNumber, acceptedTerms } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ businessEmail });
      if (existingUser) {
        const error = new Error('User with this business email already exists') as any;
        error.statusCode = 400;
        throw error;
      }

      // Validate terms acceptance
      if (!acceptedTerms) {
        const error = new Error('You must accept the terms and conditions') as any;
        error.statusCode = 400;
        throw error;
      }

      // Create new user
      const user = await User.create({
        fullName,
        companyName,
        businessEmail,
        password,
        phoneNumber,
        acceptedTerms,
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.businessEmail },
        process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
        { expiresIn: '7d' }
      );

      // Remove password from response
      const userResponse = user.toJSON();

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: userResponse,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  // User login
  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { businessEmail, password } = req.body;

      // Find user by email
      const user = await User.findOne({ businessEmail, isActive: true });
      if (!user) {
        const error = new Error('Invalid email or password') as any;
        error.statusCode = 401;
        throw error;
      }

      // Check password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        const error = new Error('Invalid email or password') as any;
        error.statusCode = 401;
        throw error;
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.businessEmail },
        process.env.JWT_SECRET || 'your-super-secret-jwt-key-here',
        { expiresIn: '7d' }
      );

      // Remove password from response
      const userResponse = user.toJSON();

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: userResponse,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  // Get current user profile
  public getProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        const error = new Error('User not authenticated') as any;
        error.statusCode = 401;
        throw error;
      }

      res.status(200).json({
        success: true,
        data: req.user,
      });
    } catch (error) {
      next(error);
    }
  };

  // Update user profile
  public updateProfile = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        const error = new Error('User not authenticated') as any;
        error.statusCode = 401;
        throw error;
      }

      const { fullName, companyName, phoneNumber } = req.body;
      
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { fullName, companyName, phoneNumber },
        { new: true, runValidators: true }
      ).select('-password');

      if (!updatedUser) {
        const error = new Error('User not found') as any;
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  };
} 