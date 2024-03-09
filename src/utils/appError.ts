import { Response } from "express";
import { ErrorRequestHandler } from "express";

export default class AppError extends Error {
  
  status : string;
  statusCode : number;
  isOperational : boolean;

  constructor(message : string, statusCode : number, res ?: Response) {
    
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    res.locals.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}
