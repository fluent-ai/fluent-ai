import React, { memo, useContext } from 'react';
import { Handle, Position } from 'reactflow';
import '../CustomNodesStyles.css';
import * as Dialog from '@radix-ui/react-dialog';
import Context from '../../context/context';
import { NodeData, groups} from '../../../nodeData';
import { useSelector } from 'react-redux';
import { flowRunnerSelectors } from '@tool-ai/state';

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
  const {setIsDialogOpen, setActiveDialog, setActiveNodeId} = useContext(Context);
  const status = useSelector(flowRunnerSelectors.selectState(id))?.state?.status as string || 'ready';
  // {JSON.stringify(state?.status || 'ready')}
  function getIcon () {
    return NodeData.find(nodeItem => nodeItem.label == data.label);
  }
  function getColor () {
    return groups.find(nodeGroup => nodeGroup.id == data.group);
  }

  function getStatusColor() {
    let color = '585858';
    switch (status) {
      case 'ready':
        color = '#ffffff';
        break;
      case 'running':
        color = '#ff9c7a';
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
      <div onClick={()=>{
        setIsDialogOpen(true);
        setActiveDialog(type);
        setActiveNodeId(id)
        }}
        className='flex items-center relative'>
          
        <div
          className={`node h-full w-[20%] rounded-tl-[6px] rounded-bl-[6px] p-2.5 flex justify-center`}
          style={{backgroundColor: getColor()?.color}}>{getIcon()?.icon}
        </div>
        <div className='pl-2.5'>{data.label}</div>
        {/* <div className='pl-2.5'>{status}</div> */}
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