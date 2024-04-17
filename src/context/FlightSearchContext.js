import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  fromAirport: undefined,
  toAirport: undefined,
  date: undefined,
  options: {
    adult: undefined,
    children: undefined,
    class: undefined, // You might want to include flight class in your flight search
  },
};

export const FlightSearchContext = createContext(INITIAL_STATE);

const flightSearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_FLIGHT_SEARCH":
      return action.payload;
    case "RESET_FLIGHT_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const FlightSearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(flightSearchReducer, INITIAL_STATE);

  return (
    <FlightSearchContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FlightSearchContext.Provider>
  );
};
