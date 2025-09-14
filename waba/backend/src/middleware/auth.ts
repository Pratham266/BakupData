import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AuthRequest } from '../controllers/AuthController';

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      const error = new Error('Access token required') as any;
      error.statusCode = 401;
      throw error;
    }

    // This code verifies the JWT token using the secret key.
    // If the token is valid, it decodes the payload (which should contain the userId).
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-here'
    ) as any;

    // Using the decoded userId, it looks up the user in the database,
    // excluding the password field from the result for security.
    const user = await User.findById(decoded.userId).select('-password');
    if (!user || !user.isActive) {
      const error = new Error('User not found or inactive') as any;
      error.statusCode = 401;
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      const jwtError = new Error('Invalid token') as any;
      jwtError.statusCode = 401;
      next(jwtError);
    } else {
      next(error);
    }
  }
}; 