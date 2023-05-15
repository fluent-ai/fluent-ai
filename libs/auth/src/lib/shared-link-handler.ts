import { arrayUnion } from 'firebase/firestore';
import * as firestoreService from '@libs/firestore-service';
import { mockUser } from '@tool-ai/ui';

export async function addFlowFromSharedLink(user: any) {
  // check for a sharing link
  const sharingLinkMatch = window.location.href.match(/\?link=(.*)/);
  if (sharingLinkMatch) {
    const flows = await firestoreService.getSomeFromDB(
      'flows',
      'id',
      '==',
      sharingLinkMatch[0]
    );
    if (flows.length > 0) {
      flows[0].collaborators.push({
        id: user.uid || user.id,
        name: user.displayName || mockUser.name,
        initials: user.displayName?.slice(0, 2).toUpperCase() || mockUser.name,
      });
      flows[0].collaboratorIds.push(user.uid || user.id);

      // update users collection
      await firestoreService.updateFirestoreDocument('users', user.uid, {
        flows: arrayUnion(flows[0].id),
      });

      // update flows collection
      await firestoreService.updateFirestoreDocument(
        'flows',
        flows[0].id,
        flows[0]
      );
    }
  }
}
