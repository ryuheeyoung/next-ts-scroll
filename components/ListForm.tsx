import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useSWRInfinite from "swr/infinite";

import { IUser } from "../interfaces/user";
import { Result } from "../utils/users";
import { InfiniteScroll } from "./scrolls/infiniteScroll";

const ListFormLayout = styled.ul`
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  box-shadow: 0 0 2px ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  margin: 10px 10px 7px 0;
  padding: 0.5em 1.25em;
  & > div {
    display: flex;
    flex-flow: row nowrap;
    gap: 5px;
    & > span {
      margin-bottom: 5px;
      &:nth-child(1) {
        flex: 1 0 48px;
        border-right: 1px solid;
        text-align: right;
        padding-right: 5px;
      }
      &:nth-child(2) {
        flex: 4 1 0;
      }
    }
  }
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
            <ListItem key={l.id}>
              <div>
                <span>ID</span>
                <span>{l.id} </span>
              </div>
              <div>
                <span>UUID</span>
                <span>{l.uuid} </span>
              </div>
              <div>
                <span>Key</span>
                <span>{l.key} </span>
              </div>
              <div>
                <span>Created.</span>
                <span>{l.created_at} </span>
              </div>
            </ListItem>
          ))}
          <InfiniteScroll fetchItems={fetchItems}>
            <div>{loading ? " Loading ..." : " "}</div>
          </InfiniteScroll>
        </ListFormLayout>
      )}
    </>
  );
};

export default ListForm;
