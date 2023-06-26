import { DialogComponent } from '../DialogComponent/DialogComponent';
import { GearIcon } from '@radix-ui/react-icons';
import Checkbox from '../CheckboxComponent/CheckboxComponent';
/* eslint-disable-next-line */
export interface SettingsDialogProps {}

function SettingsDialog(props: SettingsDialogProps) {

  return (
    <DialogComponent
    trigger={
    <div className='flex gap-x-3'>
      <div className='sidebar-icon w-[30px] h-[30px]'><GearIcon />
      </div><p className='w-100' aria-label="settings" placeholder="Search nodes" >Settings</p></div>}
    title="Settings"
    // closeButton={<Form.Submit asChild>
    //   <ButtonComponent
    //     type="submit"
    //     ariaLabel="Save node settings"
    //     buttonContent="Save"
    //   />
    // </Form.Submit>}
    >
      <div>
      <p>Node Types</p>
      <Checkbox
        label="openAI"
        checked={true}
        onCheckedChange={(value) => {
          // supabase.saveSettings({...settings, showOpenAI: value});
        } }
        />
        </div>
    

  </DialogComponent>
  );
}

export {SettingsDialog};
