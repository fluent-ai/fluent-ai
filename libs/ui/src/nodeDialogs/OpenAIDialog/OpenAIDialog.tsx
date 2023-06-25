import { flowActions, flowRunnerSelectors, flowSelectors } from "@tool-ai/state";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import RadioGroup from "../../lib/RadioGroupComponent/RadioGroupComponent";
import { useDispatch, useSelector } from "react-redux";

function OpenAIDialog({id}:{id:string}){
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(id));
  const outputs = useSelector(flowRunnerSelectors.selectOutput(id));
  const mode = inputs?.mode as string || 'simple';
  let response = outputs?.nodeOutputs?.payload as string;
  if(!response) response = 'Run the flow to generate a response'
  
  const modes = [
    {
      value:'simple',
      label:'Simple',
      description:
      <p>Returns the response as a string in <code>msg.payload</code></p>
    },
    {
      value:'conversation',
      label:'Conversation',
      description:<div>
      <p>The node expects msg.payload to follow openAI's
      <a href='https://platform.openai.com/docs/api-reference/chat' style={{textDecoration:'underline'}}> chat completion spec 🔗</a>.
      New messages are appended to the messages property, allowing you to chain nodes to form a conversation</p>
      </div>
    }
  ]

  return (
    <InnerDialogStructure
    title="Open Ai"
    description="Open AI description">
      <div title="Options">
        <b>Input</b>
        <p>The openAI node expects a payload on the msg object (as most nodes). <code>msg.payload</code> can be either a string or an object.</p>
        <br/>
          <RadioGroup
          title="Mode"
          options={modes}
          value={mode}
          onChange={
            (value) => {
              console.log('change', value);
              dispatch(
                flowActions.setInput(
                  {
                    id,
                    nodeInputs: { mode:value}
                  }
                )
              )
              }
            }
          size="small"
          />
        </div>

      
      <div title="Output">{
      // replace the linebreaks in the string with <br/> tags
      // response.split('\n').map((item, i) => <p key={i}>{item}</p>)
      JSON.stringify(response, null, 2)
      }
      
      </div>
    </InnerDialogStructure>
  );
}

export {OpenAIDialog};
