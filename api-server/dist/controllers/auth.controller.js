"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.login = exports.signup = void 0;
const firebase_js_1 = require("../../firebase/firebase.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errorHandler_js_1 = require("../utils/errorHandler.js");
const activity_controller_js_1 = require("./activity.controller.js");
const SALT_ROUNDS = 12;
// Activity logging helper (reused across all methods)
const logAuthActivity = async (userId, action, metadata = {}) => {
    const activityMap = {
        SIGNUP: {
            type: 'user_signup',
            description: 'New account created'
        },
        LOGIN: {
            type: 'user_login',
            description: 'Successful login'
        },
        PASSWORD_RESET: {
            type: 'password_reset',
            description: 'Password changed'
        }
    };
    if (activityMap[action]) {
        await (0, activity_controller_js_1.logActivity)({
            uid: userId,
            type: activityMap[action].type,
            description: activityMap[action].description,
            ...metadata
        });
    }
};
// Shared validation helpers
const validateEmail = (email) => {
    if (!email)
        throw { statusCode: 400, message: 'Email is required' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw { statusCode: 400, message: 'Invalid email format' };
    }
};
const validatePassword = (password) => {
    if (!password)
        throw { statusCode: 400, message: 'Password is required' };
    if (password.length < 8) {
        throw { statusCode: 400, message: 'Password must be at least 8 characters' };
    }
};
// Signup Controller
const signup = async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone, role = 'GUEST' } = req.body;
        // Validate input
        validateEmail(email);
        validatePassword(password);
        if (!firstName)
            throw { statusCode: 400, message: 'First name is required' };
        // Check if user exists
        const snapshot = await firebase_js_1.db.collection('users')
            .where('email', '==', email)
            .limit(1)
            .get();
        if (!snapshot.empty) {
            throw { statusCode: 409, message: 'Email already registered' };
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, SALT_ROUNDS);
        // Create user
        const userRef = firebase_js_1.db.collection('users').doc();
        await userRef.set({
            uid: userRef.id,
            email,
            password: hashedPassword,
            firstName,
            lastName: lastName || '',
            phone: phone || '',
            role,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: true
        });
        // Log activity
        await logAuthActivity(userRef.id, 'SIGNUP', { email, role });
        // Generate token
        const token = jsonwebtoken_1.default.sign({ uid: userRef.id, email, role }, process.env.JWT_SECRET, { expiresIn: '6h' });
        res.status(201).json({
            success: true,
            token,
            user: { uid: userRef.id, email, firstName, role }
        });
    }
    catch (error) {
        (0, errorHandler_js_1.errorHandler)(error, req, res);
    }
};
exports.signup = signup;
// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        validateEmail(email);
        validatePassword(password);
        // Find user
        const snapshot = await firebase_js_1.db.collection('users')
            .where('email', '==', email)
            .limit(1)
            .get();
        if (snapshot.empty) {
            throw { statusCode: 401, message: 'Invalid credentials' };
        }
        const userDoc = snapshot.docs[0];
        const user = userDoc.data();
        // Verify password
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            throw { statusCode: 401, message: 'Invalid credentials' };
        }
        // Check if active
        if (!user.isActive) {
            throw { statusCode: 403, message: 'Account is inactive' };
        }
        // Log activity
        await logAuthActivity(user.uid, 'LOGIN', {
            ip: req.ip,
            userAgent: req.headers['user-agent']
        });
        // Generate token
        const token = jsonwebtoken_1.default.sign({ uid: user.uid, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '6h' });
        res.status(200).json({
            success: true,
            token,
            user: {
                uid: user.uid,
                email: user.email,
                firstName: user.firstName,
                role: user.role
            }
        });
    }
    catch (error) {
        (0, errorHandler_js_1.errorHandler)(error, req, res);
    }
};
exports.login = login;
// Password Reset Controller
const resetPassword = async (req, res) => {
    try {
        const { phone, token, newPassword } = req.body;
        // Validate input
        if (!phone || !token || !newPassword) {
            throw { statusCode: 400, message: 'Phone, token and new password are required' };
        }
        validatePassword(newPassword);
        // Verify token
        const resetSnapshot = await firebase_js_1.db.collection('passwordResets')
            .where('phone', '==', phone)
            .where('token', '==', token)
            .limit(1)
            .get();
        if (resetSnapshot.empty) {
            throw { statusCode: 400, message: 'Invalid or expired token' };
        }
        // Check token expiration (1 hour validity)
        const resetData = resetSnapshot.docs[0].data();
        const tokenExpiration = new Date(resetData.createdAt);
        tokenExpiration.setHours(tokenExpiration.getHours() + 1);
        if (new Date() > tokenExpiration) {
            await firebase_js_1.db.collection('passwordResets').doc(resetSnapshot.docs[0].id).delete();
            throw { statusCode: 400, message: 'Token has expired' };
        }
        // Find user
        const userSnapshot = await firebase_js_1.db.collection('users')
            .where('phone', '==', phone)
            .limit(1)
            .get();
        if (userSnapshot.empty) {
            throw { statusCode: 404, message: 'User not found' };
        }
        const userRef = userSnapshot.docs[0].ref;
        const user = userSnapshot.docs[0].data();
        // Hash and update password
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, SALT_ROUNDS);
        await userRef.update({
            password: hashedPassword,
            updatedAt: new Date().toISOString()
        });
        // Log activity
        await logAuthActivity(user.uid, 'PASSWORD_RESET');
        // Cleanup reset token
        await firebase_js_1.db.collection('passwordResets').doc(resetSnapshot.docs[0].id).delete();
        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    }
    catch (error) {
        (0, errorHandler_js_1.errorHandler)(error, req, res);
    }
};
exports.resetPassword = resetPassword;
