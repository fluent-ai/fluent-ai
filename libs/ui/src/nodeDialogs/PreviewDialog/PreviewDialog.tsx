import { useSelector } from "react-redux";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowRunnerSelectors } from "@tool-ai/state";


function PreviewDialog({id}:{id:string}) {
  const output = useSelector(flowRunnerSelectors.selectOutput(id));

  return (
    <InnerDialogStructure
    title="Preview"
    description="preview description">
      {output? <div>{JSON.stringify(output)}</div> : null}
    </InnerDialogStructure>
  );
}

export {PreviewDialog};
