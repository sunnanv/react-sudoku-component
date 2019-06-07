import * as types from "../action_types"
export const useTestActions = (state, dispatch) => {
    function incrementTest(value) {
        if(!value) value=1;
        dispatch({type: types.INCREMENT_TEST, payload: value});
    }

    const decrementTest = (value) => {
        if(!value) value=1;
        dispatch({type: types.DECREMENT_TEST, payload: value})
    }

    return {
        incrementTest,
        decrementTest
    }
};