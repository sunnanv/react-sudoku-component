import {useBoardActions} from './actions/board_actions';
import {useTimerActions} from "./actions/timer_actions";

export const useActions = (state, dispatch) => {
    const board = useBoardActions(state, dispatch);
    const timer = useTimerActions(state, dispatch);

    return {
        board,
        timer
    }
};