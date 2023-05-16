import styles from './NodeDialogComponent.module.css';
import React from 'react';
import { NodeDialogProps } from '../../types';
import { InputDialog } from '../../nodeDialogs/InputDialog/InputDialog';
import { JsonDialog } from '../../nodeDialogs/JsonDialog/JsonDialog';
import { TemplateDialog } from '../../nodeDialogs/TemplateDialog/TemplateDialog';
import { UserFunctionDialog } from '../../nodeDialogs/UserFunctionDialog/UserFunctionDialog';
import { PreviewDialog } from '../../nodeDialogs/PreviewDialog/PreviewDialog';
import { OpenAIDialog } from '../../nodeDialogs/OpenAIDialog/OpenAIDialog';
import { TextFileInputDialog } from '../../nodeDialogs/TextFileInputDialog/TextFileInputDialog';
import { DeeplDialog } from '../../nodeDialogs/DeeplDialog/DeeplDialog';
import { ImageAiDialog } from '../../nodeDialogs/ImageAiDialog/ImageAiDialog';
function NodeDialogComponent(props: NodeDialogProps) {
  const shownDialog = () => {
    console.log('activeId', props.activeDialog);
    switch (props.activeDialog) {
      case 'textFileInput':
        return <TextFileInputDialog id={props.activeNodeId}/>;
      case 'textInput':
        return <InputDialog id={props.activeNodeId} />;
      case 'json':
        return <JsonDialog id={props.activeNodeId}/>;
      case 'userFunction':
        return <UserFunctionDialog id={props.activeNodeId}  />;
      case 'template':
        return <TemplateDialog id={props.activeNodeId}  />;
      case 'preview':
        return <PreviewDialog id={props.activeNodeId} />;
      case 'openAi':
        return <OpenAIDialog id={props.activeNodeId} />;
      case 'deepl':
        return <DeeplDialog id={props.activeNodeId} />;
      case 'imageAi':
        return <ImageAiDialog id={props.activeNodeId} />;
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
            🅧
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
