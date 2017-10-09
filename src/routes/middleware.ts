import { body } from 'express-validator/check';

export const checkUserPassword = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }).matches(/\d/)
];

