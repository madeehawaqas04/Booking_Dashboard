import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    isOpen: false,
  
};

export const SideBarContext = createContext(INITIAL_STATE);

const SideBarReducer = (state, action) => {
  switch (action.type) {
    case "Open":
      return {
        isOpen: true,
      };
    case "Close":
      return {
        isOpen: false,
      };
    
    default:
      return state;
  }
};

export const SideBarContextProvider = ({ children }) => {
  const [state, dispatchSidebar] = useReducer(SideBarReducer, INITIAL_STATE);

  return (
    <SideBarContext.Provider
      value={{
        isOpen: state.isOpen,
        dispatchSidebar,
      }}
    >
      {children}
    </SideBarContext.Provider>
  );
};
