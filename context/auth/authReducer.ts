import { IUser } from 'interfaces';
import { AuthState } from './AuthProvider';

type AuthActionType = { type: 'login'; payload: IUser } | { type: 'logout' };

const authReducer = (state: AuthState, action: AuthActionType) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case 'logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };

    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
