import { useReducer } from 'react';
import UIContext from './UIContext';
import uiReducer from './uiReducer';

export type UIState = {
  isMenuOpen: boolean;
};

const UI_INITIAL_STATE: UIState = {
  isMenuOpen: false,
};

const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => dispatch({ type: 'toggleMenu' });

  return (
    <UIContext.Provider
      value={{
        ...state,
        toggleSideMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
export default UIProvider;
