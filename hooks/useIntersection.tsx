import { Ref, useCallback, useEffect, useRef, useState } from "react";

/**
 * useIntersection Hook
 * @param options
 * @returns
 */
const useIntersection = (
  options: IntersectionObserverInit
): { setRef: Ref<any>; isIntersecting: boolean } => {
  /**
   * 교차여부
   */
  const [isIntersecting, setIsIntersecting] = useState(false);
  /**
   * 타겟 변수
   */
  const ref = useRef(null);

  /**
   * 타켓 세팅 함수
   * @param el
   */
  const setRef = (el: Element) => {
    ref.current = el;
  };

  /**
   * 교차 관찰 콜백 합수
   */
  const onIntersection: IntersectionObserverCallback = useCallback(
    ([entry]) => {
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
