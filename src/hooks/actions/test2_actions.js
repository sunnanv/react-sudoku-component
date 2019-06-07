import * as types from '../action_types/test2_action_types'

export const useTest2Actions = (state, dispatch) => {
    function incrementTest(value) {
        if(!value) value=1;
        dispatch({type: types.INCREMENT_TEST2, payload: value});
    }

    const decrementTest = (value) => {
        if(!value) value=1;
        dispatch({type: types.DECREMENT_TEST2, payload: value})
    }

    return {
        incrementTest,
        decrementTest
    }
};