export interface Result<T> {
  /**
   * 페이지 넘버
   */
  page: number;
  /**
   * 결과 사이즈
   */
  size: number;
  /**
   * 결과 목록
   */
  result: T[];
}

/**
 * swr fetcher
 * @param url API url
 * @returns promise
 */
const fetcher = (url: string): Promise<any> =>
  fetch(url).then((r) => {
    if (!r.ok) return [];

    return r.json();
  });

export default fetcher;
