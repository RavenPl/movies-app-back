import {NextFunction, Response} from "express";
import {JwtPayload, verify, VerifyErrors} from "jsonwebtoken";

import {CustomRequest} from "../types";

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {

    const token: string | null = (req && req.cookies) ? req.cookies?.jwt ?? null : null;

    if (!token) {

        return res
            .status(401)
            .json({message: "Unauthorized", authorized: false})
    }
    const secret = process.env["JWT_PASSWORD"];
    if (!secret) {
        throw new Error('No jwt password!')
    }
    verify(token, secret, async (err: VerifyErrors | null, data: JwtPayload | string | undefined) => {

        if (err || !data) {
            return res
                .status(401)
                .json({message: "Unauthorized"})
        }

        const {id} = data as JwtPayload;
        req.tokenId = id;

        next();
    })
}
