import {v4 as uuid} from 'uuid';

import {UserEntity, UserRecordResult} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";

export type UserRecordInsert = Omit<UserEntity, "movies">

export class UserRecord implements UserEntity {

    id?: string | undefined;
    email: string;
    password: string;
    currentTokenId?: string | null = null;
    movies: string[] | null = null;

    constructor(obj: UserRecordInsert) {

        const {password, email, currentTokenId} = obj;

        if (password.length < 8 || password.length > 100) {
            throw new ValidationError('Password should have at least 8 characters but no more than 100!')
        }

        if (!email || email.indexOf('@') === -1 || email.length > 255) {
            throw new ValidationError('Invalid email!')
        }

        this.id = obj.id;
        this.email = email.trim();
        // this.currentTokenId = currentTokenId;
        this.password = password;
    }

    static async getOneByEmail(email: string): Promise<UserRecord | null> {
        const [user] = (await pool.execute('SELECT * FROM `users` WHERE `email` = :email', {
            email,
        })) as UserRecordResult;

        return user.length === 0 ? null : new UserRecord(user[0])
    }

    static async getAll(): Promise<UserRecord[] | null> {
        const [users] = (await pool.execute('SELECT * FROM `users`')) as UserRecordResult;

        return users.length ? users : null
    }

    async insert(): Promise<void> {

        if (!this.id) {
            this.id = uuid();
        }
        if (!this.currentTokenId) {
            this.currentTokenId = null;
        }
        const found = await UserRecord.getOneByEmail(this.email);
        if (found) {
            throw new ValidationError('This email is taken!')
        }

        await pool.execute('INSERT INTO `users`(`id`,`email`,`password`,`currentTokenId`) VALUES(:id, :email, :password,:currentTokenId )', {
            id: this.id,
            email: this.email,
            password: this.password,
            currentTokenId: this.currentTokenId,
        });
    }

    async delete(): Promise<void> {
        await pool.execute('DELETE FROM `users` WHERE `email` = :email', {
            email: this.email
        })
    }

    async save(): Promise<void> {
        await pool.execute("UPDATE `users` SET `currentTokenId` = :currentTokenId WHERE `id` = :id", {
            id: this.id,
            currentTokenId: this.currentTokenId,
        });
    }
}


