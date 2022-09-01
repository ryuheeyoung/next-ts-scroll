import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

import { IColor } from "interfaces/color";

import { Result } from "utils/colors";
import fetcher from "utils/fetcher";

import useIntersection from "hooks/useIntersection";

import {
  ColorFormLayout,
  ColorItem,
  EmptyItem,
} from "components/ColorForm/colorForm.styled";

const pageSize = 30;
const ColorForm = () => {
  const [list, setList] = useState<IColor[]>();
  const [loading, setLoading] = useState(false);
  const { setRef, isIntersecting } = useIntersection({ threshold: 1 });

  const getKey = (pageIndex: number) => {
    return `/api/color?page=${pageIndex + 1}&size=${pageSize}`;
  };

  const { data, setSize } = useSWRInfinite<Result>(getKey, {
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
