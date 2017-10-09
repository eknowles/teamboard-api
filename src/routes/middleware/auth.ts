import { body } from 'express-validator/check';

export const UserAuth = [
  body('email').isEmail(),
  body('password', 'Passwords must be at least 5 chars long and contain one number').isLength({ min: 5 }).matches(/\d/)
];

export const UserExists = [

];
