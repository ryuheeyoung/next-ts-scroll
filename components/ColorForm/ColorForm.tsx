import { useEffect, useState } from "react";
import styled from "styled-components";
import useSWRInfinite from "swr/infinite";

import { IColor } from "interfaces/color";
import { Result } from "utils/colors";
import fetcher from "utils/fetcher";
import { InfiniteScroll } from "components/scrolls/infiniteScroll";

const ColorFormLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
`;

const ColorItem = styled.div<{ background?: string }>`
  background: ${(props) => props.background || props.theme.colors.primary};
  box-shadow: 0 0 2px ${({ theme }) => theme.colors.primary}};
  flex: 1 1 0;
  padding: 1.25em;
  margin-right: 9px;
  display: flex;
  justify-content: center;
  ${(props) => !props.background && `opacity: 0.8;`}
`;

const EmptyItem = styled.div`
  flex: 1 1 0;
  padding: 1.25em;
  text-align: center;
  justify-content: center;
`;

const pageSize = 30;
const ColorForm = () => {
  const [list, setList] = useState<IColor[]>();
  const [loading, setLoading] = useState(false);

  const getKey = (pageIndex: number) => {
    return `/api/color?page=${pageIndex + 1}&size=${pageSize}`;
  };

  const { data, setSize } = useSWRInfinite<Result>(getKey, {
    fetcher,
    revalidateFirstPage: false,
  });

  const fetchItems = () => {
    if (!loading) {
      setLoading(true);
    }
  };

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

  return (
    <ColorFormLayout>
      {list && (
        <>
          {list.map((l, i) => (
            <ColorItem key={l.id} background={`#${l.hex}`}>
              <span>{`#${l.hex.toUpperCase()}`}</span>
            </ColorItem>
          ))}
          <InfiniteScroll fetchItems={fetchItems} threshold={1}>
            <ColorItem>
              <span>{loading ? "컬러 추가 중" : "컬러 추가 요청"}</span>
            </ColorItem>
          </InfiniteScroll>
        </>
      )}
      {!list && <EmptyItem> 색상 불러오는 중 </EmptyItem>}
    </ColorFormLayout>
  );
};

export default ColorForm;
