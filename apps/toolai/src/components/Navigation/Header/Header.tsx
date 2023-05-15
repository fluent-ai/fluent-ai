import { AvatarComponent, User } from '@tool-ai/ui';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';
import { ButtonComponent } from '@tool-ai/ui';
import { signOut, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
interface UserProps {
  currentUser: User;
}

const Header = (userProps: UserProps): JSX.Element => {
  const navigate = useNavigate();
  function handleLogout() {
    const auth = getAuth();
    console.log('logout', auth);
    signOut(auth);
    navigate('/login');
  }

  return (
    <div
      className="h-10 w-60 mt-2.5 ml-2.5 bg-white absolute shadow-md
      rounded-md z-10 text-black flex justify-between items-center"
    >
      <p>Tool AI</p>
      <div className="sidebar-icon">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <AvatarComponent
              initials={userProps.currentUser.initials}
              url={userProps.currentUser.profileImg}
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content>
              <DropdownMenu.Item>
                <button
                  aria-label="logout button"
                  type="button"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

export default Header;
