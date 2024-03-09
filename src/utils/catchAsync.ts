import { NextFunction, Request, Response, RequestHandler, request } from "express";

export default (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
