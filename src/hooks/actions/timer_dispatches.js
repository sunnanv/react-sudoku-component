import * as types from '../action_types';

export const useTimerDispatches = (state, dispatch) => {
    const resetTimer = () => dispatch({
        type: types.RESET_TIMER
    })

    const startTimer = () => dispatch({
        type: types.START_TIMER
    });

    const stopTimer = () => dispatch({
        type: types.START_TIMER
    });

    const tickTimer = () => dispatch({
        type: types.TICK_TIMER
    });
    
    return {
        resetTimer,
        startTimer,
        stopTimer,
        tickTimer
    }
};