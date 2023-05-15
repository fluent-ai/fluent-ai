import { store, userActions, UserEntity } from '@tool-ai/state';
import { User, Flow } from '@tool-ai/ui';
import { mockUser } from '@tool-ai/ui';
import * as firestoreService from '@libs/firestore-service';

export function dispatchToStore(newUser: User) {
  // store user state in redux
  store.dispatch(userActions.updateUserData(newUser as UserEntity));
  store.dispatch(userActions.setLoadingStatus('loaded'));
  console.log(store.getState().user.userData);
}

export function createNewUser(user: any): User {
  const newUser: User = {
    id: user.uid,
    email: user.email || mockUser.email, // TODO: ask newly signed up users for a name in their account
    name: user.displayName || mockUser.name,
    initials: (user.displayName || mockUser.name).slice(0, 2).toUpperCase(),
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
  firestoreService.writeToDB('users', newUser);
  firestoreService.writeToDB('flows', newFlow);

  return newUser;
}
