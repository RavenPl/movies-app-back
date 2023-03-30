import {UserRecord} from "../../records/user.record";
import {FieldPacket} from "mysql2";

export interface UserEntity {
    id?: string | undefined;
    email: string;
    password: string;
    currentTokenId?: string | null;
    movies: string[] | null;
}

export type UserRecordResult = [UserRecord[], FieldPacket[]];
