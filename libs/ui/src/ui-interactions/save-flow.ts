import { store, userActions, flowTabActions } from '@tool-ai/state';
import * as firestoreService from '@libs/firestore-service';
import { arrayUnion } from 'firebase/firestore';

export async function saveFlow(nodes: any, edges: any) {
  store.dispatch(userActions.setLoadingStatus('loading'));
  const currentState = store.getState();
  const currentUser = currentState.user.userData;
  const activeTab = currentState.flowTab.flowTabs.activeId;

  // save current flow state in redux
  const flowToSave = store
    .getState()
    .flowTab.flowTabs.flows.find((flow) => flow.id === activeTab);
  if (flowToSave) {
    const writableFlow = { ...flowToSave };
    writableFlow.nodes = nodes;
    writableFlow.edges = edges;
    store.dispatch(flowTabActions.saveCurrentFlowTab(writableFlow));

    if (!currentUser.flows.includes(flowToSave.id)) {
      store.dispatch(userActions.updateUserFlows(writableFlow.id));
    }

    const existingFirestoreDocuments = await firestoreService.getSomeIDsFromDB(
      'flows',
      'id',
      '==',
      activeTab
    );

    const flowForFirestore: any = { ...writableFlow };
    flowForFirestore.stringifiedNodes = JSON.stringify(nodes);
    flowForFirestore.stringifiedEdges = JSON.stringify(edges);
    delete flowForFirestore.nodes;
    delete flowForFirestore.edges;

    if (existingFirestoreDocuments.length > 0) {
      // update firebase document flows
      await firestoreService.updateFirestoreDocument(
        'flows',
        activeTab,
        flowForFirestore
      );
    } else {
      // write new document in flows
      await firestoreService.writeToDB('flows', flowForFirestore);
    }

    // update firebase document user
    await firestoreService.updateFirestoreDocument('users', currentUser.id, {
      flows: arrayUnion(writableFlow.id),
    });
  }

  store.dispatch(userActions.setLoadingStatus('loaded'));

  // store user state in redux
  // const activeFlowIndex = currentUser.flows.find(
  //   (flowId) => flowId === activeTab
  // );

  // if (activeFlowIndex !== -1) {
  //   const writableFlow = { ...currentUser.flows[activeFlowIndex] };

  //   writableFlow.stringifiedNodes = JSON.stringify(nodes);
  //   writableFlow.stringifiedEdges = JSON.stringify(edges);

  //   const newFlows = [];
  //   for (let i = 0; i < currentUser.flows.length; i++) {
  //     if (i === activeFlowIndex) {
  //       newFlows.push(writableFlow);
  //     } else {
  //       newFlows.push({ ...currentUser.flows[i] });
  //     }
  //   }

  //   const newUser = { ...currentUser, flows: newFlows };
  //store.dispatch(userActions.updateUserFlows(flowToSave.id));

  // update flow in firestore
  //const updatedUser = store.getState().user.userData;
  //console.log(currentUser, newUser, updatedUser);
  //   firestoreService.updateFirestoreDocument('users', newUser.id, newUser);
  //   console.log('updated User: ', newUser);
  // }
}
