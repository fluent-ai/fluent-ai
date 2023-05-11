import React, {useState} from 'react';
import NodeItemSideBar from '../NodeItemSideBar/NodeItemSideBar';
import { FileIcon, MixIcon, DoubleArrowRightIcon, ArrowRightIcon, ArrowLeftIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons';

const NodeSideBar = () => {
  const [open, setOpen] = useState(false);
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='flex absolute z-10 h-min top-20'>
  <aside className={`px-2 py-2.5 rounded-md bg-white  border-2 border-inherit ${open ? 'w-60': 'w-12 overflow-hidden'}`}>
    <div className='flex gap-x-3'><div className='sidebar-icon'><MagnifyingGlassIcon /></div><input className='w-100 border-2 border-inherit rounded-md' type="search" aria-label="search nodes" placeholder="Search nodes" ></input></div>
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'textInput')} title="Text Input" icon={<DoubleArrowRightIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'json')} title="JSON" icon={<FileIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'template')} title="Template" icon={<DoubleArrowRightIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'userFunction')} title="User Function" icon={<DoubleArrowRightIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'preview')} title="Preview" icon={<DoubleArrowRightIcon />} />
  </aside>
  {open ?
  <div
  className='expand-icon z-12 left-40 flex items-center transition-all ease-in-out duration-200m text-black bg-white'
  onClick={() => setOpen(false)}><ArrowLeftIcon /></div>
  :
  <div
    className='expand-icon z-12 left-40 bg-transparent text-transparent flex items-center transition-all ease-in-out duration-200ms hover:text-black hover:bg-white'
    onClick={() => setOpen(true)}><ArrowRightIcon /></div>
  }
</div>
  );
};

export default NodeSideBar;
