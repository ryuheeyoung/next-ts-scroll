import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useSWRInfinite from "swr/infinite";

import { IUser } from "../interfaces/user";
import { Result } from "../utils/users";
import { InfiniteScroll } from "./scrolls/infiniteScroll";

const ListFormLayout = styled.ul`
  height: 100%;
  margin: 0;
  overflow: auto;
`;

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) return [];

    return r.json();
  });

const pageSize = 30;
const ListForm = ({ result }) => {
  const [list, setList] = useState<IUser[]>(result);
  const [loading, setLoading] = useState(false);

  const getKey = (pageIndex: any) => {
    return `/api/list?page=${pageIndex + 1}&size=${pageSize}`;
  };

  const { data, error, isValidating, mutate, size, setSize } =
    useSWRInfinite<Result>(getKey, {
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
      const res = [];
      data.forEach(({ result }) => {
        res.push(
          ...result.map((r) => {
            var created_at = new Date(r.created_at)
              .toISOString()
              .replace("T", " ")
              .split(".")[0];
            return { ...r, created_at };
          })
        );
      });

      setList(res);
    }
  }, [data]);

  useEffect(() => {
    if (loading) {
      setSize((size) => size + 1);
    }
  }, [loading, setSize]);

  return (
    <>
      {list && (
        <ListFormLayout>
          {list.map((l) => (
            <li key={l.id} style={{ padding: ".5em" }}>
              <div>
                <span>{l.id} </span>
                <span>{l.uuid} </span>
                <span>{l.key} </span>
                <span>{l.created_at} </span>
              </div>
            </li>
          ))}
          <InfiniteScroll fetchItems={fetchItems}>
            <div>{loading ? " Loading ..." : ""}</div>
          </InfiniteScroll>
        </ListFormLayout>
      )}
    </>
  );
};

export default ListForm;
