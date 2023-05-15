import { store, userActions, flowTabActions } from '@tool-ai/state';
import * as firestoreService from '@libs/firestore-service';

export async function deleteFlow() {
  const activeTabId = store.getState().flowTab.flowTabs.activeId;
  store.dispatch(userActions.removeUserFlow(activeTabId));
  store.dispatch(flowTabActions.removeActiveFlowTab());
  const updatedUser = store.getState().user.userData;
  await firestoreService.updateFirestoreDocument(
    'users',
    updatedUser.id,
    updatedUser
  );
  await firestoreService.deleteDocuments('flows', 'id', '==', activeTabId);

  // TODO: if it's a shared document, user can just remove themselves from collaborators
  // TODO: if it's an owned document, the other users need to be removed access from the flow document
}
