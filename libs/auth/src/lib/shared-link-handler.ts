import { arrayUnion } from 'firebase/firestore';
import * as firestoreService from '@libs/firestore-service';
import { store, userActions } from '@tool-ai/state';

export async function addFlowFromSharedLink(user: any) {
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
      const userId = user.uid || user.id;
      flows[0].collaborators.push({
        id: userId,
        name: user.displayName,
        initials: user.displayName?.slice(0, 2).toUpperCase(),
      });
      flows[0].collaboratorIds.push(userId);

      // update users collection
      await firestoreService.updateFirestoreDocument('users', userId, {
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
