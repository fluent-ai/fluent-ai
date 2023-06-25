import { flowRunnerSelectors } from "@tool-ai/state";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { useSelector } from "react-redux";

function ConditionDialog({id}:{id:string}){

  return (
    <InnerDialogStructure
    title="Condition"
    description="Condition test">
      
      <div>
      </div>
    </InnerDialogStructure>
  );
}

export {ConditionDialog};
