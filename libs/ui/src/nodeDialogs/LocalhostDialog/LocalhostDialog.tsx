import { flowActions, flowSelectors } from "@tool-ai/state";
import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
import { useDispatch, useSelector } from "react-redux";
import styles from '../Dialog.module.css';
import Switch from "../../lib/SwitchComponent/SwitchComponent";
import RadioGroup from "../../lib/RadioGroupComponent/RadioGroupComponent";

function getNestedProperty(
  obj: Record<string, unknown>,
  propertyPath: string[]
): unknown {
  try {
    return propertyPath.reduce(
      (
        currentObject: Record<string, unknown> | unknown,
        currentProperty: string
      ) => {
        if (
          typeof currentObject === 'object' &&
          currentObject !== null &&
          currentProperty in currentObject
        ) {
          return (currentObject as Record<string, unknown>)[currentProperty];
        } else {
          throw new Error(`Property ${propertyPath.join('.')} doesn't exist`);
        }
      },
      obj as Record<string, unknown>
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}


function LocalhostDialog({id}:{id:string}){
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(id));

  const titleString = inputs?.title as string || 'Localhost';

  if (inputs?.callMode === undefined) { 
    dispatch(
      flowActions.setInput(
        {
          id,
          nodeInputs: {...inputs,  callMode:'call-reference'}
        }
      )
    )
  } 



  const callModes = [
    {
      value:'call-reference',
      label:'Reference',
      description:
      <p>Call an existing client side function by name</p>
    },
    {
      value:'call-bash',
      label:'Bash',
      description:
      <p>Run a bash command (shell / terminal command) </p>
    },
    {
      value:'call-javascript',
      label:'Javascript',
      description:
      <p>Run a piece of javascript</p>
    }
  ]

  const referenceFunctionModes = [
    {
      value:'reference-function-direct',
      label:'Direct',
    },
    {
      value:'reference-function-property',
      label:'Via property of msg or globals',
    }
  ]
  const referenceArgumentsModes = [
    {
      value:'reference-arguments-direct',
      label:'Direct',
    },
    {
      value:'reference-arguments-property',
      label:'Via property of msg or globals',
    }
  ]

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


  const customStyles = {'--highlight': 'hsla(20, 96%, 69%, 1.0)'}

  return (
    <InnerDialogStructure
    title="Local Host"
    description="LocalHost Bridge test">

    <div title="Settings">
      {/* -------------------------------- Call Mode -------------------------------- */}
    <RadioGroup
      title="Call Mode"
      options={callModes}
      value={inputs?.callMode as string ?? callModes[0].value}
      customStyles={customStyles}
      onChange={
        (value) => {
          dispatch(
            flowActions.setInput(
              {
                id,
                nodeInputs: {...inputs,  callMode:value}
              }
            )
          )
          }
        }
      size="small"
      />
      <div style={{height:'10px'}}/>

      {/* -------------------------------- Reference Mode -------------------------------- */}
      { inputs?.callMode === 'call-reference' && <div title="call-reference"> 
          <RadioGroup
            title="Where does the function name come from?"
            options={referenceFunctionModes}
            value={inputs?.referenceFunctionMode as string ?? 'reference-function-direct'}
            customStyles={customStyles}
            onChange={
              (value) => {
                dispatch(
                  flowActions.setInput(
                    {
                      id,
                      nodeInputs: {...inputs,  referenceFunctionMode:value}
                    }
                  )
                )
                }
              }
            size="small"
            />
          { inputs?.referenceFunctionMode as string !== 'reference-function-property' && 
          <div>
            <div 
              style={{height: '5px'}}
            />
            <input
              className={styles.TextInput}
              type="text"
              value={inputs?.functionName as string ?? 'tree'}
              onChange={
                (event) => {
                  dispatch(
                    flowActions.setInput(
                      {
                        id,
                        nodeInputs: {...inputs,  functionName:event.target.value}
                      }
                    )
                  )
                  }
                }
              />
            </div>
            }
          { inputs?.referenceFunctionMode as string === 'reference-function-property' && 
          <div>
            <div 
              style={{height: '5px'}}
            />
            <input
              className={styles.TextInput}
              type="text"
              value={inputs?.functionPath as string ?? 'msg.payload.function'}
              onChange={
                (event) => {
                  dispatch(
                    flowActions.setInput(
                      {
                        id,
                        nodeInputs: {...inputs,  functionPath:event.target.value}
                      }
                    )
                  )
                  }
                }
              />
            </div>
            }
            <div 
              style={{height: '5px'}}
            />

          <RadioGroup
            title="Where do the arguments come from?"
            options={referenceArgumentsModes}
            value={inputs?.argumentsMode as string ?? 'reference-arguments-direct'}
            customStyles={customStyles}
            onChange={
              (value) => {
                dispatch(
                  flowActions.setInput(
                    {
                      id,
                      nodeInputs: {...inputs,  argumentsMode:value}
                    }
                  )
                )
                }
              }
            size="small"
            />
          { inputs?.argumentsMode as string !== 'reference-arguments-property' && 
          <div>
            <div 
              style={{height: '5px'}}
            />
            <input
              className={styles.TextInput}
              type="text"
              value={inputs?.arguments as string ?? "-P '*[^.]*'"}
              onChange={
                (event) => {
                  dispatch(
                    flowActions.setInput(
                      {
                        id,
                        nodeInputs: {...inputs,  argumentsPath:event.target.value}
                      }
                    )
                  )
                  }
                }
              />
            </div>
            }
          { inputs?.argumentsMode as string === 'reference-arguments-property' && 
          <div>
            <div 
              style={{height: '5px'}}
            />
            <input
              className={styles.TextInput}
              type="text"
              value={inputs?.argumentsPath as string ?? 'msg.payload.arguments'}
              onChange={
                (event) => {
                  dispatch(
                    flowActions.setInput(
                      {
                        id,
                        nodeInputs: {...inputs,  argumentsPath:event.target.value}
                      }
                    )
                  )
                  }
                }
              />
            </div>
            }
            <div 
              style={{height: '5px'}}
            />


        </div> 
      }

      {/* -------------------------------- Bash Mode -------------------------------- */}
      { inputs?.callMode === 'call-bash' && <div title="call-bash"> 
          <RadioGroup
            title="Where does the function come from?"
            options={bashFunctionModes}
            value={inputs?.bashFunctionMode as string ?? 'bash-function-direct'}
            customStyles={customStyles}
            onChange={
              (value) => {
                dispatch(
                  flowActions.setInput(
                    {
                      id,
                      nodeInputs: {...inputs,  bashFunctionMode:value}
                    }
                  )
                )
                }
              }
            size="small"
            />
            { inputs?.bashFunctionMode as string !== 'bash-function-property' && 
            <div>
              <div 
                style={{height: '5px'}}
              />
              <input
                className={styles.TextInput}
                type="text"
                value={inputs?.bashFunction as string ?? 'tree'}
                onChange={
                  (event) => {
                    dispatch(
                      flowActions.setInput(
                        {
                          id,
                          nodeInputs: {...inputs,  bashFunction:event.target.value}
                        }
                      )
                    )
                    }
                  }
                />
              </div>
              }
          { inputs?.bashFunctionMode as string === 'bash-function-property' && 
          <div>
            <div 
              style={{height: '5px'}}
            />
            <input
              className={styles.TextInput}
              type="text"
              value={inputs?.bashFunctionPath as string ?? 'msg.payload.function'}
              onChange={
                (event) => {
                  dispatch(
                    flowActions.setInput(
                      {
                        id,
                        nodeInputs: {...inputs,  bashFunctionPath:event.target.value}
                      }
                    )
                  )
                  }
                }
              />
            </div>
            }
          </div>
        }

      {/* -------------------------------- Javascript Mode -------------------------------- */}
      { inputs?.callMode === 'call-javascript' && <div title="call-javascript"> 
          <RadioGroup
            title="Where does the function come from?"
            options={javascriptFunctionModes}
            value={inputs?.javascriptFunctionMode as string ?? 'javascript-function-direct'}
            customStyles={customStyles}
            onChange={
              (value) => {
                dispatch(
                  flowActions.setInput(
                    {
                      id,
                      nodeInputs: {...inputs,  javascriptFunctionMode:value}
                    }
                  )
                )
                }
              }
            size="small"
            />
            { inputs?.javascriptFunctionMode as string !== 'javascript-function-property' && 
            <div>
              <div 
                style={{height: '5px'}}
              />
              <input
                className={styles.TextInput}
                type="text"
                value={inputs?.javascriptFunction as string ?? 'tree'}
                onChange={
                  (event) => {
                    dispatch(
                      flowActions.setInput(
                        {
                          id,
                          nodeInputs: {...inputs,  javascriptFunction:event.target.value}
                        }
                      )
                    )
                    }
                  }
                />
              </div>
              }
          { inputs?.javascriptFunctionMode as string === 'javascript-function-property' && 
          <div>
            <div 
              style={{height: '5px'}}
            />
            <input
              className={styles.TextInput}
              type="text"
              value={inputs?.javascriptFunctionPath as string ?? 'msg.payload.function'}
              onChange={
                (event) => {
                  dispatch(
                    flowActions.setInput(
                      {
                        id,
                        nodeInputs: {...inputs,  javascriptFunctionPath:event.target.value}
                      }
                    )
                  )
                  }
                }
              />
            </div>
            }
          </div>
        }
    </div>
      
    <div title="Options"> 
        <p><b>Title</b></p>
        <input
        className={styles.TextInput}
        type="text"
        value={titleString}
        placeholder="Template"
        onChange={
          (event) => {
            dispatch(
              flowActions.setInput(
                {
                  id,
                  nodeInputs: {...inputs,  title:event.target.value}
                }
              )
            )
            }
          }
        />
      </div>
    </InnerDialogStructure>
  );
}

export {LocalhostDialog};
