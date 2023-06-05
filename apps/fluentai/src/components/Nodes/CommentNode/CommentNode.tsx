import React, { memo, useContext } from 'react';
import { Handle, Position } from 'reactflow';
import '../CustomNodesStyles.css';

export default memo ( () => {

  return (
    <div className='p-1 flex items-center justify-center'>
    <textarea aria-label="comment node" className='focus-visible:outline-none focus-visible:outline-[webkit-focus-ring-color] focus-visible:outline-[1px]' placeholder="Write your comment">
    </textarea>
    </div>
  );
  });