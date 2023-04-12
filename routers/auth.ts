import {Router} from 'express';
import {compare} from "bcrypt";

import {hashPwd} from "../utils/hashPwd";
import {createToken, generateToken} from "../utils/tokenCreator";
import {authenticate} from "../middlewares/authenticate";
import {CustomRequest} from "../types";
import {UserRecord} from "../records/user.record";
import {MovieRecord} from "../records/movie.record";


export const AuthRouter = Router();

AuthRouter

    .post('/register', async (req, res) => {

        const {email, password} = req.body as {
            email: string,
            password: string,
        };

        const newUser = new UserRecord({
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

            if (!user || !user.id) {
                return res
                    .status(400)
                    .json({message: "This user doesn't exist!"});
            }

            if (user && (await compare(password, user.password))) {

                const favouriteMovies = await MovieRecord.getAll(user.id);
                const filteredMovies = favouriteMovies.map(obj => ({
                    movieId: obj.movieId,
                    isFavourite: obj.isFavourite
                }))

                const token = await createToken(await generateToken(user));

                return res
                    .status(200)
                    .cookie('jwt', token.accessToken, {
                        httpOnly: true,
                        secure: false
                    })
                    .json({favouriteMovies: filteredMovies})

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
                return res.json({message: {id, email}, authorized: true})
            }
        }

        return res
            .status(401)
            .json({message: "Unauthorized", authorized: false})
    })
