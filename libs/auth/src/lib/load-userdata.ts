import { store, userActions, UserEntity } from '@tool-ai/state';
import { User, Flow } from '@tool-ai/ui';
import * as firestoreService from '@libs/firestore-service';

export function dispatchToStore(newUser: User) {
  // store user state in redux
  store.dispatch(userActions.updateUserData(newUser as UserEntity));
  store.dispatch(userActions.setLoadingStatus('loaded'));
  console.log(store.getState().user.userData);
}

export async function createNewUser(user: any): Promise<User> {
  const newUser: User = {
    id: user.uid,
    email: user.email,
    name: user.displayName,
    initials: user.displayName.slice(0, 2).toUpperCase(),
    flows: [user.uid + '-1'],
    profileImg: user.photoURL,
  };
  const newFlow: Flow = {
    id: user.uid + '-1',
    title: 'My Flow 1',
    ownerId: user.uid,
    stringifiedNodes: '[]',
    stringifiedEdges: '[]',
    collaboratorIds: [user.uid],
    collaborators: [
      {
        id: user.uid,
        name: newUser.name,
        initials: newUser.initials,
      },
    ],
  };

  // update firestore
  await firestoreService.writeToDB('users', newUser);
  await firestoreService.writeToDB('flows', newFlow);

  return newUser;
}
