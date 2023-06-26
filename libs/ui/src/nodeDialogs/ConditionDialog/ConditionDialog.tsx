import { flowActions, flowSelectors } from "@tool-ai/state";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../lib/SelectComponent/SelectComponent";
import styles from '../Dialog.module.css';

function ConditionDialog({id}:{id:string}){
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(id));

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
    }
  ]


  return (
    <InnerDialogStructure
    title="Condition"
    description="Condition test">
      
      <div>
      <p>Allow the execution chain to pass on to the next node when </p>
      <input
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
    </InnerDialogStructure>
  );
}

export {ConditionDialog};
