import { store, userActions, flowTabActions } from '@tool-ai/state';

export function addFlowTab() {
  store.dispatch(userActions.setLoadingStatus('loading'));
  const userData = store.getState().user.userData;
  const sessionTabs = userData.flows;

  const flowTabIds = sessionTabs.map((tab) => Number(tab.id.slice(-1)));
  let newTabId = 0;
  for (let i = 1; i <= flowTabIds.length; i++) {
    if (i !== flowTabIds[i - 1]) {
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
    owner: true,
    stringifiedNodes: '[]',
    stringifiedEdges: '[]',
    colaborators: [],
  };
  // store new state in redux
  store.dispatch(userActions.updateUserFlows(newFlow));
  store.dispatch(
    flowTabActions.addNewFlowTab({ id: newFlow.id, nodes: [], edges: [] })
  );

  // update firestore
  // firestoreService.updateFirestoreDocument('users', user.id, {
  //   flows: [...user.flows],
  // });
  store.dispatch(userActions.setLoadingStatus('loaded'));
}
