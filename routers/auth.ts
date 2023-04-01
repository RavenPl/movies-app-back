import {Router} from 'express';
import {compare} from "bcrypt";

import {UserRecord} from "../records/user.record";
import {hashPwd} from "../utils/hashPwd";
import {createToken, generateToken} from "../utils/tokenCreator";


export const AuthRouter = Router();

AuthRouter
    .get('/register', (req, res) => {

        res.json({mes: "Reg form"})
    })

    .get('/login', (req, res) => {

        res.json({mes: "Log form"})
    })

    .get('/logout', (req, res) => {

        res
            .clearCookie('jwt', {
                secure: false,
                domain: 'localhost',
                httpOnly: true,
            })
            .json({msg: "Logged out!"})
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

        res
            .status(201)
            .json({msg: "Registered"})
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
                    .json({msg: "This user doesn't exists!"});
            }

            if (user && (await compare(password, user.password))) {

                const token = await createToken(await generateToken(user));

                return res
                    .cookie('jwt', token.accessToken, {
                        secure: false,
                        domain: 'localhost',
                        httpOnly: true,
                    })
                    .json({
                        msg: "Logged in!",
                    });

            } else {
                return res.status(401).json({msg: "Wrong password!"})
            }
        } catch (e) {
            console.log(e);
            throw new Error()
        }
    })