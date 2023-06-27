import { useDispatch, useSelector } from "react-redux";
import { flowActions, flowSelectors } from "@tool-ai/state";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import CallReference from './CallModes/CallReference';
import CallBash from './CallModes/CallBash';
import CallJavascript from './CallModes/CallJavascript';
import ReduxTextInput from "../../lib/ReduxTextInput";
import ReduxRadioGroup from "../../lib/ReduxRadioGroup";

function LocalhostDialog({id}:{id:string}){
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(id));

  const titleString = inputs?.title as string || 'Localhost';

  if (inputs?.callMode === undefined) { 
    dispatch(
      flowActions.setInput(
        {
          id,
          nodeInputs: {...inputs,  callMode:'call-reference'}
        }
      )
    )
  }

  const callModes = [
    {
      value:'call-reference',
      label:'Reference',
    },
    {
      value:'call-bash',
      label:'Bash',
    },
    {
      value:'call-javascript',
      label:'Javascript',
    }
  ]

  const customStyles = {'--highlight': 'hsla(20, 96%, 69%, 1.0)'};

  return (
    <InnerDialogStructure
      title="Local Host"
      description="LocalHost Bridge test"
    >
      <div title="Settings">
        <ReduxRadioGroup 
          id={id} 
          inputs={inputs ?? {}}
          title="Choose a call mode" 
          stateKey={'callMode'} 
          options={callModes} 
          defaultValue="call-reference"
          customStyles={customStyles}
        />
        { inputs?.callMode === 'call-reference' && <CallReference id={id} inputs={inputs} /> }
        { inputs?.callMode === 'call-bash' && <CallBash id={id} inputs={inputs} /> }
        { inputs?.callMode === 'call-javascript' && <CallJavascript id={id} inputs={inputs} /> }
      </div>

      <div title="Options"> 
        <p><b>Title</b></p>
        <ReduxTextInput
          id={id}
          inputs={inputs ?? {}}
          placeholder="Template"
          stateKey="title"
        />
      </div>
    </InnerDialogStructure>
  );
}

export {LocalhostDialog};
