import { NextFunction, Request, Response } from 'express';

  export function notFound(req: Request, res: Response, next: NextFunction) {
  res.sendStatus(404);
  const error = new Error(`NotFound - '${req.originalUrl}'`);
  next(error);
}
