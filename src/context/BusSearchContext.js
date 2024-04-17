import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  from: undefined,
  to: undefined,
  date: undefined,
  options: {
    adult: undefined,
    children: undefined,
  },
};

export const BusSearchContext = createContext(INITIAL_STATE);

const busSearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_BUS_SEARCH":
      return action.payload;
    case "RESET_BUS_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const BusSearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(busSearchReducer, INITIAL_STATE);

  return (
    <BusSearchContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BusSearchContext.Provider>
  );
};
