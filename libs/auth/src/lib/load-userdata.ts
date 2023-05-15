import { store, userActions, UserEntity } from '@tool-ai/state';
import { User } from '@tool-ai/ui';
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
    flows: [
      {
        id: 'tab1',
        title: 'Flow 1',
        stringifiedNodes: '[]',
        stringifiedEdges: '[]',
        owner: true,
        colaborators: [],
      },
    ],
    profileImg: user.photoURL,
  };

  firestoreService.writeToDB('users', newUser);
  return newUser;
}
