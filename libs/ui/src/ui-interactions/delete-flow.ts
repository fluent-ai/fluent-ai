import { store, userActions, flowTabActions } from '@tool-ai/state';
import { arrayRemove } from 'firebase/firestore';
import { FlowCollaborator } from '../types';
import * as firestoreService from '@libs/firestore-service';

export async function deleteFlow() {
  const flowTabs = store.getState().flowTab.flowTabs;
  const activeTabId = flowTabs.activeId;
  const activeFlowTab = flowTabs.flows.find((flow) => flow.id === activeTabId);

  // update user state
  store.dispatch(userActions.removeUserFlow(activeTabId));
  const updatedUser = store.getState().user.userData;

  // check if current user is the owner
  if (activeFlowTab && updatedUser.id === activeFlowTab.ownerId) {
    await firestoreService.deleteDocuments('flows', 'id', '==', activeTabId);

    // delete for all
    activeFlowTab.collaboratorIds.forEach(async (collaboratorId) => {
      await firestoreService.updateFirestoreDocument('users', collaboratorId, {
        flows: arrayRemove(activeTabId),
      });
    });
  } else {
    const writableFlow: any = { ...activeFlowTab };
    writableFlow.collaboratorIds = writableFlow.collaboratorIds.filter(
      (id: string) => id !== updatedUser.id
    );
    writableFlow.collaborators = writableFlow.collaborators.filter(
      (collaborator: FlowCollaborator) => collaborator.id !== updatedUser.id
    );

    writableFlow.stringifiedEdges = JSON.stringify(writableFlow.edges);
    writableFlow.stringifiedNodes = JSON.stringify(writableFlow.nodes);
    delete writableFlow.edges;
    delete writableFlow.nodes;

    await firestoreService.updateFirestoreDocument(
      'flows',
      writableFlow.id,
      writableFlow
    );
    // delete for the current user only
    await firestoreService.updateFirestoreDocument(
      'users',
      updatedUser.id,
      updatedUser
    );
  }

  store.dispatch(flowTabActions.removeActiveFlowTab());
}
