import { createClient, Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import React, { useState,useEffect } from 'react';
import { Route,  } from 'react-router-dom';
import Dashboard from '../components/Pages/Dashboard/Dashboard';

const supabase = createClient('https://rrgtmovkczotmiacaibj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyZ3Rtb3ZrY3pvdG1pYWNhaWJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5NjgxMzYsImV4cCI6MjAwMTU0NDEzNn0.wiV3JVN1q2-PWxBZLi1cKQ6gYRE9gyE_aQcLQXzR6mw')


const App = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (
    <div className="mx-auto w-96 h-screen flex flex-col items-center justify-center">
      <img src="/assets/logo-text.png" alt="logo" style={{width:'300px'}}/>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    </div>)
  }
  else {
    return (
    <Dashboard />)
  }
};

export default App;
