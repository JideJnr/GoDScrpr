"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidator = void 0;
const express_validator_1 = require("express-validator");
exports.signupValidator = [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 8 }),
    (0, express_validator_1.body)('firstName').not().isEmpty().trim().escape(),
    (0, express_validator_1.body)('lastName').not().isEmpty().trim().escape(),
    (0, express_validator_1.body)('phone').optional().isMobilePhone(),
    (0, express_validator_1.body)('role').optional().isIn(['guest', 'staff', 'admin'])
];
