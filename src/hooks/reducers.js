import combineReducers from "./combineReducer";
import board_reducer from './reducers/board_reducer';
import timer_reducer from './reducers/timer_reducer';
import help_reducer from './reducers/help_reducer';


export default combineReducers({
    board: board_reducer,
    timer: timer_reducer,
    help: help_reducer
});