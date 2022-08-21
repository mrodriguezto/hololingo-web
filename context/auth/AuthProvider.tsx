import { IUser } from 'interfaces';
import { useSession } from 'next-auth/react';
import { useEffect, useReducer } from 'react';
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

  return (
    <AuthContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
