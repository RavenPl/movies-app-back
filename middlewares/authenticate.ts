import {NextFunction, Response} from "express";
import {JwtPayload, verify, VerifyErrors} from "jsonwebtoken";

import {config} from "../config/config";
import {CustomRequest} from "../types";

export const authenticate = (req: CustomRequest, res: Response, next: NextFunction) => {

    const token: string | null = (req && req.cookies) ? req.cookies?.jwt ?? null : null;

    if (!token) {

        return res
            .status(403)
            .json({message: "Unauthorized", authorized: false})
    }

    verify(token, config.jwtPassword, async (err: VerifyErrors | null, data: JwtPayload | string | undefined) => {
        if (err || !data) {
            return res
                .status(403)
                .json({message: "Unauthorized - after check"})
        }

        const {id} = data as JwtPayload;
        req.tokenId = id;

        next();
    })

}
