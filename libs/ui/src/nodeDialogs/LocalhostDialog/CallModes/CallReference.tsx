import React, { CSSProperties } from 'react';
import ReduxRadioGroup from '../../../lib/ReduxRadioGroup';
import ReduxTextInput from '../../../lib/ReduxTextInput';

const CallReference = (
  {nodeId, inputs, customStyles}
  :
  {
    nodeId:string,
    inputs:Record<string, unknown> | undefined,
    customStyles?: CSSProperties & { '--highlight': string }
  }) => {

  const referenceFunctionModes = [
    { value:'reference-function-direct', label:'Direct' },
    { value:'reference-function-property', label:'Via property of msg or globals' },
  ];

  const referenceArgumentsModes = [
    { value:'reference-arguments-direct', label:'Direct' },
    { value:'reference-arguments-property', label:'Via property of msg or globals' },
  ];


  return (
    <div title="call-reference">
      <ReduxRadioGroup
        nodeId={nodeId}
        inputs={inputs}
        title="Where does the function name come from?"
        options={referenceFunctionModes}
        stateKey="referenceFunctionMode"
        defaultValue={referenceFunctionModes[0].value}
        customStyles={customStyles}
      />
      
      { inputs?.referenceFunctionMode === referenceFunctionModes[0].value && 
        <ReduxTextInput
          nodeId={nodeId}
          inputs={inputs}
          placeholder="tree"
          stateKey="functionName"
        />
      }
      { inputs?.referenceFunctionMode !== referenceFunctionModes[0].value &&
        <ReduxTextInput
          nodeId={nodeId}
          inputs={inputs}
          placeholder="msg.payload.function"
          stateKey="functionPath"
        />
      }

      <ReduxRadioGroup
        nodeId={nodeId}
        inputs={inputs}
        title="Where do the arguments come from?"
        options={referenceArgumentsModes}
        stateKey="argumentsMode"
        defaultValue={referenceArgumentsModes[0].value}
        customStyles={customStyles}
      />

      { inputs?.argumentsMode === referenceArgumentsModes[0].value && 
        <ReduxTextInput
          nodeId={nodeId}
          inputs={inputs}
          placeholder="-P '*[^.]*'"
          stateKey="argumentsPath"
        />
      }
      { inputs?.argumentsMode !== referenceArgumentsModes[0].value &&
        <ReduxTextInput
          nodeId={nodeId}
          inputs={inputs}
          placeholder="msg.payload.arguments"
          stateKey="argumentsPath"
        />
      }
    </div>
  );
};

export default CallReference;
