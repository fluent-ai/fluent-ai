import { memo, forwardRef} from 'react';
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
          console.warn(`🚨 Property ${propertyPath.join('.')} doesn't exist`)
          return 'undefined';
        }
      },
      obj as Record<string, unknown>
    );
  } catch (error) {
    console.error(error);
    throw error;
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
export default memo(forwardRef((props:MemoProps, ref) => {
  const { id, data, type, isConnectable } = props;
  const status = useSelector(flowRunnerSelectors.selectState(id))?.state?.status as string || 'ready';
  const dispatch = useDispatch();
  const inputs = useSelector(flowSelectors.getInputsById(id));
  const output = useSelector(flowRunnerSelectors.selectOutput(id));

  let location = ''
  switch (type) {
    case 'textInput':
      location = 'input';
      break;
    case 'preview':
      location = 'title';
  }


  const editable = inputs?.editable as boolean || false;
  let title = inputs?.title as string ?? data.label;  

  if (inputs?.title === '') {
    title = data.label
  }

  if (inputs?.titleMode === 'from-msg' && output?.msg) {
    try {
      title = getNestedProperty(output, (inputs?.titlePath as string)?.split('.') ?? []) as string;
    } catch (error) {
      console.error(error);
    }
  } else if (inputs?.titleMode === 'text-input') {
    title = inputs?.input as string ?? '';
  } else if (inputs?.titleMode === 'condition') {
    title = `${inputs?.location}\n${inputs?.operator}\n${inputs?.query}`;
  }

  const heightFactor = 40 + (Math.ceil(Math.max(title.length, 20*3 ) / 20) - 3) * 12
  
  function getIcon () {
    return NodeData.find(nodeItem => nodeItem.label === data.label);
  }
  function getColor () {
    return groups.find(nodeGroup => nodeGroup.id === data.group);
  }

  function getStatusColor(nodeStatus:string) {
    let color = '#585858';
    switch (nodeStatus) {
      case 'ready':
        color = '#ffffff';
        break;
      case 'running':
        color = '#7aadff';
        break;
      case 'done':
        color = '#c6ffac';
        break;
      case 'error':
        color = 'hsla(0, 100%, 69%, 1.0)';
        break;
    }
    return color;
  }


  return (
    <div style={{height:`${heightFactor}px`}}>
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
          className={`node rounded-tl-[6px] rounded-bl-[6px] p-2.5 flex justify-center items-center`}
          style={{height:`${heightFactor}px`, backgroundColor: getColor()?.color}}>{getIcon()?.icon}
        </div>
        <textarea
          id={`textarea-${id}`}
          aria-label={title}
          disabled={!editable}
          className={`pl-2.5`}
          spellCheck={false}
          style={{
            overflow: 'hidden',
            paddingTop: title.length > 17 ? '5px' : '10px',
            fontSize: title.length > 17 ? '0.5rem' : '0.8rem',
            width: '100%',
            wordWrap: 'break-word',         
            resize: 'none',
            height:`${heightFactor}px`,
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease-in-out',
          }}
          value={title}
          onChange={
            (event) => {
              dispatch(
                flowActions.setInput(
                  {
                    id,
                    nodeInputs: {...inputs,  [location]:event.target.value}
                  }
                )
              )
              }
            }
          />
        
        <div
          className={`bottom-0 right-0 w-10 h-10 rounded-full ${getStatusColor(status)}`}
          style={{
            backgroundColor: getStatusColor(status),
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            animation: `${status === 'running' ? 'pulse' : ''} 0.5s infinite ease-in-out alternate`,
          }}
          ></div>
          <div
            style={{
              position: 'absolute',
              top: '-15px',
              width: '100%',
              // height: '100%',
              fontSize: '10px',
              color: 'hsla(20, 0%, 69%, 0.815)',
            }}
            >{id.split('-')[0] + '...'}</div>
        </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{top: 'auto', background: '#555' }}
        isConnectable={isConnectable}
      />
    </div>
  );
  }));
