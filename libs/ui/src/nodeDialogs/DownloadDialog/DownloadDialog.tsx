import { useSelector } from "react-redux";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowRunnerSelectors } from "@tool-ai/state";
import { download } from '../../../../flow-runner/src/lib/nodeMethods/download';

/* eslint-disable-next-line */
export interface DownloadDialogProps {}

function DownloadDialog({id}:{id:string}) {
  const outputs = useSelector(flowRunnerSelectors.selectOutput(id));
  console.log('$$$$', outputs);

  function encodeFile(text:string) {
    return 'data:text/plain;charset=utf-8,' + encodeURIComponent(text);
  }


  return (
    <InnerDialogStructure
    title="Download Node"
    description={'download node'}>
    <div>{JSON.stringify(outputs?.nodeOutputs.payload || {},null,2)}</div>
    <a href={encodeFile('test')}>result.txt</a>

    </InnerDialogStructure>
  );
}

export {DownloadDialog};
