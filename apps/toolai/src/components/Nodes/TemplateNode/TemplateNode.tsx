import React, { memo, useContext } from 'react';
import { Handle, Position } from 'reactflow';
import '../CustomNodesStyles.css';
import * as Dialog from '@radix-ui/react-dialog';
import Context from '../../context/context';
import { NodeData } from '../../../nodeData';

interface Data {
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

  function getIcon () {
    return NodeData.find(nodeItem => nodeItem.label == data.label);
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
        className='flex items-center'>
        <div className='h-full w-[20%] bg-blue-50 rounded-tl-[6px] rounded-bl-[6px] p-2.5 flex justify-center'>{getIcon()?.icon}</div>
        <div className='pl-2.5'>{data.label}</div>
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