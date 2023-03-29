export interface UserEntity {
    id?: string;
    email: string;
    password: string;
    currentTokenId: string | null;
    movies: string[];
}