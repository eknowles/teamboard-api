import * as express from 'express';
import * as winston from 'winston';
import * as boom from 'express-boom';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as i18n from 'i18n';
import { json, urlencoded } from 'body-parser';
import { Express } from 'express';
import * as routes from './routes/index';

const expressValidator = require('express-validator');
const PORT: number = 3000;

i18n.configure({
  directory: __dirname + '/locales',
  autoReload: process.env.NODE_ENV === 'development'
});

export class Server {

  private app: Express;

  constructor() {
    this.app = express();

    // Express middleware
    this.app.use(i18n.init);
    this.app.use(cors({
      optionsSuccessStatus: 200
    }));
    this.app.use(urlencoded({
      extended: true
    }));
    this.app.use(json());
    this.app.use(boom());
    this.app.use(morgan('combined'));
    this.app.use(expressValidator());
    this.app.listen(PORT, () => {
      winston.log('info', '--> Server successfully started at port %d', PORT);
    });
    routes.initRoutes(this.app);
  }

  getApp() {
    return this.app;
  }
}

new Server();
