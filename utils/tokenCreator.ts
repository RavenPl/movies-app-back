import {v4 as uuid} from 'uuid';
import {sign} from "jsonwebtoken";

import {UserRecord} from "../records/user.record";

export const createToken = async (currentTokenId: string) => {
    const secret = process.env["JWT_PASSWORD"];
    if (!secret) {
        throw new Error('No jwt password!')
    }

    const payload = {id: currentTokenId};
    const accessToken = sign(payload, secret, {
        expiresIn: "6h",
    });
    return {
        accessToken,
    };
};

export const generateToken = async (user: UserRecord) => {
    let token;
    let userWithThisToken = null;
    do {
        token = uuid();
        userWithThisToken = await UserRecord.getOneByToken(token);
    } while (!!userWithThisToken);

    user.currentTokenId = token;
    await user.save();

    return token;
};