import { useSelector } from "react-redux";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowRunnerSelectors } from "@tool-ai/state";

/* eslint-disable-next-line */
export interface DownloadDialogProps {}

function DownloadDialog({id}:{id:string}) {
  const outputs = useSelector(flowRunnerSelectors.selectOutput(id));

  function encodeFile(text:string) {
    return 'data:application/octet-stream;charset=utf-8,' + encodeURIComponent(text);
  }

  return (
    <InnerDialogStructure
    title="Download Node"
    description={'download node'}>
      <a href={encodeFile(JSON.stringify(outputs?.msg.payload) as string)}>result.txt</a>
      {/* <div>{JSON.stringify(outputs?.msg.payload || {},null,2)}</div> */}
    </InnerDialogStructure>
  );
}

export {DownloadDialog};
