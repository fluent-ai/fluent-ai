import { store, userActions } from '@tool-ai/state';
import * as firestoreService from '@libs/firestore-service';

export async function saveFlow(nodes: any, edges: any) {
  store.dispatch(userActions.setLoadingStatus('loading'));
  const currentState = store.getState();
  const currentUser = currentState.user.userData;
  const activeTab = currentState.flowTab.flowTabs.activeId;

  // store user state in redux
  const activeFlowIndex = currentUser.flows.findIndex(
    (flow) => flow.id === activeTab
  );

  if (activeFlowIndex !== -1) {
    const writableFlow = { ...currentUser.flows[activeFlowIndex] };

    writableFlow.stringifiedNodes = JSON.stringify(nodes);
    writableFlow.stringifiedEdges = JSON.stringify(edges);

    const newFlows = [];
    for (let i = 0; i < currentUser.flows.length; i++) {
      if (i === activeFlowIndex) {
        newFlows.push(writableFlow);
      } else {
        newFlows.push({ ...currentUser.flows[i] });
      }
    }

    const newUser = { ...currentUser, flows: newFlows };
    store.dispatch(userActions.updateUserData(newUser));

    // update flow in firestore
    //const updatedUser = store.getState().user.userData;
    //console.log(currentUser, newUser, updatedUser);
    firestoreService.updateFirestoreDocument('users', newUser.id, newUser);
    console.log('updated User: ', newUser);
  }
  store.dispatch(userActions.setLoadingStatus('loaded'));
}
