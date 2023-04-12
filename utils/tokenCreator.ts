import {v4 as uuid} from 'uuid';
import {sign} from "jsonwebtoken";

import {UserRecord} from "../records/user.record";
import {config} from "../config/config";

export const createToken = async (currentTokenId: string) => {

    const payload = {id: currentTokenId};
    const accessToken = sign(payload, config.jwtPassword, {
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