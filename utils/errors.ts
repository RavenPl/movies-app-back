import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {
}

export class NoFoundError extends Error {
}

export const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction): void => {

    console.error(err);
    if (err instanceof NoFoundError) {

        // res
        //     .status(404)
        //     .json({
        //         message: 'There is no movie with this ID!', @TODO 'błąd no found i 404'
        //     })
    } else {

        res
            .status(err instanceof ValidationError ? 400 : 500)
            .json({
                message: err instanceof ValidationError ? err.message : 'Sorry, try again later',
            });
    }
}

