import styles from './NodeDialogComponent.module.css';
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { NodeDialogProps } from '../../types';
import { InputDialog } from '../../nodeDialogs/InputDialog/InputDialog';
import { JsonDialog } from '../../nodeDialogs/JsonDialog/JsonDialog';
import { TemplateDialog } from '../../nodeDialogs/TemplateDialog/TemplateDialog';
import { UserFunctionDialog } from '../../nodeDialogs/UserFunctionDialog/UserFunctionDialog';
import { PreviewDialog } from '../../nodeDialogs/PreviewDialog/PreviewDialog';
import { OpenAIDialog } from '../../nodeDialogs/OpenAIDialog/OpenAIDialog';
import { TxtFileInputDialog } from '../../nodeDialogs/TxtFileInputDialog/TxtFileInputDialog';
import { DeeplDialog } from '../../nodeDialogs/DeeplDialog/DeeplDialog';
function NodeDialogComponent(props: NodeDialogProps) {
  const shownDialog = () => {
    switch (props.activeDialog) {
      case 'txtFileInput':
        return <TxtFileInputDialog {...props} />;
      case 'textInput':
        return <InputDialog {...props} />;
      case 'json':
        return <JsonDialog {...props} />;
      case 'userFunction':
        return <UserFunctionDialog {...props} />;
      case 'template':
        return <TemplateDialog {...props} />;
      case 'preview':
        return <PreviewDialog {...props} />;
      case 'openAi':
        return <OpenAIDialog {...props} />;
      case 'deepl':
        return <DeeplDialog {...props} />;
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
          <button
           className='absolute right-2 top-2'
           onClick={() => props.onClose(false)}>
            X
           </button>
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
