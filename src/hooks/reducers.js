import combineReducers from "./combineReducer";
import board_reducer from './reducers/board_reducer';
import timer_reducer from './reducers/timer_reducer';

export default combineReducers({
    board_reducer,
    timer_reducer
});