import {
    test_initial_state,
    test2_initial_state,
    boardInitialState,
    timerInitialState
} from './initial_states';

const initialState = {
    test_reducer: test_initial_state,
    test2_reducer: test2_initial_state,
    board_reducer: boardInitialState,
    timer_reducer: timerInitialState
}

export default initialState;