import { arrayUnion } from 'firebase/firestore';
import * as firestoreService from '@libs/firestore-service';
import { store, userActions } from '@tool-ai/state';
import { User } from '@tool-ai/ui';

export async function addFlowFromSharedLink(user: User) {
  // check for a sharing link
  const sharingLinkMatch = window.location.href.match(/\?link=(.*)/);
  if (sharingLinkMatch) {
    const flows = await firestoreService.getSomeFromDB(
      'flows',
      'id',
      '==',
      sharingLinkMatch[1]
    );
    if (flows.length > 0) {
      flows[0].collaborators.push({
        id: user.id,
        name: user.name,
        initials: user.name?.slice(0, 2).toUpperCase(),
      });
      flows[0].collaboratorIds.push(user.id);

      // update users collection
      await firestoreService.updateFirestoreDocument('users', user.id, {
        flows: arrayUnion(flows[0].id),
      });

      // update flows collection
      await firestoreService.updateFirestoreDocument(
        'flows',
        flows[0].id,
        flows[0]
      );

      // reflect changes in state
      store.dispatch(userActions.updateUserFlows(flows[0].id));
    }
  }
}

export async function addFlowCopyFromLink(user: User) {
  const sharingLinkMatch = window.location.href.match(/\?copy=(.*)/);

  if (sharingLinkMatch) {
    const flows = await firestoreService.getSomeFromDB(
      'flows',
      'id',
      '==',
      sharingLinkMatch[1]
    );
    if (flows.length > 0) {
      // get the make a new flow that has the userId
      const flowIdNumbers = user.flows.map((flowId) =>
        Number(flowId.slice(-1))
      );
      let flowIdSuffix = 0;
      for (let i = 1; i <= flowIdNumbers.length; i++) {
        if (i !== flowIdNumbers[i - 1]) {
          flowIdSuffix = i;
          break;
        }
        if (i === flowIdNumbers.length) {
          flowIdSuffix = i + 1;
        }
      }

      // flow-id number will follow the naming convention that has been implemented for new tabs
      const newFlow = {
        id: user.id + '-' + flowIdSuffix,
        title: 'Flow ' + flowIdSuffix,
        ownerId: user.id,
        stringifiedNodes: flows[0].stringifiedNodes,
        stringifiedEdges: flows[0].stringifiedEdges,
        collaboratorIds: [user.id],
        collaborators: [
          {
            id: user.id,
            name: user.name,
            initials: user.initials,
          },
        ],
      };
      // persist in database
      await firestoreService.writeToDB('flows', newFlow);
      await firestoreService.updateFirestoreDocument('users', user.id, {
        flows: arrayUnion(newFlow.id),
      });

      // reflect changes in state
      store.dispatch(userActions.updateUserFlows(newFlow.id));
    }
  }
}
