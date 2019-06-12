import * as types from '../action_types';
import {timerInitialState} from "../initial_states";

const timer_reducer = (state = timerInitialState, action) => {
    switch(action.type) {
        case types.RESET_TIMER: {
            return ({
                ...timerInitialState
            })
        }
        case types.START_TIMER: {
            return({
                ...state,
                currentTime: 0,
                timerActive: true
            })
        }
        case types.STOP_TIMER: {
            return ({
                ...state,
                timerActive: false
            })
        }
        case types.TICK_TIMER: {
            console.log("state  in ticktimer", state);
            return ({
                ...state,
                timeElapsed: state.timeElapsed+1
            })
        }
        default: {
            return state;
        }
    }
};

export default timer_reducer;