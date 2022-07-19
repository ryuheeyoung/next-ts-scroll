import Head from "next/head";
import styled from "styled-components";
import { LayoutProps } from "./Layout";

const Title = styled.h1`
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
  color: ${(props) => props.theme.colors.primary};
  height: 55px;
  display: flex;
  align-items: center;
  text-shadow: 0 0 2px ${(props) => props.theme.colors.white};
`;

const ListLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>UserList</title>
      </Head>
      <Title>사용자 리스트</Title>
      <main>{children}</main>
    </>
  );
};

export default ListLayout;
