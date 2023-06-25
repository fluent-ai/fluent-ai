import { useDispatch, useSelector } from "react-redux";
import Editor from '@monaco-editor/react';
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowActions, flowSelectors } from "@tool-ai/state";

function UserFunctionDialog({id}:{id:string}) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(id));
  if (inputs?.userFunction === undefined) {
    dispatch(
      flowActions.setInput(
        {
          id,
          nodeInputs: { userFunction:
`// Access the incomming message via the msg object
// Access a cross node global object via global
` }
        }
      )
    )
  }
  

  return (
    <InnerDialogStructure
      title="User Function"
      description="user function description"
    >
      <Editor
      height="90vh"
      defaultLanguage="javascript"
      value={inputs?.userFunction as string}
      onChange={          (value) => {
        dispatch(
          flowActions.setInput(
            {
              id,
              nodeInputs: { userFunction:value}
            }
          )
        )
        }}
        options={{
          tabSize: 2,
          minimap: {
            enabled: false
          },
        }}
      />
    </InnerDialogStructure>
  );
}

export { UserFunctionDialog };
