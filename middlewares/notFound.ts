import {NextFunction, Request, Response} from 'express';
import {NoFoundError} from "../utils/errors";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
    throw new NoFoundError();
}