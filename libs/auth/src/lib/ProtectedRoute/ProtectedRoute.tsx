import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// <<<<<<< HEAD
import { dispatchToStore } from '../load-userdata';
import { User } from '@tool-ai/ui';
import * as firestoreService from '@libs/firestore-service';
// =======
// >>>>>>> b965bd6efaf211a4f32ca61fb8bc3e5a0698e207

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
        console.log(
          '🚀 ~ file: ProtectedRoute.tsx:20 ~ AuthCheck ~ user:',
          user
        );
// <<<<<<< HEAD
        
        firestoreService.getSomeFromDB(
          'users',
          'id',
          '==',
          user.uid
        ).then((documentData) => {
          console.log('🌳 documentData', documentData);
          if (documentData.length === 0) {
            console.log('🌳 no user found');
            navigate('/register');
          } else {
            console.log('🌳 user found');
            dispatchToStore(documentData[0] as User);
            // navigate('/dashboard');
          }

          //TODO load flows
          })
        
// =======

// >>>>>>> b965bd6efaf211a4f32ca61fb8bc3e5a0698e207
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
