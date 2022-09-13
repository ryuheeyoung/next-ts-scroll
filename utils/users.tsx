import { v4 as uuidv4 } from "uuid";

import { IUser } from "interfaces/user";
import { Result } from "utils/fetcher";

/**
 * 무한 유저 목록 만들기 함수
 * @param page
 * @param size
 * @returns {Result<IUser>}
 */
export const makeDatas = (page: number, size: number): Result<IUser> => {
  const start = (page - 1) * size + 1;
  const users: IUser[] = [];

  for (let i = start; i <= page * size; i++) {
    for (let j = 0; j <= 500; j++) {
      console.log("It's a very slow API...1..." + j);
    }

    const id = i;
    const key = Math.random().toString(36).slice(-8);
    const uuid: string = uuidv4(key);

    users.push({
      id,
      key,
      uuid,
      created_at: Date.now(),
    });
  }

  return {
    page,
    size,
    result: users,
  };
};
