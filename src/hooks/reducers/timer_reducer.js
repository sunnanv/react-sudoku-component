import * as types from '../action_types';
import {timerInitialState} from "../initial_states";

const timer_reducer = (state = timerInitialState, action) => {
    switch(action.type) {
        case types.RESET_TIMER_STATE: {
            return ({
                ...timerInitialState
            })
        }
        
        case types.SET_TIMER_ACTIVE: {
            return ({
                ...state,
                timerActive: action.payload.timerActive
            })
        }

        case types.SET_TIME_ELAPSED: {
            return ({
                ...state,
                timeElapsed: action.payload.timeElapsed
            })
        }

        default: {
            return state;
        }
    }
};

export default timer_reducer;