import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export interface IntersectionProps extends IntersectionObserverInit {}

const useIntersection = (options: IntersectionProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = useRef(null);
  const setRef = (el: Element) => {
    ref.current = el;
  };

  const onIntersection: IntersectionObserverCallback = useCallback(
    ([entry], observer) => {
      if (ref.current !== entry.target) return;

      setIsIntersecting(entry.isIntersecting);
    },
    []
  );

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(onIntersection, {
      ...options,
    });
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options, onIntersection]);

  return { setRef, isIntersecting } as const;
};

export default useIntersection;
