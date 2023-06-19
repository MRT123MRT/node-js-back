import { NextFunction, Request, Response } from 'express';

  function notFound(req: Request, res: Response, next: NextFunction) {
  res.sendStatus(404);
  const error = new Error(`NotFound - '${req.originalUrl}'`);
  next(error);
}

//   function errorHandler(err: Error, req: Request, res: Response<any>, next: NextFunction) {
//   const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
//   res.status(statusCode);
//   res.json({
//     data: err.message,
//     status: 'Error'
//   });
// }

export {
  notFound
}