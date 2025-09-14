import { Request } from 'express';
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}
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
export interface PaginationQuery {
    page?: string;
    limit?: string;
}
export interface ValidationError {
    field: string;
    message: string;
    value?: any;
}
export interface DatabaseResult<T> {
    success: boolean;
    data?: T;
    error?: string;
}
//# sourceMappingURL=index.d.ts.map