import React, {useState} from 'react';
import NodeItemSideBar from '../NodeItemSideBar/NodeItemSideBar';
import { FileIcon, MixIcon, TextIcon, DoubleArrowRightIcon, ArrowRightIcon, ArrowLeftIcon, FrameIcon, MagnifyingGlassIcon, CameraIcon, GlobeIcon } from '@radix-ui/react-icons';
import {ReactComponent as OpenAiLogo}  from  '../../../assets/OpenAI_Logo.svg';
import {ReactComponent as DeeplLogo}  from  '../../../assets/Deepl_Logo.svg';


const NodeSideBar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='flex absolute z-10 h-min top-20 left-2.5 group'>
    <aside className={`px-2 py-2.5 rounded-md bg-white shadow-md w-[45px] overflow-hidden transition-all duration-300 ease-in-out group-hover:w-60`}>
    <div className='flex gap-x-3'><div className='sidebar-icon'><MagnifyingGlassIcon /></div><input className='w-100 border-2 border-inherit rounded-md' type="search" aria-label="search nodes" placeholder="Search nodes" ></input></div>
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'txtFileInput')} title="Txt File Input" icon={<FileIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'textInput')} title="Text Input" icon={<TextIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'json')} title="JSON" icon={<FileIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'template')} title="Template" icon={<FrameIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'userFunction')} title="User Function" icon={<MixIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'preview')} title="Preview" icon={<CameraIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'openAi')} title="Open AI" icon={<OpenAiLogo />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'deepl')} title="Deepl Translate" icon={<DeeplLogo />} />
    </aside>

    {/* {open ?
    <div
    className='expand-icon z-12 left-40 flex items-center transition-all ease-in-out duration-200m text-black bg-white'
    onClick={() => setOpen(false)}><ArrowLeftIcon /></div>
    :
    <div
      className='expand-icon z-12 left-40 bg-transparent text-transparent flex items-center transition-all ease-in-out duration-200ms group-hover:text-black group-hover:bg-gray-light'
      onClick={() => setOpen(true)}><ArrowRightIcon /></div>
    } */}
</div>
  );
};

export default NodeSideBar;
