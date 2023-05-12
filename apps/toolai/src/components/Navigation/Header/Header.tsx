import { useState, useEffect } from 'react';
import { AvatarComponent, User } from '@tool-ai/ui';
import * as firestoreService from '@libs/firestore-service';
import { mockClient } from '@tool-ai/ui';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';
import { ButtonComponent } from '@tool-ai/ui';
const Header = (): JSX.Element => {
  const [user, updateUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    initials: '',
  });
  const currentUser = { ...user };
  useEffect(() => {
    firestoreService
      .getSomeFromDB('users', 'id', '==', mockClient.id)
      .then((users) => {
        if (users.length > 0) {
          updateUser(users[0] as User);
        }
      });
  }, []);

  function handleLogout() {
    console.log("logout")
  }

  if (Object.keys(currentUser).length === 0) {
    return <div></div>;
  } else {
    return (
      <div className="h-10 w-60 mt-2.5 ml-2.5 bg-white absolute shadow-md
      rounded-md z-10 text-black flex justify-between items-center">
        <p>Tool AI</p>
        <div className="sidebar-icon">
          <DropdownMenu.Root>
          <DropdownMenu.Trigger>
              <AvatarComponent
                initials={currentUser.initials}
                url={currentUser.profileImg}
              />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
          <DropdownMenu.Content>
            <DropdownMenu.Item>
             <button
             aria-label='logout button'
             type="button"
              onClick={handleLogout}
             >Log out</button>

            </DropdownMenu.Item>
          </DropdownMenu.Content>
          </DropdownMenu.Portal>
          </DropdownMenu.Root>

        </div>
      </div>
    );
  }
};

export default Header;
