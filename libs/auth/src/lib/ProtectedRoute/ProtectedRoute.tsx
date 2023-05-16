import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
