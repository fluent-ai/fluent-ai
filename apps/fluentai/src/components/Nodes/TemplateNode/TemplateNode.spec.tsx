import React, { memo, useContext } from 'react';
import { Handle, Position } from 'reactflow';
import NodeDialogComponent from '../../UI/NodeDialogComponent/NodeDialogComponent';
import './CustomNodesStyles.css';
import * as Dialog from '@radix-ui/react-dialog';
import Context from '../../context/context';

interface Data {
  label:string
}
interface MemoProps {
  isConnectable: boolean;
  data: Data
}
export default memo (({data, isConnectable}: MemoProps) => {
  const {setIsDialogOpen} = useContext(Context);
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div onClick={()=>setIsDialogOpen(true)}>{data.label}</div>

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