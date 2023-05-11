import styles from './NodeDialogComponent.module.css';
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { NodeDialogProps } from '../../types';
import { InputDialog } from '../../nodeDialogs/InputDialog/InputDialog';
import { JsonDialog } from '../../nodeDialogs/JsonDialog/JsonDialog';
import { TemplateDialog } from '../../nodeDialogs/TemplateDialog/TemplateDialog';
import { UserFunctionDialog } from '../../nodeDialogs/UserFunctionDialog/UserFunctionDialog';

function NodeDialogComponent(props: NodeDialogProps) {
  console.log(props.activeDialog);
  const shownDialog = () => {
    switch (props.activeDialog) {
      case 'textInput':
        return <InputDialog {...props} />;
      case 'json':
        return <JsonDialog {...props} />;
      case 'userFucntion':
        return <UserFunctionDialog {...props} />;
      case 'template':
        return <TemplateDialog {...props} />;
      default:
        return null;
    }
  }
  return (
    <div>
      {props.isOpen && (
        <div
          className={`${styles.DialogContent} border-2 border-inherit rounded-md`}
        >
          <button onClick={() => props.onClose(false)}>X</button>
          <div>
            {shownDialog()}
          </div>
        </div>
      )}
    </div>
  );
}

export { NodeDialogComponent };

{
  /* <Dialog.Root >
    <Dialog.Trigger>{props.label}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay"  />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Hello</Dialog.Title>
        <Dialog.Description />
        {/* <Dialog.Close /> */
}
{
  /* </Dialog.Content>
    </Dialog.Portal>
    </Dialog.Root> */
}
