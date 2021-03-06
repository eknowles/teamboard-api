import * as crypto from 'crypto';

import db from '../db/models/_index';
import { BYTE_TO_STRING_ENCODING, DIGEST, ITERATIONS, PASSWORD_LENGTH, SALT_LENGTH } from '../config/config';
import { PasswordAttributes } from '../db/models/password';
import { UserInstance } from '../db/models/user';

export async function create(user: { email: string, password: string }): Promise<any> {
  const usr = await db.user.create({ email: user.email });

  if (!usr) {
    throw new Error();
  }

  const PersistedPassword = await generateHashPassword(user.password);
  const password = await db.password.create({ userId: usr.id, ...PersistedPassword });

  if (!password) {
    throw new Error();
  }

  return usr;
}

export function findAll(): Promise<any> {
  return db.user.findAll();
}

export function getUserById(id: string): Promise<UserInstance> {
  return db.user.findById(id);
}

export async function login(user: { email: string, password: string }): Promise<UserInstance> {
  const usr = await db.user.findOne({
    where: { email: user.email },
    include: [{ model: db.password }],
    order: [[db.password, 'createdAt', 'DESC']]
  });

  if (!usr) {
    throw 'No User Found';
  }

  const latestPassword = usr.passwords[0];
  const validPassword = await verifyPassword(latestPassword, user.password);

  if (validPassword) {
    return Promise.resolve(usr);
  }

  throw 'Bad Password';
}


/**
 * Generates a PersistedPassword given the password provided by the user. This should be called when creating a user
 * or redefining the password
 */
export async function generateHashPassword(password: string): Promise<PasswordAttributes> {
  return new Promise<PasswordAttributes>((accept, reject) => {
    const salt = crypto.randomBytes(SALT_LENGTH).toString(BYTE_TO_STRING_ENCODING);

    crypto.pbkdf2(password, salt, ITERATIONS, PASSWORD_LENGTH, DIGEST, (error, hash) => {
      if (error) {
        reject(error);
      } else {
        accept({
          salt,
          hash: hash.toString(BYTE_TO_STRING_ENCODING),
          iterations: ITERATIONS,
        });
      }
    });
  });
}

/**
 * Verifies the attempted password against the password information saved in the database. This should be called when
 * the user tries to log in.
 */
export async function verifyPassword(persistedPassword: PasswordAttributes, passwordAttempt: string): Promise<boolean> {
  return new Promise<boolean>((accept, reject) => {
    crypto.pbkdf2(
      passwordAttempt,
      persistedPassword.salt,
      persistedPassword.iterations,
      PASSWORD_LENGTH,
      DIGEST,
      (error, hash) => {
        if (error) {
          reject(error);
        } else {
          accept(persistedPassword.hash === hash.toString(BYTE_TO_STRING_ENCODING));
        }
      }
    );
  });
}
