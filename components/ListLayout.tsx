import Head from "next/head";
import styled from "styled-components";
import { LayoutProps } from "./Layout";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: calc(100vh - 16px);
  align-items: center;
`;
const Title = styled.h1`
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
  color: ${(props) => props.theme.colors.primary};
  text-shadow: 0 0 2px ${(props) => props.theme.colors.white};
  text-align: center;
  flex: 1 1 0;
`;
const Content = styled.div`
  flex: 15 0 90vh;
  overflow: hidden;
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
