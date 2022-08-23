import { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";

const Scroll = styled.div`
  display: block;
  width: 100%;
  height: fit-content;
  align: center;
`;

export interface ScrollProps {
  children: React.ReactNode;
  fetchItems: () => void;
}

export const InfiniteScroll = ({ children, fetchItems }: ScrollProps) => {
  const ref = useRef(null);

  const handleIntersect: IntersectionObserverCallback = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        fetchItems();
        observer.observe(entry.target);
      }
    },
    [fetchItems]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.8,
    });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [handleIntersect]);

  return <Scroll ref={ref}>{children}</Scroll>;
};
