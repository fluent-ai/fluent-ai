import { useDispatch, useSelector } from "react-redux";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowActions, flowRunnerSelectors, flowSelectors } from "@tool-ai/state";
import RadioGroup from "../../lib/RadioGroupComponent/RadioGroupComponent";


function PreviewDialog({id}:{id:string}) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(id));
  const output = useSelector(flowRunnerSelectors.selectOutput(id));

  const mode = inputs?.mode as string || 'simple';

  const modes = [
    {
      value:'simple',
      label:'Simple',
      description:
      <p>Displays the contents of <code>msg.payload</code></p>
    },
    {
      value:'full',
      label:'Full',
      description:<div>
      <p>displays the complete <code>msg</code> object</p>
      </div>
    }
  ]

  return (
    <InnerDialogStructure
    title="Preview"
    description="preview description">
      <div title="Preview">
        {
          output? <pre><code>{
            JSON.stringify(output,null,2)
            .split('\n').map((item, i) => <p key={i}>{item}</p>)
            }</code></pre> : "Nothing to preview"
        }
      </div>
      <div title="Options"> 
        <RadioGroup
          title="Mode"
          options={modes}
          value={mode}
          customStyles={{'--highlight': 'hsla(91, 60%, 66%, 1.0)'}}
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
    </InnerDialogStructure>
  );
}

export {PreviewDialog};
