import styled from "styled-components";

export const ListFormLayout = styled.ul`
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const ListItem = styled.li`
  box-shadow: 0 0 2px ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  margin: 10px 10px 7px 0;
  padding: 0.5em 1.25em;
  cursor: default;
  &:hover:not(.loader) {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.highlight};
    background: ${({ theme }) => theme.colors.highlight};
  }
  &.loader {
    color: transparent;
    opacity: 0.8;
    & span {
      width: 100%;
      height: 19px;
      background: ${({ theme }) => theme.colors.white};
      opacity: 0.2;
      border-radius: 5px;
    }
  }
  & div {
    display: flex;
    flex-flow: row nowrap;
    gap: 5px;
    > span {
      margin-bottom: 5px;
      :not(.loader) &:nth-child(1) {
        flex: 1 0 48px;
        border-right: 1px solid;
        text-align: right;
        padding-right: 5px;
      }
      :not(.loader) &:nth-child(2) {
        flex: 4 1 0;
      }
    }
  }
`;
