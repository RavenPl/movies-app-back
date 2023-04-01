import {hash} from "bcrypt";

export const hashPwd = async (password: string) => await hash(password, 10);
