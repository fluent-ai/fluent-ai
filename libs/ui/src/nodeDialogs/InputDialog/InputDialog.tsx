/* eslint-disable-next-line */
import { flowRunnerActions, flowRunnerSelectors } from "@tool-ai/state";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { useDispatch, useSelector } from 'react-redux';

function InputDialog({id}:{id:string}) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowRunnerSelectors.selectInput(id));

  return (
    <InnerDialogStructure
      title="Text Input"
      description="text input description"
    >
      <textarea
        className="border-2 border-gray-light border-solid rounded-md w-full"
        placeholder="input your text"
        rows={10}
        cols={100}
        value={inputs?.nodeInputs.input as string}
        onChange={
          (event) => {
            dispatch(
              flowRunnerActions.setInput(
                {
                  id,
                  nodeInputs: { input:event.target.value}
                }
              )
            )
            }
          }
          />
    </InnerDialogStructure>
  );
}

export { InputDialog };
