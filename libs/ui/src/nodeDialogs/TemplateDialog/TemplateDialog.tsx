import { useDispatch, useSelector } from "react-redux";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowRunnerActions, flowRunnerSelectors } from "@tool-ai/state";
/* eslint-disable-next-line */
// export interface TemplateDialogProps {}

function TemplateDialog({id}:{id:string}) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowRunnerSelectors.selectInput(id));

  return (
    <InnerDialogStructure
    title="Template"
    description="template description" >
      <textarea
        className="border-2 border-gray-light border-solid rounded-md w-full"
        placeholder="Write your template here..."
        rows={10}
        cols={100}
        // value={node?.props ? node.props.template : ''}
        value={inputs?.nodeInputs.template as string}
        onChange={          (event) => {
          dispatch(
            flowRunnerActions.setInput(
              {
                id,
                nodeInputs: { template:event.target.value}
              }
            )
          )
          }}/>
    </InnerDialogStructure>
  );
}

export {TemplateDialog};
