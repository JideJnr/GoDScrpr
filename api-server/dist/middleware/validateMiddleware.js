"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignup = void 0;
const express_validator_1 = require("express-validator");
exports.validateSignup = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email required'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be 6+ chars'),
    (0, express_validator_1.body)('firstName').notEmpty().withMessage('First name is required'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
