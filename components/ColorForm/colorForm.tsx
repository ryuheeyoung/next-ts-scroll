import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

import { IColor } from "interfaces/color";

import fetcher, { Result } from "utils/fetcher";

import useIntersection from "hooks/useIntersection";

import {
  ColorFormLayout,
  ColorItem,
  EmptyItem,
} from "components/ColorForm/colorForm.styled";

/**
 * api 결과 size
 */
const pageSize = 30;

/**
 * 색상 목록 컴포넌트
 * @returns
 */
const ColorForm = () => {
  /**
   * 색상 목록 데이터
   */
  const [list, setList] = useState<IColor[]>();
  /**
   * 로더
   */
  const [loading, setLoading] = useState(false);
  /**
   * useIntersection
   */
  const { setRef, isIntersecting } = useIntersection({ threshold: 1 });

  /**
   * infinite swr getKey
   * @param pageIndex
   * @returns url
   */
  const getKey = (pageIndex: number) => {
    return `/api/color?page=${pageIndex + 1}&size=${pageSize}`;
  };

  /**
   * 무한 swr
   */
  const { data, setSize } = useSWRInfinite<Result<IColor>>(getKey, {
    fetcher,
    revalidateFirstPage: false,
  });

  useEffect(() => {
    if (data) {
      setLoading(false);
      const parsing = data.reduce((a, b) => {
        a.push(...b.result);

        return a;
      }, []);

      setList(parsing);
    }
  }, [data]);

  useEffect(() => {
    if (loading) {
      setSize((size) => size + 1);
    }
  }, [loading, setSize]);

  useEffect(() => {
    if (isIntersecting) {
      setLoading(true);
    }
  }, [isIntersecting]);

  return (
    <ColorFormLayout>
      {list && (
        <>
          {list.map((l, i) => (
            <ColorItem key={l.id} background={`#${l.hex}`}>
              <span>{`#${l.hex.toUpperCase()}`}</span>
            </ColorItem>
          ))}
          <ColorItem ref={setRef}>
            <span>{loading ? "컬러 추가 중" : "컬러 추가 요청"}</span>
          </ColorItem>
        </>
      )}
      {!list && <EmptyItem> 색상 불러오는 중 </EmptyItem>}
    </ColorFormLayout>
  );
};

export default ColorForm;
