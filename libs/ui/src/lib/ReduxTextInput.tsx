import { useDispatch } from "react-redux";
import { flowActions } from "@tool-ai/state";
import styles from '../styles.module.css';
import { useEffect } from "react";

const ReduxTextInput = (
  {nodeId, inputs, placeholder, stateKey}:  {
    nodeId:string,
    inputs:Record<string, unknown> | undefined,
    placeholder:string,
    stateKey:string
  }
  ) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputs?.[stateKey] === undefined) {
      dispatch(flowActions.setInput({ id:nodeId, nodeInputs: {...inputs, [stateKey]: placeholder} }))
    }
  }, [dispatch, inputs, nodeId, placeholder, stateKey])




  return (
    <div>
      <input
        className={styles.TextInput}
        placeholder={placeholder}
        type="text"
        value={inputs?.[stateKey] as string ?? placeholder}
        onChange={(event) => dispatch(flowActions.setInput({ id:nodeId, nodeInputs: {...inputs, [stateKey]: event.target.value} }))}
      />
    </div>
  );
};

export default ReduxTextInput;
