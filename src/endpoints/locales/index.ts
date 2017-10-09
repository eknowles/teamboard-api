import { Request, Response } from 'express';

export function getLocales(req: Request, res: Response) {
  return res.status(200).send({
    languages: res.locals.__l('language.current'),
    options: res.locals.getLocales()
  });
}
