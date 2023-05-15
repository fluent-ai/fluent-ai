import { store, userActions, flowTabActions } from '@tool-ai/state';
import * as firestoreService from '@libs/firestore-service';

export async function deleteFlow() {
  const activeTabId = store.getState().flowTab.flowTabs.activeId;
  store.dispatch(userActions.removeUserFlow(activeTabId));
  store.dispatch(flowTabActions.removeActiveFlowTab());
  const updatedUser = store.getState().user.userData;
  firestoreService.updateFirestoreDocument(
    'users',
    updatedUser.id,
    updatedUser
  );
}
