'use client';

import { IAuth } from '@/interfaces/auth.interface';
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IAuthContext {
  auth?: IAuth | null;
  setAuth?: Dispatch<IAuth>;
}
const AuthContext = createContext<IAuthContext>({});

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<IAuth | null>(null);

  useEffect(() => {
    console.log('llego', auth);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
