import {FieldPacket} from "mysql2";
import {MovieRecord} from "../../records/movie.record";

export interface MovieEntity {
    id?: string;
    movieId: string;
    isFavourite: boolean;
    userId: string;
}

export type MovieRecordResult = [MovieRecord[], FieldPacket[]];