import { useEffect, useReducer } from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

import { IUser } from 'interfaces';
import AuthContext from './AuthContext';
import authReducer from './authReducer';

export type AuthState = {
  isLoggedIn: boolean;
  user?: IUser;
};

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch({ type: 'login', payload: data.user as IUser });
    }
  }, [status, data]);

  const logout = () => {
    signOut();
    dispatch({ type: 'logout' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
