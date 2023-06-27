import React, { CSSProperties } from 'react';
import { useDispatch } from "react-redux";
import { flowActions } from "@tool-ai/state";
import RadioGroup from "./RadioGroupComponent/RadioGroupComponent";



const ReduxRadioGroup = (
  {id, inputs, title, options, stateKey, defaultValue, customStyles,size}
  :
  {
    id:string,
    inputs:Record<string, unknown> | undefined, 
    title:string,
    options:{value:string, label:string}[],
    stateKey:string,
    defaultValue?:string,
    customStyles?: CSSProperties & { '--highlight': string }
    size?: 'small' | 'medium' | 'large'
  }) => {
  const dispatch = useDispatch();

  if (!defaultValue) {
    defaultValue = options[0].value;
  }


  return (
    <RadioGroup
      title={title}
      options={options}
      value={inputs?.[stateKey] as string ?? defaultValue}
      customStyles={customStyles}
      onChange={(value) => dispatch(flowActions.setInput({ id, nodeInputs: {...inputs, [stateKey]: value} }))}
      size={size ?? 'medium'}
    />
  );
};

export default ReduxRadioGroup;
