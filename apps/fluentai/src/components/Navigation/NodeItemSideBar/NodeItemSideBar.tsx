import React from 'react';
import { TooltipComponent } from '@tool-ai/ui';
import { IconButtonComponent } from '@tool-ai/ui';
import { groups } from '../../../nodeData';

interface NodeItemSideBarProps {
  classes?: string;
  onDragStartHandler: React.DragEventHandler<HTMLDivElement>;
  title: string;
  icon?: JSX.Element | string;
  group: string;
}

const NodeItemSideBar = (props: NodeItemSideBarProps): JSX.Element => {
  function getColor() {
    return groups.find((nodeGroup) => nodeGroup.id === props.group);
  }

  return (
    <div
      className={`nodeItemSideBar py-2.5 h-10 flex rounded-md justify-start items-center group/item hover:bg-gray-50 gap-x-2 ${props.classes}`}
      onDragStart={props.onDragStartHandler}
      draggable
    >
      <div className="w-[30px] h-[30px]">
        <TooltipComponent buttonContent={props.icon} text={props.title}>
          <IconButtonComponent
            buttonContent={props.icon}
            type="button"
            ariaLabel="iconbutton"
            classes={'group-hover/item:bg-gray-50'}
            style={{ backgroundColor: getColor()?.color }}
          />
        </TooltipComponent>
      </div>
      <div className="py-2 whitespace-nowrap w-full overflow-hidden pl-2 rounded-md">
        {props.title}
      </div>
    </div>
  );
};

export default NodeItemSideBar;
