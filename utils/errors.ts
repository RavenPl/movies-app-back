import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {
}

export class NoFoundError extends Error {
}

export const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction): void => {

    if (err instanceof NoFoundError) {

        res
            .status(404)
            .json({
                message: '404 - page not found!',
            })
    } else {

        res
            .status(err instanceof ValidationError ? 400 : 500)
            .json({
                message: err instanceof ValidationError ? err.message : 'Sorry, try again later',
            });
    }
}

