import { useDispatch } from "react-redux";
import { flowActions } from "@tool-ai/state";
import styles from '../styles.module.css';

const ReduxTextInput = (
  {id, inputs, placeholder, stateKey}:  {
    id:string,
    inputs:Record<string, unknown> | undefined,
    placeholder:string,
    stateKey:string
  }
  ) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div style={{height: '5px'}}/>
      <input
        className={styles.TextInput}
        type="text"
        value={inputs?.[stateKey] as string ?? placeholder}
        onChange={(event) => dispatch(flowActions.setInput({ id, nodeInputs: {...inputs, [stateKey]: event.target.value} }))}
      />
    </div>
  );
};

export default ReduxTextInput;
