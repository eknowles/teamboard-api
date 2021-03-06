import { Request, Response } from 'express';
import { UserDao } from '../../../dao/_index';
import db from '../../../db/models/_index';

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

export function getMe(req: Request, res: Response) {
  return UserDao
    .getUserById(req.user.id)
    .then(user => res.status(200).send(user))
    .catch(error => res.boom.badRequest(error));
}

export function userExistsWithEmail(req, res) {
  return db
    .user
    .findOne({ where: { email: req.query.q } })
    .then(user => {
      return res.status(200).send(!!user);
    })
    .catch(error => res.boom.badRequest(error));
}
