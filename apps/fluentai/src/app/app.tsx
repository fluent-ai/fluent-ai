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
    supabase.getSession().then(({ data: { session } }) => {
      dispatch(supabaseActions.setSession(session));
    })

    const {
      data: { subscription },
    } = supabase.onAuthStateChange((_event, session) => {
      dispatch(supabaseActions.setSession(session));
    })

    return () => subscription.unsubscribe()

    }
  }, [dispatch])

  if (!session) {
    return (
    <div className="mx-auto h-screen flex items-center justify-around">
      <div className='w-1/2 justify-self-center flex justify-center'>
      <img src="/assets/logo-text.png" alt="logo" className='w-[200px] justify-self-center '/>
      </div>
      <div className='w-1/2 justify-self-left'>
        <div className='w-[300px]'>
      {supabase&&<Auth
        supabaseClient={supabase.getClient()}
          appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#a9dc76',
                brandAccent: 'hsla(91, 76%, 66%, 1.0)',
              },
            },
          },
          className: {
            input: "box-border ",
            button: "box-border",
            divider: "",
            container:"w-[300px] "
          }
        }}
        providers={['github']}


        />}
        </div>
        </div>
    </div>)
  }
  else {
    return (
    <Dashboard />)
  }
};

export default App;
