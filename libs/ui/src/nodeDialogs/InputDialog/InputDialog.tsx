/* eslint-disable-next-line */
export interface InputDialogProps {}

export function InputDialog(props: InputDialogProps) {
  return (
    <div>
      <textarea placeholder="input your text" rows={10} cols={100} />
    </div>
  );
}

export default InputDialog;
