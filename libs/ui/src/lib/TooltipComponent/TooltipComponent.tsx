import * as Tooltip from '@radix-ui/react-tooltip';
import { TooltipProps } from '../../types';

const TooltipComponent = (props: TooltipProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {props.children}
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

export { TooltipComponent };
