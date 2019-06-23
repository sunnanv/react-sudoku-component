import React, { createContext, useReducer, useEffect } from "react";
import { useActions } from "./actions/actions";
import reducers from './reducers';
import initialState from './initial_state'

const StoreContext = createContext(initialState);

const StoreProvider = ({ children, onSolved }) => {
    initialState.board.onSolved = onSolved;

    const [state, dispatch] = useReducer(reducers, initialState);
    const actions = useActions(state, dispatch);

    return (
        <StoreContext.Provider value={{ state, dispatch, actions }}>
            {children}
        </StoreContext.Provider>
    );
};

export { StoreContext, StoreProvider };
