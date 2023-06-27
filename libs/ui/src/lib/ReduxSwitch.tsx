import { useDispatch } from "react-redux";
import { flowActions } from "@tool-ai/state";
import { CSSProperties } from "react";
import Switch from "./SwitchComponent/SwitchComponent";

const ReduxSwitch = (
  {id, inputs, stateKey, size, checked,customStyles, label,disabled}:  {
    id:string,
    inputs:Record<string, unknown> | undefined,
    stateKey:string
    label: string;
    disabled?: boolean;
    checked?: boolean;
    customStyles?: CSSProperties & { '--highlight': string };
    size?: 'small' | 'medium' | 'large';
  }
  ) => {
  const dispatch = useDispatch();

  return (
    <Switch
        size={size ?? 'medium'}
        label={label}
        checked={checked ?? false}
        customStyles={customStyles}
        disabled={disabled}
        onCheckedChange={
            (value) => {
            dispatch(
                flowActions.setInput(
                {
                    id,
                    nodeInputs: {...inputs,  [stateKey]:value}
                }
                )
            )
            }
            }
        />
  );
};

export default ReduxSwitch;
