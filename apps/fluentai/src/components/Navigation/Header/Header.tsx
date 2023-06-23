import { useDispatch, useSelector } from 'react-redux';
import {
  supabaseActions, supabaseSelectors,
} from '@tool-ai/state';
import { supabase } from '@tool-ai/supabase';
import { useEffect, useState } from 'react';
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

  const [credit, setCredit] = useState(0);
  useEffect(() => {
    if (user) {
      const fetchCredit = async () => {
        const { data, error } = await supabase.getClient()
          .from('accounts')
          .select('credit')
          .eq('user_id', user.id)
          .single();
        if (error) {
          console.log(error);
          return;
        }
        setCredit(data?.credit);
      };
      fetchCredit();
    }
  }
  , [user])
  supabase.getClient()
    .channel('schema-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'accounts'
      },
      (payload) => {
        console.log('💰 change to account detected',payload)
        const newPayload = payload?.new as { credit: number };
        setCredit(newPayload?.credit);

      }
    )
    .subscribe()


  

  return (
    <div
      className="w-60 p-2.5 mt-2.5 ml-1.5 absolute 
      rounded-md z-10 text-black flex justify-between items-center group"
    >
    <aside className={`rounded-md bg-white shadow-md w-[45px] overflow-x-hidden transition-all duration-300 ease-in-out group-hover:w-60`}>
    
      <div className="flex flex-start  items-center gap-2">
        <img src="/assets/logo.png" alt="logo" className="h-10 w-10" />
        <div className="sidebar-icon">
          <div className="flex"></div>
          <div>{user?.email}</div>
          <div>{credit.toFixed(3)} €</div>
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
