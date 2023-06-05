import { AvatarComponent, IUser } from '@tool-ai/ui';
import { useNavigate } from 'react-router-dom';
interface UserProps {
  currentUser: IUser;
}

const Header = (userProps: UserProps): JSX.Element => {
  const navigate = useNavigate();
  function handleLogout() {
    console.log('logout');
    navigate('/login');
  }

  return (
    <div
      className="w-60 p-2.5 mt-2.5 ml-1.5 absolute 
      rounded-md z-10 text-black flex justify-between items-center group"
    >
    <aside className={`rounded-md bg-white shadow-md w-[45px] overflow-x-hidden transition-all duration-300 ease-in-out group-hover:w-60`}>
    
      <div className="flex flex-start  items-center gap-2">
        <img src="/assets/logo.png" alt="logo" className="h-10 w-10" />
        <div className="sidebar-icon">
          <AvatarComponent
            initials={userProps.currentUser.initials}
            url={userProps.currentUser.profileImg}
          />
        </div>
        <button
            aria-label="logout button"
            type="button"
            onClick={handleLogout}
          >
            Log out
          </button>
      </div>

    </aside>


    </div>
  );
};

export default Header;
