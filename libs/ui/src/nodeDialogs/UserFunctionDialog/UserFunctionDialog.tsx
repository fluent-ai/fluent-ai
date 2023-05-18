import { useDispatch, useSelector } from "react-redux";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowRunnerActions, flowRunnerSelectors } from "@tool-ai/state";

function UserFunctionDialog({id}:{id:string}) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowRunnerSelectors.selectInput(id));

  return (
    <InnerDialogStructure
      title="User Function"
      description="user function description"
    >
      <textarea
        className="border-2 border-gray-light border-solid rounded-md w-full"
        placeholder="Write your function here..."
        rows={10}
        cols={100}
        // value={node?.props ? node.props.userFunction : ''}
        value={inputs?.nodeInputs.userFunction as string}
        onChange={          (event) => {
          dispatch(
            flowRunnerActions.setInput(
              {
                id,
                nodeInputs: { userFunction:event.target.value}
              }
            )
          )
          }} />
    </InnerDialogStructure>
  );
}

export { UserFunctionDialog };
