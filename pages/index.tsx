import { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";

import ListLayout from "../components/ListLayout";
import { InfiniteScroll } from "../components/scrolls/infiniteScroll";

import { IUser } from "../interfaces/user";

type ListProps = {
  page: string;
  result: IUser[];
  size: string;
};

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) return [];

    return r.json();
  });

const pageSize = 30;
const IndexPage = ({ ...props }) => {
  const [list, setList] = useState<IUser[]>();
  const [loading, setLoading] = useState(false);

  const getKey = (pageIndex: any) => {
    return `/api/list?page=${pageIndex + 1}&size=${pageSize}`;
  };
  const { data, error, isValidating, mutate, size, setSize } =
    useSWRInfinite<ListProps>(getKey, {
      fetcher,
      revalidateFirstPage: false,
      fallbackData: props.result,
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
        <ul>
          {list.map((l) => (
            <li key={l.id} style={{ padding: ".5em" }}>
              <div>
                <span>{l.id}</span>
                <span>{l.uuid}</span>
                <span>{l.key}</span>
                <span>{l.created_at}</span>
              </div>
            </li>
          ))}
          <InfiniteScroll fetchItems={fetchItems}>
            <div>{loading ? " Loading ..." : ""}</div>
          </InfiniteScroll>
        </ul>
      )}
    </>
  );
};

export default IndexPage;

export async function getServerSideProps({ req }) {
  const res = await fetch(
    `${req.headers.referer}/api/list?page=1&size=${pageSize}`
  );
  const posts = await res.json();

  return {
    props: {
      fallback: posts.result,
    },
  };
}

IndexPage.Layout = ListLayout;
