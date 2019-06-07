import {useTestActions} from './actions/test_actions';
import {useTest2Actions} from './actions/test2_actions';
import {useBoardActions} from './actions/board_actions';

export const useActions = (state, dispatch) => {
    const testActions = useTestActions(state, dispatch);
    const test2Actions = useTest2Actions(state, dispatch);
    const board = useBoardActions(state, dispatch);


    return {
        testActions,
        test2Actions,
        board
    }
};