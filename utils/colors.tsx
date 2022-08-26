import { IColor } from "interfaces/color";

export interface Result {
  page: number;
  size: number;
  result: IColor[];
}

/**
 *
 * @param page
 * @param size
 * @returns {Result}
 */
export const makeDatas = (page: number, size: number): Result => {
  const start = (page - 1) * size + 1;
  const colors: IColor[] = [];

  for (let i = start; i < page * size; i++) {
    for (let j = 0; j <= 500; j++) {
      console.log("It's a very slow API...2..." + j);
    }

    let hex = Math.round(Math.random() * 0xffffff).toString(16);
    const add = Math.round(Math.random() * 0xf).toString(16);
    hex = hex.length === 6 ? hex : hex + add;

    colors.push({
      id: i,
      hex,
      created_at: Date.now(),
    });
  }

  return {
    page,
    size,
    result: colors,
  };
};
