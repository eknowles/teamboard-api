import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import { UserDao } from '../../../dao/_index';

export function login(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.boom.badRequest(res.__('validate.errors'), { errors: errors.mapped() });
  }

  return UserDao
    .login(req.body)
    .then(user => res.status(200).send(user))
    .catch(error => res.boom.badRequest(error));
}

export function register(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.boom.badRequest(res.__('validate.errors'), { errors: errors.mapped() });
  }

  return UserDao
    .create(req.body)
    .then(user => res.status(201).send(user))
    .catch(error => res.boom.badRequest(error));
}
