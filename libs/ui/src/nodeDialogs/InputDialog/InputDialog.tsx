/* eslint-disable-next-line */
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { NodeDialogProps } from "../../types";
import { handleChange } from '../functions';



function InputDialog(props: NodeDialogProps) {
  const node = props.nodes.find(nodes => nodes.id === props.activeNodeId);

  return (
    <InnerDialogStructure
    title="Text Input"
    description="text input description">
      <textarea
        className="border-2 border-gray-light border-solid rounded-md w-full"
        placeholder="input your text"
        rows={10}
        cols={100}
        value={node?.props ? node.props.input : ''}
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
