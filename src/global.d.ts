declare namespace Express {
  export interface Response {
    boom: any;
  }
  export interface Request {
    user: {
      id: string;
    };
  }
}
