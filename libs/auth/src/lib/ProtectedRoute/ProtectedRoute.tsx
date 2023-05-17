import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { dispatchToStore } from '../load-userdata';
import { User } from '@tool-ai/ui';
import * as firestoreService from '@libs/firestore-service';

interface IProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: IProtectedRouteProps) {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('🗝️ ProtectedRoute',{user});
        firestoreService.getSomeFromDB(
          'users',
          'id',
          '==',
          user.uid
        ).then((documentData) => {
          if (documentData.length === 0) {
            console.log('🗝️ no user found');
            navigate('/register');
          } else {
            console.log('🗝️ user found');
            dispatchToStore(documentData[0] as User);
          }
          //TODO load flows
          })
        setLoading(false);
      } else {
        console.log('unauthorized');
        navigate('/login');
      }
    });
    return () => AuthCheck();
  }, [auth]);
  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
