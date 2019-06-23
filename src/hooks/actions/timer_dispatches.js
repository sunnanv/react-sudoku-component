import * as types from '../action_types';

export const useTimerDispatches = (dispatch) => {

    const resetTimerState = () => dispatch({
        type: types.RESET_TIMER_STATE
    });

    const setTimerActive = (timerActive) => dispatch({
        type: types.SET_TIMER_ACTIVE,
        payload: {
            timerActive
        }
    });

    const setTimeElapsed = (timeElapsed) => dispatch({
        type: types.SET_TIME_ELAPSED,
        payload: {
            timeElapsed
        }
    });

    return {
        resetTimerState,
        setTimerActive,
        setTimeElapsed
    }
};