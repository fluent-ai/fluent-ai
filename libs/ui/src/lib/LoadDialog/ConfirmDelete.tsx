import { DialogComponent } from '../DialogComponent/DialogComponent';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';
/* eslint-disable-next-line */
export interface SettingsDialogProps {}

function ConfirmDelete(
  {
    open,
    onOpenChange,
    onConfirm,
    onCancel
  }
  :
  {
    open: boolean,
    onOpenChange: (value: boolean) => void,
    onConfirm: () => void,
    onCancel: () => void
  }) {

  return (
    <DialogComponent
      open={open}
      onOpenChange={onOpenChange}
      title="Unsaved Changes"
      width='50vw'
      >
        <div className="flex flex-col">
          <p>Delete flow</p>
          <p>You sure?</p>
          <div className="flex gap-5">
          <ButtonComponent
            type='button'
            clickHandler={onConfirm}
            ariaLabel='Confirm'
            buttonContent="Yep, delete it"
            />
            <ButtonComponent
              type='button'
              clickHandler={onCancel}
              ariaLabel='Cancel'
              buttonContent="Ahhh no!"
              />
          </div>
        </div>

  </DialogComponent>
  );
}

export {ConfirmDelete};
