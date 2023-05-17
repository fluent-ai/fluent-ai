import { store, userActions, flowTabActions } from '@tool-ai/state';

export function addFlowTab() {
  store.dispatch(userActions.setLoadingStatus('loading'));
  const userData = store.getState().user.userData;
  const sessionTabs = userData.flows;

  const flowTabIds = sessionTabs.map((tabId) => Number(tabId.slice(-1)));
  let newTabId = 1;
  for (let i = 1; i <= flowTabIds.length; i++) {
    if (i > flowTabIds[i - 1]) {
      newTabId = i;
      break;
    }
    if (i === flowTabIds.length) {
      newTabId = i + 1;
    }
  }

  const newFlow = {
    id: userData.id + '-' + newTabId, // this will count the existing tabs and assign tab number according to exisiting count
    title: 'Flow ' + newTabId,
    ownerId: userData.id,
    nodes: [],
    edges: [],
    collaboratorIds: [userData.id],
    collaborators: [
      {
        id: userData.id,
        name: userData.name,
        initials: userData.initials,
      },
    ],
  };

  // store new states in redux
  store.dispatch(userActions.updateUserFlows(newFlow.id));
  store.dispatch(flowTabActions.addNewFlowTab(newFlow));

  // update firestore
  // firestoreService.updateFirestoreDocument('users', user.id, {
  //   flows: [...user.flows],
  // });
  store.dispatch(userActions.setLoadingStatus('loaded'));
}
