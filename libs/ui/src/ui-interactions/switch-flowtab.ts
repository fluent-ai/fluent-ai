import { store, flowTabActions } from '@tool-ai/state';

export function switchFlowTab(tabId: string, nodes: any, edges: any) {
  // save current active state
  const activeId = store.getState().flowTab.flowTabs.activeId;
  if (tabId === activeId) return;
  const flowTabToSave = {
    id: activeId,
    nodes: nodes,
    edges: edges,
  };
  store.dispatch(flowTabActions.saveCurrentFlowTab(flowTabToSave));

  // load new tab
  store.dispatch(flowTabActions.setActiveFlowTab(tabId));

  // useState on current node and edges
  const currentFlowTab = store
    .getState()
    .flowTab.flowTabs.flows.find((flow) => flow.id === tabId);

  return currentFlowTab;
}
