import { store } from '@tool-ai/state';
import { User } from '../types';
import * as firestoreService from '@libs/firestore-service';
import { deleteSelectedUser } from './delete-flow';

export async function removeCollaborator(collaboratorId: string) {
  const flowTabs = store.getState().flowTab.flowTabs;
  const activeTabId = flowTabs.activeId;
  const activeFlowTab = flowTabs.flows.find((flow) => flow.id === activeTabId);
  const users = await firestoreService.getSomeFromDB(
    'users',
    'id',
    '==',
    collaboratorId
  );
  if (activeFlowTab && users.length > 0) {
    deleteSelectedUser(collaboratorId, activeFlowTab, users[0] as User);
  }
}
