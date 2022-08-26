import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

import { ListFormLayout, ListItem } from "components/ListForm/Listform.styled";
import { InfiniteScroll } from "components/scrolls/infiniteScroll";
import { IUser } from "interfaces/user";
import fetcher from "utils/fetcher";
import { Result } from "utils/users";

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

  const titles = {
    id: "ID",
    uuid: "UUID",
    key: "Key",
    created_at: "Created.",
  };

  return (
    <>
      {list && (
        <ListFormLayout>
          {list.map((l) => (
            <ListItem key={l.id}>
              {Object.entries(titles).map(([k, v]) => (
                <div key={`list-${k}`}>
                  <span>{v}</span>
                  <span>{l[k]} </span>
                </div>
              ))}
            </ListItem>
          ))}
          <InfiniteScroll fetchItems={fetchItems} threshold={0.2}>
            {loading ? (
              <ListItem className="loader">
                {Object.entries(titles).map(([k, v]) => (
                  <div key={`loader-${k}`}>
                    <span>{v}</span>
                    <span></span>
                  </div>
                ))}
              </ListItem>
            ) : (
              <div></div>
            )}
          </InfiniteScroll>
        </ListFormLayout>
      )}
    </>
  );
};

export default ListForm;
