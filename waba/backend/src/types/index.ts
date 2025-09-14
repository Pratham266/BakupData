import { Request } from 'express';

// Extended Request interface for authenticated routes
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// API Response interface
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  total?: number;
  page?: number;
  pages?: number;
  error?: {
    message: string;
    stack?: string;
  };
}

// Pagination interface
export interface PaginationQuery {
  page?: string;
  limit?: string;
}


// Validation error interface
export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// Database operation result
export interface DatabaseResult<T> {
  success: boolean;
  data?: T;
  error?: string;
} 