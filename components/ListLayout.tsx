import Head from "next/head";
import styled from "styled-components";
import { LayoutProps } from "./Layout";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100vh;
  padding: 8px;
  align-items: center;
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.colors.dark};
  text-shadow: 0 0 2px ${({ theme }) => theme.colors.highlight};
  text-align: center;
  flex: 1 1 0;
`;
const Content = styled.div`
  flex: 15 1 calc(100% - 16px);
  overflow: hidden;
  display: flex;
  width: 100%;
}
`;

const ListLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>UserList</title>
      </Head>

      <Main>
        <Title>사용자 리스트</Title>
        <Content>{children}</Content>
      </Main>
    </>
  );
};

export default ListLayout;
