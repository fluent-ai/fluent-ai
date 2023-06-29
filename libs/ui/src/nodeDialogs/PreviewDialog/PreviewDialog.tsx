import { useDispatch, useSelector } from "react-redux";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { flowActions, flowRunnerSelectors, flowSelectors } from "@tool-ai/state";
import RadioGroup from "../../lib/RadioGroupComponent/RadioGroupComponent";
import styles from '../../styles.module.css';
import Switch from "../../lib/SwitchComponent/SwitchComponent";
import { useState } from "react";


function PreviewDialog({nodeId}:{nodeId:string}) {
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(nodeId));
  const output = useSelector(flowRunnerSelectors.selectOutput(nodeId));

  if (inputs?.titlePath === undefined) {
    dispatch(flowActions.setInput({id:nodeId, nodeInputs:{...inputs,titlePath:'msg.payload'}}))
  }

  const titlePath = inputs?.titlePath as string || 'msg.payload';
  const titleString = inputs?.title as string || 'Preview';
  const titleMode = inputs?.titleMode as string || 'custom';

  const [editingDisabled, setEditingDisabled] = useState(titleMode === 'from-msg');

  const titleModes = [
    {
      value:'custom',
      label:'Custom',
      description:
      <p>Displays a user settable string, by default "Preview"</p>
    },
    {
      value:'from-msg',
      label:'From msg object',
      description:<div>
      <p>Displays a property from the <code>msg</code> object</p>
      </div>
    }
  ]

  const dialogMode = inputs?.dialogMode as string || 'simple';
  const dialogModes = [
    {
      value:'simple',
      label:'Simple',
      description:
      <p>Displays the contents of <code>msg.payload</code></p>
    },
    {
      value:'full',
      label:'Full',
      description:<div>
      <p>displays the complete <code>msg</code> object</p>
      </div>
    }
  ]




  const customStyles = {'--highlight': 'hsla(91, 60%, 66%, 1.0)'}


  return (
    <InnerDialogStructure
    title="Preview"
    description="preview description">
      <div title="Preview">
        {
          output? <pre><code>{
            JSON.stringify(
              inputs?.dialogMode === 'full' ?
              output : output?.msg?.payload,null,2)
            .split('\n').map((item, i) => <p key={i}>{item}</p>)
            }</code></pre> : "Nothing to preview"
        }
      </div>
      <div title="Options"> 
        <Switch
          disabled={editingDisabled}
          size="small"
          label="Editable on node / in place"
          checked={inputs?.editable as boolean || false}
          customStyles={customStyles}
          onCheckedChange={
            (value) => {
              dispatch(
                flowActions.setInput(
                  {
                    id:nodeId,
                    nodeInputs: {...inputs,  editable:value}
                  }
                )
              )
              }
            }
          />
        <br/>
        <RadioGroup
          title="Flow view title behavior "
          options={titleModes}
          value={titleMode}
          customStyles={customStyles}
          onChange={
            (value) => {
              setEditingDisabled(value === 'from-msg');
              dispatch(
                flowActions.setInput(
                  {
                    id:nodeId,
                    nodeInputs: {...inputs,  titleMode:value, editable:false}
                  }
                )
              )
              }
            }
          size="small"
          />
          <br/>
          { titleMode === 'custom' &&
            <div>
              <p><b>String to display</b></p>
              <input
              className={styles.TextInput}
              type="text"
              value={titleString}
              placeholder="Preview"
              onChange={
                (event) => {
                  dispatch(
                    flowActions.setInput(
                      {
                        id:nodeId,
                        nodeInputs: {...inputs,  title:event.target.value}
                      }
                    )
                  )
                  }
                }
              />
            </div>
          }
          { titleMode === 'from-msg' &&
            <div>
              <p><b>Path to property</b></p>
              <input
              className={styles.TextInput}
              type="text"
              value={titlePath}
              placeholder="msg.payload"
              onChange={
                (event) => {
                  dispatch(
                    flowActions.setInput(
                      {
                        id:nodeId,
                        nodeInputs: {...inputs,  titlePath:event.target.value}
                      }
                    )
                  )
                  }
                }
              />
            </div>
          }
          <br/>
          <RadioGroup
          title="Dialog Mode"
          options={dialogModes}
          value={dialogMode}
          customStyles={customStyles}
          onChange={
            (value) => {
              dispatch(
                flowActions.setInput(
                  {
                    id:nodeId,
                    nodeInputs: {...inputs,  dialogMode:value}
                  }
                )
              )
              }
            }
          size="small"
          />
        </div>
    </InnerDialogStructure>
  );
}

export {PreviewDialog};
