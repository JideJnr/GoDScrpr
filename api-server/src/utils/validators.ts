import  { body } from 'express-validator';

export const signupValidator = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('firstName').not().isEmpty().trim().escape(),
  body('lastName').not().isEmpty().trim().escape(),
  body('phone').optional().isMobilePhone(),
  body('role').optional().isIn(['guest', 'staff', 'admin'])
];