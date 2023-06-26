import React, { memo, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import '../CustomNodesStyles.css';
import { NodeData, groups} from '../../../nodeData';
import {  useDispatch, useSelector } from 'react-redux';
import { flowActions, flowRunnerSelectors, flowSelectors } from '@tool-ai/state';


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
    return undefined;
  }
}

interface Data {
  group: string;
  label: string;
}

interface MemoProps {
  id: string,
  type: string,
  isConnectable: boolean,
  data: Data
}
export default memo (({id, data,type, isConnectable}: MemoProps) => {
  const status = useSelector(flowRunnerSelectors.selectState(id))?.state?.status as string || 'ready';
  // useEffect(() => {
  //   console.log('status', status);
  // }, [status]);


  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(id));
  const output = useSelector(flowRunnerSelectors.selectOutput(id));

  const editable = inputs?.editable as boolean || false;
  let title = inputs?.title as string ?? data.label;

  if (inputs?.titleMode === 'from-msg' && output?.msg) {
    title = getNestedProperty(output, (inputs?.titlePath as string)?.split('.') ?? []) as string;
  }
  
  
  
  function getIcon () {
    return NodeData.find(nodeItem => nodeItem.label === data.label);
  }
  function getColor () {
    return groups.find(nodeGroup => nodeGroup.id === data.group);
  }

  function getStatusColor() {
    let color = '#585858';
    switch (status) {
      case 'ready':
        color = '#ffffff';
        break;
      case 'running':
        color = '#7aadff';
        break;
      case 'done':
        color = '#c6ffac';
        break;
    }
    return color;
  }

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div
        className='flex relative'>
        <div
          className={`node h-full w-[20%] rounded-tl-[6px] rounded-bl-[6px] p-2.5 flex justify-center`}
          style={{backgroundColor: getColor()?.color}}>{getIcon()?.icon}
        </div>
        <input
          type="text"
          aria-label={title}
          disabled={!editable}
          className='pl-2.5'
          value={title}
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
        
        <div
          className={`bottom-0 right-0 w-10 h-10 rounded-full ${getStatusColor()}`}
          style={{
            backgroundColor: getStatusColor(),
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            animation: `${status === 'running' ? 'pulse' : ''} 0.5s infinite ease-in-out alternate`,
          }}
          ></div>
        </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      />
    </>
  );
  });