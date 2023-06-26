/* eslint-disable-next-line */
// import { flowRunnerActions, flowRunnerSelectors } from "@tool-ai/state";
import { flowActions, flowSelectors } from "@tool-ai/state";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { useDispatch, useSelector } from 'react-redux';
import styles from '../Dialog.module.css';
import { useState } from "react";
import Switch from "../../lib/SwitchComponent/SwitchComponent";
import RadioGroup from "../../lib/RadioGroupComponent/RadioGroupComponent";

function InputDialog({id}:{id:string}) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(id));
  
  const titleString = inputs?.title as string || 'Text Input';

  const titleMode = inputs?.titleMode as string || 'custom';


  const titleModes = [
    {
      value:'custom',
      label:'Custom',
      description:
      <p>Displays a user settable string, by default "Preview"</p>
    },
    {
      value:'text-input',
      label:'Direct',
      description:<div>
      <p>Edit the text to be sent directly from the flow</p>
      </div>
    }
  ]


  const customStyles = {'--highlight': 'hsla(91, 60%, 66%, 1.0)'}

  return (
    <InnerDialogStructure
      title="Text Input"
    >
      <textarea
        title="Input"
        className="border-2 border-gray-light border-solid rounded-md w-full"
        placeholder="input your text"
        rows={10}
        cols={100}
        value={inputs?.input as string || ''}
        onChange={
          (event) => {
            dispatch(
              flowActions.setInput(
                {
                  id,
                  nodeInputs: {...inputs, input:event.target.value}
                }
              )
            )
            }
          }
          />
                <div title="Options"> 
        <Switch
          size="small"
          label="Editable on node / in place"
          checked={inputs?.editable as boolean || false}
          customStyles={customStyles}
          onCheckedChange={
            (value) => {
              dispatch(
                flowActions.setInput(
                  {
                    id,
                    nodeInputs: {...inputs,  editable:value}
                  }
                )
              )
              }
            }
          />
        <br/>
        <RadioGroup
          title="Flow view title behavior "
          options={titleModes}
          value={titleMode}
          customStyles={customStyles}
          onChange={
            (value) => {
              dispatch(
                flowActions.setInput(
                  {
                    id,
                    nodeInputs: {...inputs,  titleMode:value, editable:false}
                  }
                )
              )
              }
            }
          size="small"
          />
          <br/>
          { titleMode === 'custom' &&
            <div>
              <p><b>String to display</b></p>
              <input
              className={styles.TextInput}
              type="text"
              value={titleString}
              placeholder="Text Input"
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
          }
        </div>
    </InnerDialogStructure>
  );
}

export { InputDialog };
