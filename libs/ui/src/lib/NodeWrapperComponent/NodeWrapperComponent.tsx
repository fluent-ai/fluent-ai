/* eslint-disable-next-line */
import React, { memo, useContext } from 'react';
import { Handle, Position } from 'reactflow';
import { NodeWrapperComponentProps } from '../../types';

function NodeWrapperComponent(props: NodeWrapperComponentProps) {
  return (
      <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#444' }}

        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={props.isConnectable}
      />
      <div onClick={()=>props.setIsDialogOpen(true)}>{props.data.label}</div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{top: 'auto', background: '#555' }}
        isConnectable={props.isConnectable}
      />
    </>
  );
}

export {NodeWrapperComponent};




