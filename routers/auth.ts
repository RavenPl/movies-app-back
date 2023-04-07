import {Router} from 'express';
import {compare} from "bcrypt";

import {UserRecord} from "../records/user.record";
import {hashPwd} from "../utils/hashPwd";
import {createToken, generateToken} from "../utils/tokenCreator";
import {authenticate} from "../middlewares/authenticate";
import {CustomRequest} from "../types";


export const AuthRouter = Router();

AuthRouter
    .get('/logout', authenticate, async (req, res) => {

        const {tokenId} = req as CustomRequest;

        if (tokenId) {
            const user = await UserRecord.getOneByToken(tokenId);
            if (!user) {
                return res.status(401).json({message: "Wrong token!"})
            }

            user.currentTokenId = null;
            await user.save()
        }

        res
            .clearCookie('jwt', {
                secure: false,
                domain: 'localhost',
                httpOnly: true,
            })
            .json({message: "Logged out!", authorized: true})
    })

    .post('/register', async (req, res) => {

        const {email, password} = req.body as {
            email: string,
            password: string,
        };

        const newUser = await new UserRecord({
            email,
            password,
        });

        newUser.password = await hashPwd(password);
        await newUser.insert();

        res.json({message: "Registered!"})
    })

    .post('/login', async (req, res) => {

        const {email, password} = req.body as {
            email: string,
            password: string,
        };

        try {

            const user = await UserRecord.getOneByEmail(email);

            if (!user) {
                return res
                    .status(400)
                    .json({message: "This user doesn't exists!"});
            }

            if (user && (await compare(password, user.password))) {

                const token = await createToken(await generateToken(user));

                return res
                    .status(200)
                    .cookie('jwt', token.accessToken, {
                        httpOnly: true,
                        secure: false
                    })
                    .json({message: "Logged in!"})

            } else {
                return res.status(401).json({message: "Wrong password!"})
            }
        } catch (e) {
            console.log(e);
            throw new Error()
        }
    })

    .get('/test', authenticate, async (req, res) => {

        const {tokenId} = req as CustomRequest;

        if (tokenId) {
            const user = await UserRecord.getOneByToken(tokenId);

            if (user) {
                const {id, email} = user;
                return res.json({message: {id, email}, authorized: true}).end()
            }
        }

        return res
            .status(403)
            .json({message: "Unauthorized", authorized: false}).end()
    })
