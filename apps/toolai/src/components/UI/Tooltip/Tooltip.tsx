import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';


interface TooltipProps {
  buttonContent?: JSX.Element | string;
  text: string
}

const TooltipComponent = (props: TooltipProps) => {
  return (
    <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          aria-label="iconbutton"
          className="sidebar-icon h-9
          w-9 inline-flex
          items-center
          justify-center
         text-black bg-white rounded-full sidebar-icon
         hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          {props.buttonContent}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className="border border-gray-200 shadow-md p-2 text-sm text-black bg-white rounded-lg select-none z-20"
          sideOffset={5}
        >
          {props.text}
          <Tooltip.Arrow className="text-white" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
  );
};

export default TooltipComponent;