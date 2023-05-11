/* eslint-disable-next-line */
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { NodeDialogProps } from "../../types";
import { handleChange } from '../functions';



function InputDialog(props: NodeDialogProps) {
  return (
    <InnerDialogStructure
    title="Text Input"
    description="text input description">
      <textarea
        className="border-2 border-gray-light border-solid rounded-md w-full"
        placeholder="input your text"
        rows={10}
        cols={100}
        onChange={(event) => handleChange(
          props.nodes,
          props.setNodes,
          props.activeNodeId,
          event.target.value,
          'input')} />
    </InnerDialogStructure>
  );
}

export {InputDialog};
