import { useSelector } from "react-redux";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowRunnerSelectors } from "@tool-ai/state";
/* eslint-disable-next-line */
export interface DalleGenerationDialogProps {}

interface IOutputs {
  nodeOutputs?: {
    image?: {
      url: string
    }
  };
}
function DalleGenerationDialog({id}:{id:string}) {
  const outputs = useSelector(flowRunnerSelectors.selectOutput(id)) as IOutputs;
  const state = useSelector(flowRunnerSelectors.selectState(id)) as IOutputs;
  console.log(JSON.stringify(outputs, null, 2));
  const url = outputs?.nodeOutputs?.image?.url || ''

  return (
    <InnerDialogStructure
    title="Open AI Dall.e Generation"
    description="Generate an image based on in incoming message (msg.payload) using OpenAI's Dall.e"
    >
      <div>{JSON.stringify(state)}</div>
      <div className="flex flex-col items-center justify-center">
        {url !== '' ? <img src={url} alt="Open AI" /> : <div>Run the flow to generate an image</div>}
      </div>
      


    </InnerDialogStructure>
  );
}

export {DalleGenerationDialog};


