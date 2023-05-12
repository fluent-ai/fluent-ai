import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { NodeDialogProps } from "../../types";

/* eslint-disable-next-line */
export interface OpenAIDialogProps {}

export function OpenAIDialog(props: NodeDialogProps){
  const node = props.nodes.find(nodes => nodes.id === props.activeNodeId);

  return (
    <InnerDialogStructure
    title="Open Ai"
    description="Open AI description">
      {node.msg? <div>{node.msg}</div> : null}
    </InnerDialogStructure>
  );
}

export default OpenAIDialog;
