import {Router} from "express";

import {authenticate} from "../middlewares/authenticate";
import {CustomRequest} from "../types";
import {UserRecord} from "../records/user.record";
import {MovieRecord} from "../records/movie.record";

export const BookmarksRouter = Router();

BookmarksRouter

    .get("/", authenticate, async (req, res) => {

        const {tokenId} = req as CustomRequest;

        if (tokenId) {
            const user = await UserRecord.getOneByToken(tokenId);

            if (!user || !user.id) {
                return res.status(498).json({message: "Wrong token!"})
            }

            const bookmarks = await MovieRecord.getAll(user.id);
            const bookmarksFiltered = bookmarks.map(obj => ({
                movieId: obj.movieId,
                isFavourite: obj.isFavourite
            }))

            return res
                .status(200)
                .json({bookmarks: bookmarksFiltered})

        }
    })

    .post("/", authenticate, async (req, res) => {

        const {movieId, isFavourite} = req.body as {
            movieId: string,
            isFavourite: boolean,
        };

        const {tokenId} = req as CustomRequest;

        if (tokenId) {
            const user = await UserRecord.getOneByToken(tokenId);
            if (!user || !user.id) {
                return res.status(498).json({message: "Wrong token!"})
            }

            const {id} = user;
            const newMovie = new MovieRecord(movieId, isFavourite, id);
            await newMovie.insert();
        }

        res
            .status(201)
            .json({message: "Movie added."})
    })

    .delete("/", authenticate, async (req, res) => {

        const {movieId} = req.body as {
            movieId: string,
            isFavourite: boolean,
        };

        const {tokenId} = req as CustomRequest;

        if (tokenId) {
            const user = await UserRecord.getOneByToken(tokenId);
            if (!user || !user.id) {
                return res.status(498).json({message: "Wrong token!"})
            }

            const {id} = user;
            const removedMovie = await MovieRecord.getOne(id, movieId);
            if (removedMovie) {
                await removedMovie.delete();
            }
        }

        res
            .status(200)
            .json({message: "Movie deleted."})
    })