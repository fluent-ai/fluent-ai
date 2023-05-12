import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { NodeDialogProps } from "../../types";
import { handleChange } from "../functions";
/* eslint-disable-next-line */
export interface UserFunctionDialogProps {}

function UserFunctionDialog(props: NodeDialogProps) {

  return (
    <InnerDialogStructure
    title="User Function"
    description="user function description" >
      <textarea
        className="border-2 border-gray-light border-solid rounded-md w-full"
        placeholder="Write your template here..."
        rows={10}
        cols={100}
        onChange={(event) => handleChange(
          props.nodes,
          props.setNodes,
          props.activeNodeId,
          event.target.value,
          'userFunction')} />
    </InnerDialogStructure>
  );
}

export {UserFunctionDialog};
