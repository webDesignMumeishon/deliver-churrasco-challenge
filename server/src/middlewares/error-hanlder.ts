import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/errorHandler';

async function handleError(
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError = err;

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      err.message,
      500
    );
  }
  return res.status((customError as CustomError).status).send(customError);
};

export default handleError;