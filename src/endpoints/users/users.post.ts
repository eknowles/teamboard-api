import { Request, Response } from 'express';

const { validationResult } = require('express-validator/check');

import { UserDao } from '../../dao/_index';

export function create(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.boom.badRequest('Validation Error', { errors: errors.mapped() });
  }

  return UserDao
    .create(req.body)
    .then(user => res.status(201).send(user))
    .catch(error => res.boom.badRequest(error));
}

export function login(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.boom.badRequest('Validation Error', { errors: errors.mapped() });
  }

  return UserDao
    .login(req.body)
    .then(user => res.status(200).send(user))
    .catch(error => res.boom.badRequest(error));
}
