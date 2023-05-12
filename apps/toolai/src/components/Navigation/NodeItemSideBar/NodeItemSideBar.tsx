import React from 'react';
import {TooltipComponent} from '@tool-ai/ui';

interface NodeItemSideBarProps {
  classes?: string,
  onDragStartHandler: React.DragEventHandler<HTMLDivElement>,
  title: string
  icon?: JSX.Element
};

const NodeItemSideBar = (props: NodeItemSideBarProps): JSX.Element => {
return(
  <div
    className={`py-2.5 h-12 flex justify-start items-center gap-x-2  ${props.classes}`}
    onDragStart={props.onDragStartHandler}
    draggable>
      <TooltipComponent buttonContent={props.icon} text={props.title} />
      <div className='border-2 border-inherit py-2 whitespace-nowrap w-full overflow-hidden pl-2 rounded-md'>{props.title}</div>
  </div>
)
}

export default NodeItemSideBar;