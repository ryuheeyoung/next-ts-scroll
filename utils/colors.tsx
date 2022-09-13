import { IColor } from "interfaces/color";
import { Result } from "utils/fetcher";

/**
 * 무한 컬러 리스트 생성 함수
 * @param page
 * @param size
 * @returns {Result<IColor>}
 */
export const makeDatas = (page: number, size: number): Result<IColor> => {
  const start = (page - 1) * size + 1;
  const colors: IColor[] = [];

  for (let i = start; i < page * size; i++) {
    for (let j = 0; j <= 500; j++) {
      console.log("It's a very slow API...2..." + j);
    }

    let hex = "";
    for (let c = 0; c < 6; c++) {
      hex += Math.round(Math.random() * 0xf).toString(16);
    }

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
