import { useDispatch, useSelector } from "react-redux";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowActions, flowSelectors, flowRunnerSelectors } from "@tool-ai/state";
import Mustache from 'mustache';
import { useState } from "react";
import styles from '../../styles.module.css'

function TemplateDialog({id}:{id:string}) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(id));
  const state = useSelector(flowRunnerSelectors.selectState(id));
  const outputs = useSelector(flowRunnerSelectors.selectOutput(id));
  const globals = useSelector(flowSelectors.getGlobals);


  const titleString = inputs?.title as string || 'Template';

  const [preview, setPreview] = useState('');

  const onChange:React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setPreview(Mustache.render(event.target.value, {
      globals,
      inputs,
      msg:state?.inputMsg,
    }))
    dispatch(
      flowActions.setInput(
        {
          id,
          nodeInputs: { template:event.target.value}
        }
      )
    )
  
  }


  let displayOutput = ''
  if (typeof outputs?.msg?.payload === 'string') {
    displayOutput = outputs?.msg?.payload
  } else if (typeof outputs?.msg?.payload === 'object') {
    displayOutput = JSON.stringify(outputs?.msg?.payload)
  }

  return (
    <InnerDialogStructure
    title="Template">
      <div title="Info">
      Use  <b>double braces</b>, ie. {' {{ }} '} to insert data into your template.
      <br/> The template node uses the data from the previous node 
      <br/>Place the variable name inside the braces and it will be replaced with the value.
      <br/>For example 
      <pre className="text-sm p-2">
        <code>
          {
            'Hello {{name}}'
          }
        </code>
      </pre>
      will be replaced with
      <pre className="text-sm p-2">
        <code>
          {
            'Hello Sally'
          }
        </code>
      </pre>

      </div>
      <div title="Template">
        <textarea
          className="border-2 border-gray-light border-solid rounded-md w-full"
          placeholder="Write your template here..."
          rows={6}
          cols={100}
          // value={node?.props ? node.props.template : ''}
          value={inputs?.template as string}
          onChange={onChange}/>
            <div>
              <p><b>Preview</b></p>
              <p>Note : The preview runs on the last data the node received and may differ from the output at runtime</p>
              <pre className="text-sm p-2">
                <code>
                  {
                    preview
                  }
                </code>
              </pre>
            </div>
        </div>
        <div title="Output">
          <pre className="text-sm p-2">
            <code>
              {
                displayOutput
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
          placeholder="Template"
          onChange={
            (event) => {
              dispatch(
                flowActions.setInput(
                  {
                    id,
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

export { TemplateDialog };
