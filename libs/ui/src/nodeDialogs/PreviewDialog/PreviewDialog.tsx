import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { NodeDialogProps } from "../../types";
/* eslint-disable-next-line */
//export interface PreviewDialogProps {}

function PreviewDialog(props:NodeDialogProps) {
  const node = props.nodes.find(nodes => nodes.id === props.activeNodeId);

  return (
    <InnerDialogStructure
    title="Preview"
    description="preview description">
      {node.msg? <div>{node.msg}</div> : null}
    </InnerDialogStructure>
  );
}

export {PreviewDialog};
