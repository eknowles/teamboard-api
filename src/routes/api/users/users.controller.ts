import { Request, Response } from 'express';
import { UserDao } from '../../../dao/_index';

export function getAllUsers(req: Request, res: Response) {
  return UserDao
    .findAll()
    .then(users => res.status(200).send(users))
    .catch(error => res.boom.badRequest(error));
}

export function getUserById(req: Request, res: Response) {
  return UserDao
    .getUserById(req.params.userId)
    .then(user => res.status(200).send(user))
    .catch(error => res.boom.badRequest(error));
}
