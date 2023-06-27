import React, { CSSProperties } from 'react';
import ReduxRadioGroup from '../../../lib/ReduxRadioGroup';
import ReduxTextInput from '../../../lib/ReduxTextInput';

const CallBash = (
  {id, inputs, customStyles}
  :
  {
    id:string,
    inputs:Record<string, unknown> | undefined,
    customStyles?: CSSProperties & { '--highlight': string }
  }) => {

const bashFunctionModes = [
    {
        value:'bash-function-direct',
        label:'Direct',
    },
    {
        value:'bash-function-property',
        label:'Via property of msg or globals',
    }
    ]
  return (
    <div title="call-bash"> 
      <ReduxRadioGroup 
        id={id}
        inputs={inputs}
        title="Where does the function come from?"
        options={bashFunctionModes}
        stateKey="bashFunctionMode"
        defaultValue="bash-function-direct"
        customStyles={customStyles}
      />
      {
        inputs?.bashFunctionMode as string !== 'bash-function-property' &&
        <ReduxTextInput
          id={id}
          inputs={inputs}
          placeholder="tree"
          stateKey="bashFunction"
        />
      }
      {
        inputs?.bashFunctionMode as string === 'bash-function-property' &&
        <ReduxTextInput
          id={id}
          inputs={inputs}
          placeholder="msg.payload.function"
          stateKey="bashFunctionPath"
        />
      }
    </div>
  );
};

export default CallBash;
