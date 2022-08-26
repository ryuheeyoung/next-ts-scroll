import styled from "styled-components";

const Layouts = styled.div`
  display: flex;
  position: relative;
  flex-flow: row wrap;
  height: 100%;
  padding: 1.25em;
  flex: auto;
  gap: 1.5em;
  & > div {
    height: 100%;
    margin: 0;
    overflow: auto;
    border-radius: 5px;
    padding: 0.25em;
    color: ${({ theme }) => theme.colors.dark};
    &:nth-child(1) {
      flex: 3 0 200px;
      box-shadow: 0 0 5px ${({ theme }) => theme.colors.highlight};
      background: ${({ theme }) => theme.colors.primary};
    }
    &:nth-child(2) {
      flex: 2 0 0;
      box-shadow: 0 0 5px ${({ theme }) => theme.colors.secondary};
      background: ${({ theme }) => theme.colors.secondary};
    }
    &:nth-child(3) {
      flex: 2 0 0;
      box-shadow: 0 0 5px ${({ theme }) => theme.colors.point};
      background: ${({ theme }) => theme.colors.point};
    }
  }
`;

export { Layouts };
