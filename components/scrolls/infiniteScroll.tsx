import { useCallback, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const loading_kf = keyframes`
  0% {
      max-width: 0;
  }
  100% {
      max-width: 100%;
  }
`;

const Scroll = styled.div`
  display: block;
  width: 100%;
  height: fit-content;
  min-height: 10px;
`;

const Loader = styled.div`
  position: relative;
  grid-column-end: 4;
  padding: 0.5em;
  font-size: 1.2em;
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 1px 1px 2px ${({ theme }) => theme.colors.point};
  text-align: center;
  &:before {
    content: attr(data-text);
    text-align: center;
    position: absolute;
    overflow: hidden;
    max-width: 100%;
    white-space: nowrap;
    color: ${({ theme }) => theme.colors.dark};
    animation: ${loading_kf} 5s infinite 1s;
  }
`;

export interface ScrollProps {
  children: React.ReactNode;
  fetchItems: () => void;
  threshold?: number;
}

export const InfiniteScroll = ({
  children,
  fetchItems,
  threshold = 0.8,
}: ScrollProps) => {
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
      threshold,
    });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [handleIntersect, threshold]);

  return (
    <Scroll ref={ref}>
      {children ? (
        children
      ) : (
        <Loader data-text="now loading ...">now loading ...</Loader>
      )}
    </Scroll>
  );
};
