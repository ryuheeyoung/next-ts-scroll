import styled from "styled-components";

const ColorFormLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 5px;
  cursor: default;
  text-shadow: 0 0 2px ${({ theme }) => theme.colors.white};
`;
const ColorItem = styled.div<{ background?: string }>`
  background: ${(props) => props.background || props.theme.colors.primary};
  box-shadow: 0 0 2px ${({ theme }) => theme.colors.primary}};
  flex: 1 1 0;
  padding: 1.25em;
  margin-right: 9px;
  display: flex;
  justify-content: center;
  ${(props) => !props.background && `opacity: 0.8;`}
  &:hover {
    ${(props) =>
      props.background &&
      `
      scale: 1.02;
      box-shadow: 0 0 4px ${props.theme.colors.highlight}};
    `}
  }
`;
const EmptyItem = styled.div`
  flex: 1 1 0;
  padding: 1.25em;
  text-align: center;
  justify-content: center;
`;

export { ColorFormLayout, ColorItem, EmptyItem };
