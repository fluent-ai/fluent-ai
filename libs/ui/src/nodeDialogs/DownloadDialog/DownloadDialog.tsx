import { useSelector } from "react-redux";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowRunnerSelectors } from "@tool-ai/state";

/* eslint-disable-next-line */
export interface DownloadDialogProps {}

function DownloadDialog({id}:{id:string}) {
  const outputs = useSelector(flowRunnerSelectors.selectOutput(id));
  console.log('$$$$', outputs);
  return (
    <InnerDialogStructure
    title="Download Node"
    description={'download node'}>
    <div>{JSON.stringify(outputs?.nodeOutputs.payload || {},null,2)}</div>

    </InnerDialogStructure>
  );
}

export {DownloadDialog};
