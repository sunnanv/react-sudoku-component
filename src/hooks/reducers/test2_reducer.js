import test2_initial_state from '../initial_states/test2_initial_state';
import * as types from '../action_types';


const test2_reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.INCREMENT_TEST2:
            return {
                ...state,
                test2: state.test2 + action.payload
            };
        case types.DECREMENT_TEST2:
            return {
                ...state,
                test2: state.test2 - action.payload
            };
        default: return state;
    }
}

export default test2_reducer;