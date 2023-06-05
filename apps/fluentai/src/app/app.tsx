import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import {
  supabaseActions,
  supabaseSelectors,
} from '@tool-ai/state';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import React, { useEffect } from 'react';
import Dashboard from '../components/Pages/Dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '@tool-ai/supabase';



const App = () => {
  const dispatch = useDispatch();
  const session = useSelector(supabaseSelectors.getSession)

  useEffect(() => {
    if (supabase) {
      
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(supabaseActions.setSession(session));
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(supabaseActions.setSession(session));
    })

    return () => subscription.unsubscribe()

    }
  }, [dispatch, supabase])

  if (!session) {
    return (
    <div className="mx-auto w-96 h-screen flex flex-col items-center justify-center">

      <img src="/assets/logo-text.png" alt="logo" style={{width:'300px'}}/>
      {supabase&&<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />}
    </div>)
  }
  else {
    return (
    <Dashboard />)
  }
};

export default App;
