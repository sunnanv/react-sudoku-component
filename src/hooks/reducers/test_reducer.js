import test_initial_state from '../initial_states/test_initial_state';
import * as types from '../action_types';

const test_reducer = (state = test_initial_state, action) => {
    switch (action.type) {
        case types.INCREMENT_TEST:
            return {
                ...state,
                test: state.test + action.payload
            };
        case types.DECREMENT_TEST:
            return {
                ...state,
                test: state.test - action.payload
            };
        default: return state;
    }
}

export default test_reducer;