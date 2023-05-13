import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { NodeDialogProps } from "../../types";
import { handleChange } from "../functions";
/* eslint-disable-next-line */
// export interface TemplateDialogProps {}

function TemplateDialog(props: NodeDialogProps) {
  const node = props.nodes.find(nodes => nodes.id === props.activeNodeId);

  return (
    <InnerDialogStructure
    title="Template"
    description="template description" >
      <textarea
        className="border-2 border-gray-light border-solid rounded-md w-full"
        placeholder="Write your template here..."
        rows={10}
        cols={100}
        value={node?.props ? node.props.template : ''}
        onChange={(event) => handleChange(
          props.nodes,
          props.setNodes,
          props.activeNodeId,
          event.target.value,
          'template')}/>
    </InnerDialogStructure>
  );
}

export {TemplateDialog};
