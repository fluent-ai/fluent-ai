import { DialogComponent } from '../DialogComponent/DialogComponent';
import {FormFieldComponent} from '../FormFieldComponent/FormFieldComponent';
import * as  Form  from '@radix-ui/react-form';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';
import { GearIcon } from '@radix-ui/react-icons';
/* eslint-disable-next-line */
export interface SettingsDialogProps {}

function SettingsDialog(props: SettingsDialogProps) {

  return (
    <DialogComponent
    trigger={
    <div className='flex gap-x-3'>
      <div className='sidebar-icon'><GearIcon />
      </div><p className='w-100' aria-label="settings" placeholder="Search nodes" >Settings</p></div>}
    title="Nodes settings"
    closeButton={<Form.Submit asChild>
      <ButtonComponent
        type="submit"
        ariaLabel="Save node settings"
        buttonContent="Save"
      />
    </Form.Submit>}
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

  </Form.Root></DialogComponent>
  );
}

export {SettingsDialog};
