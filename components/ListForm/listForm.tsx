import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

import { IUser } from "interfaces/user";

import fetcher from "utils/fetcher";
import { Result } from "utils/users";

import useIntersection from "hooks/useIntersection";
import { ListFormLayout, ListItem } from "components/ListForm/listForm.styled";

const pageSize = 30;
const ListForm = ({ result }) => {
  const [list, setList] = useState<IUser[]>(result);
  const [loading, setLoading] = useState(false);
  const { setRef, isIntersecting } = useIntersection({ threshold: 0.8 });

  const getKey = (pageIndex: any) => {
    return `/api/list?page=${pageIndex + 1}&size=${pageSize}`;
  };

  const { data, setSize } = useSWRInfinite<Result>(getKey, {
    fetcher,
    revalidateFirstPage: false,
  });

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

  useEffect(() => {
    if (isIntersecting) {
      setLoading(true);
    }
  }, [isIntersecting]);

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
          <ListItem className="loader" ref={setRef}>
            {loading &&
              Object.entries(titles).map(([k, v]) => (
                <div key={`loader-${k}`}>
                  <span></span>
                </div>
              ))}
          </ListItem>
        </ListFormLayout>
      )}
    </>
  );
};

export default ListForm;
