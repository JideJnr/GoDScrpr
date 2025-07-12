"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res) => {
    console.error('[ERROR]', error);
    // Handle different error types with appropriate status codes
    switch (true) {
        case error.message === 'Invalid credentials':
            return res.status(401).json({
                success: false,
                error: 'Invalid email or password'
            });
        case error.message === 'Account inactive':
            return res.status(403).json({
                success: false,
                error: 'Account is inactive. Please contact support.'
            });
        case error.message === 'User already exists':
            return res.status(409).json({
                success: false,
                error: 'Email already exists'
            });
        case error.message === 'Invalid or expired token':
            return res.status(400).json({
                success: false,
                error: 'Invalid or expired reset token'
            });
        case error.message === 'User not found':
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        case error.message === 'Email and password are required':
            return res.status(400).json({
                success: false,
                error: error.message
            });
        default:
            const statusCode = error.statusCode || 500;
            const message = error.message || 'Internal Server Error';
            return res.status(statusCode).json({
                success: false,
                error: message
            });
    }
};
exports.errorHandler = errorHandler;
