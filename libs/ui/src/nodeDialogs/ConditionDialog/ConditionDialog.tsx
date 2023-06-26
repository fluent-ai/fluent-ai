import { flowActions, flowSelectors } from "@tool-ai/state";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../lib/SelectComponent/SelectComponent";
import styles from '../Dialog.module.css';
import Switch from "../../lib/SwitchComponent/SwitchComponent";
import RadioGroup from "../../lib/RadioGroupComponent/RadioGroupComponent";

function ConditionDialog({id}:{id:string}){
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
      value:'condition',
      label:'Direct',
      description:<div>
      <p>Edit the text to be sent directly from the flow</p>
      </div>
    }
  ]

  if (inputs?.location === undefined) {
    dispatch(flowActions.setInput({id, nodeInputs:{...inputs,location:'msg.payload'}}))
  }
  if (inputs?.operator === undefined) {
    dispatch(flowActions.setInput({id, nodeInputs:{...inputs,operator:'is'}}))
  }
  if (inputs?.query === undefined) {
    dispatch(flowActions.setInput({id, nodeInputs:{...inputs,query:''}}))
  }

  const location = inputs?.location as string || 'msg.payload';
  const operator = inputs?.operator as string || 'is';
  const query = inputs?.query as string || '';

  const operators = [
    {
      value:'is',
      label:'is'
    },
    {
      value:'is-not',
      label:'is not'
    },
    {
      value:'contains',
      label:'contains'
    },
    {
      value:'does-not-contain',
      label:'does not contain'
    },
    {
      value:'starts-with',
      label:'starts with'
    },
    {
      value:'ends-with',
      label:'ends with'
    }
  ]



  const customStyles = {'--highlight': 'hsla(91, 60%, 66%, 1.0)'}


  return (
    <InnerDialogStructure
    title="Condition"
    description="Condition test">
      
      <div title="Condition">
      <p>Allow the execution chain to pass on to the next node when </p>
      <input
        style={{width:'20%'}}
        className={styles.TextInput}
        type="text"
        value={location}
        placeholder="location"
        onChange={
          (event) => {
            dispatch(
              flowActions.setInput(
                {
                  id,
                  nodeInputs: {...inputs,  location:event.target.value}
                }
              )
            )
            }
          }
        />
      <Select
        options={operators}
        placeholder={"operator"}
        value={operator}
        onChange={
          (value) => {
            dispatch(
              flowActions.setInput(
                {
                  id,
                  nodeInputs: {...inputs, operator:value}
                }
              )
            )
            }
          }
          />
      <input
        className={styles.TextInput}
        style={{width:'20%'}}
        type="text"
        value={query}
        placeholder="query"
        onChange={
          (event) => {
            dispatch(
              flowActions.setInput(
                {
                  id,
                  nodeInputs: {...inputs,  query:event.target.value}
                }
              )
            )
            }
          }
        />
      </div>
      <div title="Options"> 
        <RadioGroup
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

export {ConditionDialog};
