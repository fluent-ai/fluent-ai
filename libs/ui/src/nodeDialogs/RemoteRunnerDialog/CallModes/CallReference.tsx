import React, { CSSProperties } from 'react';
import ReduxRadioGroup from '../../../lib/ReduxRadioGroup';
import ReduxTextInput from '../../../lib/ReduxTextInput';

const CallReference = ({
  nodeId,
  inputs,
  customStyles,
}: {
  nodeId: string;
  inputs: Record<string, unknown> | undefined;
  customStyles?: CSSProperties & { '--highlight': string };
}) => {
  const referenceFunctionModes = [
    { value: 'reference-function-direct', label: 'Direct' },
    {
      value: 'reference-function-property',
      label: 'Via property of msg or globals',
    },
  ];

  const referenceArgsModes = [
    { value: 'reference-args-direct', label: 'Direct' },
    {
      value: 'reference-args-property',
      label: 'Via property of msg or globals',
    },
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

      {inputs?.referenceFunctionMode === referenceFunctionModes[0].value && (
        <ReduxTextInput
          nodeId={nodeId}
          inputs={inputs}
          placeholder="tree"
          stateKey="referenceFunctionName"
        />
      )}
      {inputs?.referenceFunctionMode !== referenceFunctionModes[0].value && (
        <ReduxTextInput
          nodeId={nodeId}
          inputs={inputs}
          placeholder="msg.payload.function"
          stateKey="referenceFunctionPath"
        />
      )}

      <ReduxRadioGroup
        nodeId={nodeId}
        inputs={inputs}
        title="Where do the args come from?"
        options={referenceArgsModes}
        stateKey="referenceArgsMode"
        defaultValue={referenceArgsModes[0].value}
        customStyles={customStyles}
      />

      {inputs?.referenceArgsMode === referenceArgsModes[0].value && (
        <ReduxTextInput
          nodeId={nodeId}
          inputs={inputs}
          placeholder="-P '*[^.]*'"
          stateKey="referenceArgs"
        />
      )}
      {inputs?.referenceArgsMode !== referenceArgsModes[0].value && (
        <ReduxTextInput
          nodeId={nodeId}
          inputs={inputs}
          placeholder="msg.payload.args"
          stateKey="referenceArgsPath"
        />
      )}
    </div>
  );
};

export default CallReference;
