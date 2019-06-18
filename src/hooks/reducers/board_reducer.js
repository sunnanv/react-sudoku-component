import {boardInitialState} from '../initial_states/board_initial_state';
import * as types from '../action_types';

const board_reducer = (state = boardInitialState, action) => {
    switch(action.type) {
        case types.RESET_STATE:
            return {
                ...boardInitialState
            };

        case types.SET_LOADING:
            // TODO set some loading variable to true
            return {
                ...state,
                isLoading: action.payload.isLoading
            };

        case types.SET_BOARD:
            return {
                ...state,
                board: action.payload.board
            };

        case types.SET_INITIALIZED:
            return {
                ...state,
                isInitialized: action.payload.isInitialized
            };

        case types.SET_DIFFICULTY:
            return {
                ...state,
                difficulty: action.payload.difficulty
            };

        case types.SET_CURRENT_CELL:
            return {
                ...state,
                currentCell: action.payload.currentCell
            };

        case types.SET_WRITE_CANDIDATES:
            return {
                ...state,
                writeCandidates: action.payload.writeCandidates
            };

        case types.SET_CANDIDATES:
            return {
                ...state,
                candidates: action.payload.candidates
            };

        case types.SET_IS_SOLVED:
            return {
                ...state,
                isSolved: action.payload.isSolved
            }

        default: return state
    }
};

export default board_reducer;