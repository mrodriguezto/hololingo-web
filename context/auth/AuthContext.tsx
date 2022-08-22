import { createContext } from 'react';
import { IUser } from 'interfaces';

type ContextProps = {
  isLoggedIn: boolean;
  user?: IUser;

  // loginUser: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext({} as ContextProps);

export default AuthContext;
