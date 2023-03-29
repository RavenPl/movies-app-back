import {UserEntity} from "../types";
import {ValidationError} from "../utils/errors";

export class UserRecord implements UserEntity {
    id?: string;
    email: string;
    password: string;
    currentTokenId: string | null;
    movies: string[];

    constructor(obj: UserRecord) {

        if (!obj.email || obj.email.indexOf('@') === -1) {
            throw new ValidationError()
        }
    }

}