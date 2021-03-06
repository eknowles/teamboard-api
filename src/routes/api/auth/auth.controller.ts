import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserDao } from '../../../dao/_index';
import { JWT_SECRET } from '../../../config/config';

export function login(req: Request, res: Response) {
  return UserDao
    .login(req.body)
    .then(user => {
      const data = { id: user.id };

      jwt.sign({ data }, JWT_SECRET, { expiresIn: '3d' }, (err, token) => {
        if (err) {
          return res.boom.badRequest(err);
        }

        return res.status(200).send({ token });
      });
    })
    .catch(error => res.boom.badRequest(res.__('login.failed')));
}

export function register(req: Request, res: Response) {
  return UserDao
    .create(req.body)
    .then(user => res.status(201).send(user))
    .catch(error => res.boom.badRequest(error));
}
