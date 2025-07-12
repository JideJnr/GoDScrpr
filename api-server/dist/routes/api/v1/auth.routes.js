"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../../../controllers/auth.controller");
const authMiddleware_1 = require("../../../middleware/authMiddleware");
const validators_1 = require("../../../utils/validators");
const router = express_1.default.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication endpoints
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignup:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           minLength: 8
 *           example: SecurePass123!
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         phone:
 *           type: string
 *           example: +1234567890
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: user@example.com
 *         password:
 *           type: string
 *           example: SecurePass123!
 *     TokenVerification:
 *       type: object
 *       required:
 *         - firebaseToken
 *       properties:
 *         firebaseToken:
 *           type: string
 *           description: Firebase ID token from client SDK
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         token:
 *           type: string
 *           description: JWT for API authentication
 *         user:
 *           type: object
 *           properties:
 *             uid:
 *               type: string
 *             email:
 *               type: string
 *             firstName:
 *               type: string
 *             role:
 *               type: string
 */
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid input or email exists
 *       500:
 *         description: Server error
 */
router.post('/signup', validators_1.signupValidator, auth_controller_1.signup);
/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Authenticate an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/signin', auth_controller_1.login);
/**
 * @swagger
 * /auth/verify-token:
 *   post:
 *     summary: Verify Firebase token and issue JWT
 *     description: |
 *       For users who signed in via Firebase Client SDK.
 *       Exchanges a Firebase ID token for your API's JWT.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TokenVerification'
 *     responses:
 *       200:
 *         description: Token verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid or expired token
 *       404:
 *         description: User not found in database
 *       500:
 *         description: Server error
 */
router.post('/verify-token', authMiddleware_1.verifyJWT);
exports.default = router;
