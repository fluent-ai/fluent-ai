import React, {useState} from 'react';
import NodeItemSideBar from '../NodeItemSideBar/NodeItemSideBar';
import { FileIcon, MixIcon, TextIcon, DoubleArrowRightIcon, ArrowRightIcon, ArrowLeftIcon, FrameIcon, MagnifyingGlassIcon, GearIcon, CameraIcon, GlobeIcon } from '@radix-ui/react-icons';
import {ReactComponent as OpenAiLogo}  from  '../../../assets/OpenAI_Logo.svg';
import {ReactComponent as DeeplLogo}  from  '../../../assets/Deepl_Logo.svg';
import { SettingsDialog } from '@tool-ai/ui';


const NodeSideBar = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className='flex absolute z-10 h-min top-20 left-2.5 group'>
    <aside className={`px-2 py-2.5 rounded-md bg-white shadow-md w-[45px] overflow-hidden transition-all duration-300 ease-in-out group-hover:w-60`}>
    <SettingsDialog />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'txtFileInput')} title="Txt File Input" icon={<FileIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'textInput')} title="Text Input" icon={<TextIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'json')} title="JSON" icon={<FileIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'template')} title="Template" icon={<FrameIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'userFunction')} title="User Function" icon={<MixIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'preview')} title="Preview" icon={<CameraIcon />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'openAi')} title="Open AI" icon={<OpenAiLogo />} />
    <NodeItemSideBar onDragStartHandler={(event) => onDragStart(event, 'deepl')} title="Deepl Translate" icon={<DeeplLogo />} />
    </aside>

</div>
  );
};

export default NodeSideBar;
