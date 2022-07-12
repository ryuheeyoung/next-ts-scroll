import { IUser } from "../interfaces/user";
import { v4 as uuidv4} from "uuid";

type Result = {
    page: number,
    size: number,
    result: IUser[]
}

/**
 * 
 * @param page 
 * @param size 
 * @returns {Result}
 */
 export const makeDatas = (page: number, size: number): Result => {
    const start = (page - 1) * size + 1;
    const users: IUser[] = [];

    for (let i = start; i <= page * size; i++) {
        for (let j = 0; j <= 1000; j++) {
            console.log("It's a very slow API........." + j);
        }

        const id = i;
        const key = Math.random().toString(36).slice(-8);
        const uuid: string = uuidv4(key);

        users.push({
            id,
            key,
            uuid,
            created_at: Date.now()
        });
    }

    return {
        page,
        size,
        result: users
    }
};