import { useDispatch, useSelector } from "react-redux";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowActions, flowRunnerSelectors, flowSelectors } from "@tool-ai/state";
import styles from '../../styles.module.css'

function JsonDialog({nodeId}:{nodeId:string}) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(nodeId));
  const outputs = useSelector(flowRunnerSelectors.selectOutput(nodeId));

  const titleString = inputs?.title as string || 'JSON';


  return (
    <InnerDialogStructure
    title="JSON">
      <div title="Description">
        JavaScript Object Notation is a lightweight data-interchange format.
        <br/>For example
        <pre className="text-sm p-2">
          <code>
            {
              JSON.stringify({name: "Sally", age: 31, city: "Berlin"},null,2).split('\n').map((item, i) => <p key={i}>{item}</p>)
            }
          </code>
        </pre><b>Usage</b>
        <br/> If the JSON Node receives a string, it tries to parse it as JSON.
        <br/> If the JSON Node receives an object, it tries to stringify it as JSON.
      </div>
      <div title="Output">
      <pre className="text-sm p-2">
        <code>
          {
            JSON.stringify(outputs?.msg || {},null,2).split('\n').map((item, i) => <p key={i}>{item}</p>)
          }
        </code>
      </pre>
      </div>
      <div title="Options"> 
        <div>
          <p><b>Title</b></p>
          <input
          className={styles.TextInput}
          type="text"
          value={titleString}
          placeholder="JSON"
          onChange={
            (event) => {
              dispatch(
                flowActions.setInput(
                  {
                    id:nodeId,
                    nodeInputs: {...inputs,  title:event.target.value}
                  }
                )
              )
              }
            }
          />
        </div>
          
        </div>

    </InnerDialogStructure>
  );
}

export {JsonDialog};

