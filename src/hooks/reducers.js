import combineReducers from "./combineReducer";
import test_reducer from './reducers/test_reducer';
import test2_reducer from './reducers/test2_reducer';
import board_reducer from './reducers/board_reducer';

export default combineReducers({
    test_reducer, 
    test2_reducer,
    board_reducer
});