import { flowRunnerSelectors } from "@tool-ai/state";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { useSelector } from "react-redux";

function OpenAIDialog({id}:{id:string}){
  const inputs = useSelector(flowRunnerSelectors.selectOutput(id));
  let response = inputs?.nodeOutputs?.payload as string;
  if(!response) response = 'Run the flow to generate a response'

  return (
    <InnerDialogStructure
    title="Open Ai"
    description="Open AI description">
      
      <div>{
      // replace the linebreaks in the string with <br/> tags
      response.split('\n').map((item, i) => <p key={i}>{item}</p>)
      }
      
      </div>
    </InnerDialogStructure>
  );
}

export {OpenAIDialog};
