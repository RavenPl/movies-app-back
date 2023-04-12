import {v4 as uuid} from "uuid";

import {pool} from "../utils/db";
import {MovieEntity, MovieRecordResult} from "../types";

export class MovieRecord implements MovieEntity {

    id: string;

    constructor(public movieId: string, public isFavourite: boolean, public userId: string) {
    }

    static async getAll(userId: string): Promise<MovieRecord[] | []> {

        const [favoriteMovies] = (await pool.execute('SELECT * FROM `movies` JOIN `users` ON `movies`.`userId` = `users`.`id` WHERE `userId` = :userId', {
            userId
        })) as MovieRecordResult;

        return favoriteMovies.length ? favoriteMovies : []
    }

    static async getOne(userId: string, movieId: string): Promise<MovieRecord | false> {
        const [favoriteMovie] = (await pool.execute('SELECT * FROM `movies` JOIN `users` ON `movies`.`userId` = `users`.`id` WHERE `userId` = :userId AND `movieId` = :movieId', {
            userId, movieId
        })) as MovieRecordResult;

        return favoriteMovie.length === 1 ? new MovieRecord(favoriteMovie[0].movieId, favoriteMovie[0].isFavourite, favoriteMovie[0].id) : false
    }

    async insert(): Promise<void> {

        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute('INSERT INTO `movies`(`id`,`movieId`,`isFavourite`,`userId`) VALUES(:id, :movieId, :isFavourite, :userId)', {
            id: this.id,
            movieId: this.movieId,
            isFavourite: this.isFavourite,
            userId: this.userId,
        });

    }

    async delete(): Promise<void> {
        await pool.execute('DELETE FROM `movies` WHERE `movieId` = :movieId and `userId` =:userId', {
            movieId: this.movieId,
            userId: this.userId,
        })
    }

    static async deleteAll(userId: string): Promise<void> {
        await pool.execute('DELETE FROM `movies` WHERE `userId` =:userId', {
            userId,
        })
    }
}