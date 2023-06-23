import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
/* eslint-disable-next-line */
export interface DialogComponentProps {
  trigger: JSX.Element;
  title: string;
  description?: string
  children: JSX.Element;
  closeButton?: JSX.Element;
  onOpenChange?: (open: boolean) => void;
}

function DialogComponent(props: DialogComponentProps) {
  // console.log('show dialog')
  return (
    <Dialog.Root onOpenChange={props.onOpenChange}>
      <Dialog.Trigger asChild>
        {props.trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-gray-600 bg-opacity-40 data-[state=open]:animate-overlayShow absolute z-30 inset-0 " />
        <Dialog.Content className="bg-white rounded-md shadow-lg fixed z-40 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50vw] max-w-[500px] max-h-85vh px-6 py-6">
          <Dialog.Title className="text-black m-0 text-[17px] font-medium">
            {props.title}
          </Dialog.Title>
          <Dialog.Description className="text-black mt-[10px] mb-5 text-[15px] leading-normal">
            {props.description}
          </Dialog.Description>
          <div>
            {props.children}

            <Dialog.Close asChild>
              {props.closeButton}
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-black hover:bg-blue-0 focus:shadow-blue-50 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );

}

export {DialogComponent};
