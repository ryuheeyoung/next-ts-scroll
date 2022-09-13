import { useEffect, useState } from "react";

import useIntersection from "hooks/useIntersection";

import {
  BoardBox,
  BoardItem,
  IntersectBox,
  IntersectFormLayout,
  IntersectItem,
} from "components/IntersectForm/intersectForm.styled";

/**
 * 스크롤 교차 컴포넌트
 * @description intersection test 폼용, 각 컴포넌트가 보여지는 횟수만큼 그래프 그리기
 * @returns
 */
const IntersectForm = () => {
  /**
   * item 1 height
   */
  const [h1, setH1] = useState(0);
  /**
   * item 2 height
   */
  const [h2, setH2] = useState(0);
  /**
   * item 3 height
   */
  const [h3, setH3] = useState(0);

  /**
   * useIntersection ref1 (item 1)
   */
  const { setRef: ref, isIntersecting: insect1 } = useIntersection({
    root: null,
    threshold: 0,
  });
  /**
   * useIntersection ref2 (item 2)
   */
  const { setRef: ref2, isIntersecting: insect2 } = useIntersection({
    root: null,
    threshold: 0.5,
  });
  /**
   * useIntersection ref3 (item 3)
   */
  const { setRef: ref3, isIntersecting: insect3 } = useIntersection({
    root: null,
    threshold: 1,
  });

  useEffect(() => {
    if (insect1) {
      setH1((h1) => h1 + 1);
    }
  }, [insect1]);

  useEffect(() => {
    if (insect2) {
      setH2((h2) => h2 + 1);
    }
  }, [insect2]);

  useEffect(() => {
    if (insect3) {
      setH3((h3) => h3 + 1);
    }
  }, [insect3]);

  return (
    <IntersectFormLayout>
      <BoardBox>
        <BoardItem h={h1}>{h1}</BoardItem>
        <BoardItem h={h2}>{h2}</BoardItem>
        <BoardItem h={h3}>{h3}</BoardItem>
      </BoardBox>

      <IntersectBox>
        <IntersectItem id="intersection-item1" ref={ref}>
          0
        </IntersectItem>
        <IntersectItem id="intersection-item2" ref={ref2}>
          0.5
        </IntersectItem>
        <IntersectItem id="intersection-item3" ref={ref3}>
          1
        </IntersectItem>
      </IntersectBox>
    </IntersectFormLayout>
  );
};

export default IntersectForm;
