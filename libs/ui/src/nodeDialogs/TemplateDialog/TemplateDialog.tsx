import { useDispatch, useSelector } from "react-redux";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowActions, flowSelectors, flowRunnerSelectors } from "@tool-ai/state";

function TemplateDialog({id}:{id:string}) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(id));
  const outputs = useSelector(flowRunnerSelectors.selectOutput(id));

  let displayOutput = ''
  if (typeof outputs?.msg?.payload === 'string') {
    displayOutput = outputs?.msg?.payload
  } else if (typeof outputs?.msg?.payload === 'object') {
    displayOutput = JSON.stringify(outputs?.msg?.payload)
  }

  return (
    <InnerDialogStructure
    title="Template"
    description={
    <div>
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
    }>
      <textarea
        className="border-2 border-gray-light border-solid rounded-md w-full"
        placeholder="Write your template here..."
        rows={10}
        cols={100}
        // value={node?.props ? node.props.template : ''}
        value={inputs?.template as string}
        onChange={          (event) => {
          dispatch(
            flowActions.setInput(
              {
                id,
                nodeInputs: { template:event.target.value}
              }
            )
          )
          }}/>
                <pre className="text-sm p-2">
        <code>
          {
            displayOutput
          }
        </code>
      </pre>
    </InnerDialogStructure>
  );
}

export { TemplateDialog };
