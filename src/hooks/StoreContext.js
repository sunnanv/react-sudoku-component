import React, { createContext, useReducer, useEffect } from "react";
import { useActions } from "./actions";
import reducers from './reducers';
import initialState from './initial_state'

const StoreContext = createContext(initialState);

const StoreProvider = ({ children }) => {
    // Set up reducer with useReducer and our defined reducer, initialState from reducers.js
    const [state, dispatch] = useReducer(reducers, initialState);
    // Create an object of all our actions, handling special cases where a simple dispatch is too primitive
    const actions = useActions(state, dispatch);   

    // Log new state
    useEffect(
        () => {
            console.log({ newState: state });
        },
        [state]
    );

    // Render state, dispatch and special case actions
    return (
        <StoreContext.Provider value={{ state, dispatch, actions }}>
            {children}
        </StoreContext.Provider>
    );
};

export { StoreContext, StoreProvider };
