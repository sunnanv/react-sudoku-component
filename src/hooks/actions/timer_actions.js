import {useTimerDispatches} from "./timer_dispatches";

export const useTimerActions = (state, dispatch) => {
    const timerDispatches = useTimerDispatches(state, dispatch);

    const resetTimer = () => {
        timerDispatches.resetTimer();
    }

    const startTimer = () => {
        timerDispatches.startTimer();
    }

    const stopTimer = () => {
        timerDispatches.stopTimer();
    }

    const tickTimer = () => {
        timerDispatches.tickTimer();
    }

    return {
        resetTimer,
        startTimer,
        stopTimer,
        tickTimer
    }
}