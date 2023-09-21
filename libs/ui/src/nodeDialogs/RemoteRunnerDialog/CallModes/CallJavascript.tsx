import React, { CSSProperties } from 'react';
import ReduxRadioGroup from '../../../lib/ReduxRadioGroup';
import ReduxTextInput from '../../../lib/ReduxTextInput';

const CallJavascript = ({
  nodeId,
  inputs,
  customStyles,
}: {
  nodeId: string;
  inputs: Record<string, unknown> | undefined;
  customStyles?: CSSProperties & { '--highlight': string };
}) => {
  const javascriptModes = [
    {
      value: 'javascript-direct',
      label: 'Direct',
    },
    {
      value: 'javascript-property',
      label: 'Via property of msg or globals',
    },
  ];

  return (
    <div title="call-javascript">
      <ReduxRadioGroup
        nodeId={nodeId}
        inputs={inputs}
        title="Where does the code come from?"
        options={javascriptModes}
        stateKey="javascriptMode"
        defaultValue="javascript-direct"
        customStyles={customStyles}
      />
      {(inputs?.javascriptMode as string) !== 'javascript-property' && (
        <ReduxTextInput
          nodeId={nodeId}
          inputs={inputs}
          placeholder="tree"
          stateKey="javascript"
        />
      )}
      {(inputs?.javascriptMode as string) === 'javascript-property' && (
        <ReduxTextInput
          nodeId={nodeId}
          inputs={inputs}
          placeholder="msg.payload.code"
          stateKey="javascriptPath"
        />
      )}
    </div>
  );
};

export default CallJavascript;
