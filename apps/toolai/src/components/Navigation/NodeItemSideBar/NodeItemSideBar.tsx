import React from 'react';
import {TooltipComponent} from '@tool-ai/ui';
import { IconButtonComponent } from '@tool-ai/ui';

interface NodeItemSideBarProps {
  classes?: string,
  onDragStartHandler: React.DragEventHandler<HTMLDivElement>,
  title: string
  icon?: JSX.Element | string
};

const NodeItemSideBar = (props: NodeItemSideBarProps): JSX.Element => {
return(
  <div
    className={`py-2.5 h-12 flex rounded-md justify-start items-center group/item hover:bg-primary gap-x-2 ${props.classes}`}
    onDragStart={props.onDragStartHandler}
    draggable>
      <TooltipComponent buttonContent={props.icon} text={props.title}>
        <IconButtonComponent
          buttonContent={props.icon}
          type='button'
          ariaLabel='iconbutton'
          classes={'group-hover/item:bg-primary group-hover/item:text-primary-hover'} />
      </TooltipComponent>
      <div className='py-2 whitespace-nowrap w-full overflow-hidden pl-2 rounded-md group-hover/item:text-primary-hover'>{props.title}</div>
  </div>
)
}

export default NodeItemSideBar;