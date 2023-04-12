import {Router} from "express";

import {authenticate} from "../middlewares/authenticate";
import {CustomRequest} from "../types";
import {UserRecord} from "../records/user.record";
import {MovieRecord} from "../records/movie.record";

export const UserRouter = Router();

UserRouter

    .get('/logout', authenticate, async (req, res) => {

        const {tokenId} = req as CustomRequest;

        if (tokenId) {
            const user = await UserRecord.getOneByToken(tokenId);
            if (!user) {
                return res.status(498).json({message: "Wrong token!"})
            }

            user.currentTokenId = null;
            await user.save()
        }

        res
            .clearCookie('jwt')
            .json({message: "Logged out!", authorized: false})
    })

    .delete('/', authenticate, async (req, res) => {

        const {tokenId} = req as CustomRequest;

        if (tokenId) {
            const user = await UserRecord.getOneByToken(tokenId);
            if (!user || !user.id) {
                return res.status(498).json({message: "Wrong token!"})
            }
            await MovieRecord.deleteAll(user.id);
            await user.delete();
        }
        res
            .clearCookie('jwt')
            .json({message: "Deleted account!", authorized: false})

    })