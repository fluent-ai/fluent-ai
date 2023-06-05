import { DialogComponent } from '../DialogComponent/DialogComponent';
import {FormFieldComponent} from '../FormFieldComponent/FormFieldComponent';
import * as  Form  from '@radix-ui/react-form';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';
import { BackpackIcon } from '@radix-ui/react-icons';
import { supabase } from '@tool-ai/supabase';
/* eslint-disable-next-line */
export interface LoadDialogProps {}

function LoadDialog(props: LoadDialogProps) {

  // saveFlow


  return (
    <DialogComponent
    trigger={
      <div className='flex gap-x-3'>
        <div className='sidebar-icon w-[30px] h-[30px]'>
          <BackpackIcon />
        </div>
        <p className='w-100' aria-label="Save / Load" >Load/Save</p>
      </div>
    }
    title="Save & Load Flows"
    closeButton={
      <Form.Submit asChild>
        <ButtonComponent
          type="submit"
          ariaLabel="Save node settings"
          buttonContent="Save"
        />
      </Form.Submit>
    }
    >
    <Form.Root onSubmit={()=>{console.log('save')}} className="w-full">
      <FormFieldComponent
        label="Open Ai Key"
        type="text"
        onChange={(e:React.ChangeEvent)=>{console.log(e)}} />
      <FormFieldComponent
        label="Deepl Ai Key"
        type="text"
        onChange={(e:React.ChangeEvent)=>{console.log(e)}} />

    </Form.Root>
  </DialogComponent>
  );
}

export {LoadDialog};
