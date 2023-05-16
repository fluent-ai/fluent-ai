import { DialogComponent } from '../DialogComponent/DialogComponent';
import {FormFieldComponent} from '../FormFieldComponent/FormFieldComponent';
import * as  Form  from '@radix-ui/react-form';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { store } from '@tool-ai/state';
/* eslint-disable-next-line */
export interface ShareDialogProps {}

function ShareDialog(props: ShareDialogProps) {

  const handleShare = () => {
    const activeId = store.getState().flowTab.flowTabs.activeId;
    const link = 'http://localhost:4200/login?link=' + activeId;
    console.log("Here's your sharing link: ", link);
    return link;
  };


  return (
    <DialogComponent
    trigger={
      <div className='flex justify-between text-xs pl-[25px] H-[25px] pr-[5px]'
      >
        Share<div className={'ml-auto pl-5 text-gray-500 [data-highlighted]:text-primary [data-disabled]:text-gray-light'}>⌘+N</div>

      </div>
    }
    title="Nodes settings"
    closeButton={
    <ButtonComponent
      type='button'
      ariaLabel='share modal close button'
      buttonContent='Close'
       />}
    >
    <input aria-label="sharing link" type="text"
    className='block w-full border-2 border-solid border-gray-100 rounded-md' value={handleShare()} readOnly></input>
    </DialogComponent>

  );
}

export {ShareDialog};
