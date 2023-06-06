import { useDispatch, useSelector } from 'react-redux';
import {
  supabaseActions, supabaseSelectors,
} from '@tool-ai/state';
const Header = (): JSX.Element => {
  const dispatch = useDispatch();
  function handleLogout() {
    console.log('logout');
    dispatch(supabaseActions.logout());
    setTimeout(() => {
      window.location.reload()
    }, 500);
  }

  const user = useSelector(supabaseSelectors.getUser)


  

  return (
    <div
      className="w-60 p-2.5 mt-2.5 ml-1.5 absolute 
      rounded-md z-10 text-black flex justify-between items-center group"
    >
    <aside className={`rounded-md bg-white shadow-md w-[45px] overflow-x-hidden transition-all duration-300 ease-in-out group-hover:w-60`}>
    
      <div className="flex flex-start  items-center gap-2">
        <img src="/assets/logo.png" alt="logo" className="h-10 w-10" />
        <div className="sidebar-icon">
          <div>{user?.email}</div>
          <button
              aria-label="logout button"
              type="button"
              onClick={handleLogout}
            >
              Log out
            </button>
        </div>
      </div>

    </aside>


    </div>
  );
};

export default Header;
