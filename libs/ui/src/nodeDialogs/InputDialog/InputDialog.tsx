/* eslint-disable-next-line */
export interface InputDialogProps {}

function InputDialog(props: InputDialogProps) {
  return (
    <div>
      <h3>Text Input</h3>
      <textarea placeholder="input your text" rows={10} cols={100} />
    </div>
  );
}

export {InputDialog};
