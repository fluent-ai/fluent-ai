import styles from './NodeDialogComponent.module.css';
import { InputDialog } from '../../nodeDialogs/InputDialog/InputDialog';
import { JsonDialog } from '../../nodeDialogs/JsonDialog/JsonDialog';
import { TemplateDialog } from '../../nodeDialogs/TemplateDialog/TemplateDialog';
import { UserFunctionDialog } from '../../nodeDialogs/UserFunctionDialog/UserFunctionDialog';
import { PreviewDialog } from '../../nodeDialogs/PreviewDialog/PreviewDialog';
import { OpenAIDialog } from '../../nodeDialogs/OpenAIDialog/OpenAIDialog';
import { TextFileInputDialog } from '../../nodeDialogs/TextFileInputDialog/TextFileInputDialog';
import { DeeplDialog } from '../../nodeDialogs/DeeplDialog/DeeplDialog';
import { DalleVariationDialog } from '../../nodeDialogs/DalleVariationDialog/DalleVariationDialog';
import { DownloadDialog } from '../../nodeDialogs/DownloadDialog/DownloadDialog';
import { DalleGenerationDialog } from '../../nodeDialogs/DalleGenerationDialog/DalleGenerationDialog';
import { useDispatch, useSelector } from 'react-redux';
import { flowActions, flowSelectors } from '@tool-ai/state';
import { useEffect, useState } from 'react';

function NodeDialogComponent() {
  const dispatch = useDispatch();
  const isOpen = useSelector(flowSelectors.isDialogOpen) 
  const activeNodeId = useSelector(flowSelectors.activeNodeId)
  const [isExpanded, setIsExpanded] = useState(false); 

  const nodeType = useSelector(flowSelectors.getNodeTypeById(activeNodeId));
  useEffect(() => {
    setIsExpanded(false);
  }, [nodeType]); 


  const shownDialog = () => {
    switch (nodeType) {
      case 'textFileInput':
        return <TextFileInputDialog id={activeNodeId}/>;
      case 'textInput':
        return <InputDialog id={activeNodeId} />;
      case 'json':
        return <JsonDialog id={activeNodeId}/>;
      case 'userFunction':
        return <UserFunctionDialog id={activeNodeId}  />;
      case 'template':
        return <TemplateDialog id={activeNodeId}  />;
      case 'preview':
        return <PreviewDialog id={activeNodeId} />;
      case 'openAi':
        return <OpenAIDialog id={activeNodeId} />;
      case 'deepl':
        return <DeeplDialog id={activeNodeId} />;
      case 'dalleVariation':
        return <DalleVariationDialog id={activeNodeId} />;
      case 'dalleGeneration':
        return <DalleGenerationDialog id={activeNodeId} />;
      case 'download':
        return <DownloadDialog id={activeNodeId} />;
      default:
        return null;
    }
  }
  return (
    <div>
      {isOpen && (
        <div
          className={`${styles.DialogContent} ${isExpanded && styles.expanded} border-2 border-inherit rounded-md`}
        >
          <div className="flex flex-space-between">
            <button
            className='absolute right-2 top-2'
            onClick={() => dispatch(flowActions.setIsDialogOpen(false))}>
              🅧
            </button>
            <button
            className='absolute left-2 top-2'
            onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? '▶ Contract' : '◀ Expand'}
            </button>
           </div>
          <div>
            {shownDialog()}
          </div>
        </div>
      )}
    </div>
  );
}

export { NodeDialogComponent };
