import styled from "styled-components";
import ListForm from "../components/ListForm";
import ListLayout from "../components/ListLayout";

const Layouts = styled.div`
  display: flex;
  flex-flow: row wrap;
  height: 100%;
`;

const IndexPage = ({ ...props }) => {
  return (
    <Layouts>
      <ListForm result={props.result} />
      <div>hello</div>
    </Layouts>
  );
};

export default IndexPage;

IndexPage.Layout = ListLayout;
