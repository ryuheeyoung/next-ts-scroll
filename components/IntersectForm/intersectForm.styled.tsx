import styled from "styled-components";

const IntersectFormLayout = styled.div`
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  overflow: auto;
`;

const BoardBox = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 15vh;
  background: ${({ theme }) => theme.colors.point};
  box-shadow: 0 5px 2px ${({ theme }) => theme.colors.secondary};
  border-radius: 5px 5px 0 0;
  display: flex;
  gap: 15px;
  justify-content: space-evenly;
  align-items: flex-end;
`;

const BoardItem = styled.div<{ h: number }>`
  position: relative;
  bottom: 0;
  width: 20%;
  text-align: center;
  height: calc(100% - ${({ h }) => 100 - (h % 100)}%);
  background: ${({ theme }) => theme.colors.highlight};
  z-index: 1;
`;

const IntersectBox = styled.div`
  height: 200%;
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
  align-items: center;
`;
const IntersectItem = styled.div`
  flex: 1 0 auto;
  padding: 1.25em;
  background: ${({ theme }) => theme.colors.secondary};
  height: 25vh;
`;

export {
  BoardBox,
  BoardItem,
  IntersectBox,
  IntersectFormLayout,
  IntersectItem,
};
