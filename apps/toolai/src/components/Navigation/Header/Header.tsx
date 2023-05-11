import { useState } from 'react';
import { AvatarComponent, User } from '@tool-ai/ui';
import * as firestoreService from '@libs/firestore-service';
import { mockClient } from '@tool-ai/ui';

const Header = (): JSX.Element => {
  const [user, updateUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    initials: '',
  });
  const currentUser = { ...user };
  firestoreService
    .getSomeFromDB('users', 'id', '==', mockClient.id)
    .then((users) => {
      if (users.length > 0) {
        updateUser(users[0] as User);
      }
    });

  if (Object.keys(currentUser).length === 0) {
    return <div></div>;
  } else {
    return (
      <div className="h-10 w-60 mt-2.5 ml-2.5 bg-white absolute border-2 border-inherit rounded-md z-10 text-black flex justify-between items-center">
        <p>Tool AI</p>
        <div className="sidebar-icon">
          <AvatarComponent
            initials={currentUser.initials}
            url={currentUser.profileImg}
          />
        </div>
      </div>
    );
  }
};

export default Header;
