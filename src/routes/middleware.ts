import { body } from 'express-validator/check';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config';

/**
 * Ensures the request contains email and password in the body.
 * @type {[ValidationChain , ValidationChain]}
 */
export const checkUserPassword = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }).matches(/\d/)
];

/**
 * Ensures the request contains a valid token and sets req.user to the decoded token
 * @param req
 * @param res
 * @param next
 */
export function isUser(req, res, next) {
  let token;

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err || !decoded) return res.boom.unauthorized(err);
    req.user = decoded.data;
    return next();
  });
}
