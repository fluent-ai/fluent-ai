import { useDispatch, useSelector } from "react-redux";
import Editor from '@monaco-editor/react';
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowActions, flowRunnerSelectors, flowSelectors } from "@tool-ai/state";
import ReduxTextInput from "../../lib/ReduxTextInput";
import styles from '../../styles.module.css';

function UserFunctionDialog({nodeId}:{nodeId:string}) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(nodeId));
  const state  = useSelector(flowRunnerSelectors.selectState(nodeId));

  if (inputs?.userFunction === undefined) {
    dispatch(
      flowActions.setInput(
        {
          id:nodeId,
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

      <div>
        {state?.state?.status as string === 'error' &&
          <div className={styles.Error}>
            <b>Error</b>
            <br/>
            {state?.state?.error as string}
          </div>
        }
        <ReduxTextInput
        nodeId={nodeId} 
        inputs={inputs}
        placeholder={inputs?.title as string || 'userFunction'}
        stateKey="title"
        />
      <Editor
      height="90vh"
      defaultLanguage="javascript"
      value={inputs?.userFunction as string}
      onChange={          (value) => {
        dispatch(
          flowActions.setInput(
            {
              id:nodeId,
              nodeInputs: {...inputs,  userFunction:value}
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
      </div>

    </InnerDialogStructure>
  );
}

export { UserFunctionDialog };
