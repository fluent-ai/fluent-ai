import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
/* eslint-disable-next-line */
export interface DialogComponentProps {
  trigger: JSX.Element;
  title: string;
  description?: string
  children: JSX.Element;
}

function DialogComponent(props: DialogComponentProps) {
  console.log('show dialog')
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {props.trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black data-[state=open]:animate-overlayShow absolute inset-0 z-30" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] z-1000 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-black m-0 text-[17px] font-medium">
            {props.title}
          </Dialog.Title>
          <Dialog.Description className="text-black mt-[10px] mb-5 text-[15px] leading-normal">
            {props.description}
          </Dialog.Description>
          <div>
            {props.children}

            <Dialog.Close asChild>
              <button className="bg-green text-green hover:bg-green focus:shadow-green inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                Save changes
              </button>
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
