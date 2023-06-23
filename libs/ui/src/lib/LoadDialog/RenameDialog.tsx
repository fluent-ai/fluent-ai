import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, InputIcon } from '@radix-ui/react-icons';
import { useRef } from 'react';



export const RenameDialog = (
  {
      currentValue,
      onChange}:
          {currentValue: string, onChange: (value: string) => void}
  ) => {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (timeoutId.current) {
          clearTimeout(timeoutId.current);
      }
      timeoutId.current = setTimeout(() => {
          onChange(value);
      }
      , 500);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
          <InputIcon/>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="z-40 bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="z-40 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="m-0 text-[17px] font-medium">
            Give your flow a name
          </Dialog.Title>
          <Dialog.Description className="mt-[10px] mb-5 text-[15px] leading-normal">
            Call it something you'll remember later.
          </Dialog.Description>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <input
              className="shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              id="name"
              defaultValue={currentValue}
              onChange={handleChange}
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button className="hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
)};
