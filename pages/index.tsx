import { Layouts } from "components/styles/sharedStyles";

import ListForm from "components/ListForm/listForm";
import ListLayout from "components/ListLayout";
import ColorForm from "components/ColorForm/colorForm";
import IntersectForm from "components/IntersectForm/intersectForm";

const IndexPage = ({ ...props }) => {
  return (
    <Layouts>
      <div>
        <ListForm result={props.result} />
      </div>
      <div>
        <ColorForm />
      </div>
      <div>
        <IntersectForm />
      </div>
    </Layouts>
  );
};

export default IndexPage;

IndexPage.Layout = ListLayout;
