/* eslint-disable-next-line */
// import { flowRunnerActions, flowRunnerSelectors } from "@tool-ai/state";
import { flowActions, flowSelectors } from '@tool-ai/state';
import { InnerDialogStructure } from '../../lib/InnerDialogStructure/InnerDialogStructure';
import { useDispatch, useSelector } from 'react-redux';
import ReduxRadioGroup from '../../lib/ReduxRadioGroup';
import ReduxTextInput from '../../lib/ReduxTextInput';
import ReduxSwitch from '../../lib/ReduxSwitch';

function InputDialog({ nodeId }: { nodeId: string }) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(nodeId));

  const titleMode = (inputs?.titleMode as string) || 'custom';
  const titleModes = [
    {
      value: 'custom',
      label: 'Custom',
      description: <p>Displays a user settable string, by default "Preview"</p>,
    },
    {
      value: 'text-input',
      label: 'Direct',
      description: (
        <div>
          <p>Edit the text to be sent directly from the flow</p>
        </div>
      ),
    },
  ];

  const pathMode = (inputs?.pathMode as string) || 'simple';
  const pathModes = [
    {
      value: 'simple',
      label: 'Simple',
      description: <p>Saves the text input to msg.payload</p>,
    },
    {
      value: 'custom',
      label: 'Custom',
      description: (
        <div>
          <p>Saves the text input to a path of your choice</p>
        </div>
      ),
    },
  ];

  const customStyles = { '--highlight': 'hsla(91, 60%, 66%, 1.0)' };

  return (
    <InnerDialogStructure title="Text Input">
      <textarea
        title="Input"
        className="border-2 border-gray-light border-solid rounded-md w-full"
        placeholder="input your text"
        rows={10}
        cols={100}
        value={(inputs?.input as string) || ''}
        onChange={(event) => {
          dispatch(
            flowActions.setInput({
              id: nodeId,
              nodeInputs: { ...inputs, input: event.target.value },
            })
          );
        }}
      />
      <div title="Options">
        <ReduxSwitch
          nodeId={nodeId}
          inputs={inputs}
          stateKey="editable"
          label="Editable on node / in place"
          checked={(inputs?.editable as boolean) || false}
          customStyles={customStyles}
          size="small"
        />
        <ReduxRadioGroup
          nodeId={nodeId}
          inputs={inputs}
          title="Flow view title behavior"
          options={titleModes}
          customStyles={customStyles}
          stateKey="titleMode"
          size="small"
        />
        {titleMode === 'custom' && (
          <div>
            <p>
              <b>String to display</b>
            </p>
            <ReduxTextInput
              nodeId={nodeId}
              inputs={inputs}
              placeholder="Text Input"
              stateKey="title"
            />
          </div>
        )}

        <ReduxRadioGroup
          nodeId={nodeId}
          inputs={inputs}
          title="Where should the input be saved?"
          options={pathModes}
          customStyles={customStyles}
          stateKey="pathMode"
          size="small"
        />
        {pathMode === 'custom' && (
          <div>
            <p>
              <b>Path to save the text input</b>
            </p>
            <ReduxTextInput
              nodeId={nodeId}
              inputs={inputs}
              placeholder="msg.payload"
              stateKey="path"
            />
          </div>
        )}
      </div>
    </InnerDialogStructure>
  );
}

export { InputDialog };
