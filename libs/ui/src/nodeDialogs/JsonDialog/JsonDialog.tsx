import { InnerDialogStructure } from "../../lib/InnerDialogStructure/InnerDialogStructure";
/* eslint-disable-next-line */
export interface JsonDialogProps {}

function JsonDialog(props: JsonDialogProps) {
  return (
    <InnerDialogStructure
    title="JSON"
    description="json description">
    </InnerDialogStructure>
  );
}

export {JsonDialog};
