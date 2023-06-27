import React, { CSSProperties } from 'react';
import ReduxRadioGroup from '../../../lib/ReduxRadioGroup';
import ReduxTextInput from '../../../lib/ReduxTextInput';

const CallJavascript = (
    {id, inputs, customStyles}
    :
    {
      id:string,
      inputs:Record<string, unknown> | undefined,
      customStyles?: CSSProperties & { '--highlight': string }
    }) => {
  
    const javascriptFunctionModes = [
        {
          value:'javascript-function-direct',
          label:'Direct',
        },
        {
          value:'javascript-function-property',
          label:'Via property of msg or globals',
        }
      ]

    return (
    <div title="call-javascript"> 
      <ReduxRadioGroup 
        id={id}
        inputs={inputs}
        title="Where does the function come from?"
        options={javascriptFunctionModes}
        stateKey="javascriptFunctionMode"
        defaultValue="javascript-function-direct"
        customStyles={customStyles}
      />
      {
        inputs?.javascriptFunctionMode as string !== 'javascript-function-property' &&
        <ReduxTextInput
          id={id}
          inputs={inputs}
          placeholder="tree"
          stateKey="javascriptFunction"
        />
      }
      {
        inputs?.javascriptFunctionMode as string === 'javascript-function-property' &&
        <ReduxTextInput
          id={id}
          inputs={inputs}
          placeholder="msg.payload.function"
          stateKey="javascriptFunctionPath"
        />
      }
    </div>
  );
};

export default CallJavascript;
