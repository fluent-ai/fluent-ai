import { DialogComponent } from '../DialogComponent/DialogComponent';
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';
/* eslint-disable-next-line */
export interface SettingsDialogProps {}

function ConfirmLoad({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <DialogComponent
      open={open}
      onOpenChange={onOpenChange}
      title="Unsaved Changes"
      width="50vw"
    >
      <div className="flex flex-col">
        <p>You have unsaved changes</p>
        <p>What shall we do about it?</p>
        <div className="flex gap-5">
          <ButtonComponent
            type="button"
            clickHandler={onConfirm}
            ariaLabel="Confirm"
            buttonContent="Discard changes and load"
          />
          <ButtonComponent
            type="button"
            clickHandler={onCancel}
            ariaLabel="Cancel"
            buttonContent="Cancel load"
          />
        </div>
      </div>
    </DialogComponent>
  );
}

export { ConfirmLoad };
