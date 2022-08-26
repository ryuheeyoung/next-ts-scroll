import { Layouts } from "components/styles/sharedStyles";

import ListForm from "components/ListForm/ListForm";
import ListLayout from "components/ListLayout";
import ColorForm from "components/ColorForm/ColorForm";

const IndexPage = ({ ...props }) => {
  return (
    <Layouts>
      <div>
        <ListForm result={props.result} />
      </div>
      <div>
        <ColorForm />
      </div>
      <div> hi</div>
    </Layouts>
  );
};

export default IndexPage;

IndexPage.Layout = ListLayout;
