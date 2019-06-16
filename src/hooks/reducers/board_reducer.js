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

        case types.SET_SOLUTION:
            return {
                ...state,
                solution: action.payload.solution
            };

        case types.SET_INVALID_CELLS:
            return {
                ...state,
                invalidCells: action.payload.invalidCells
            };

        case types.SET_SHOW_HELP:
            return {
                ...state,
                showHelp: action.payload.showHelp
            };

        case types.SET_HELP_USAGE:
            return {
                ...state,
                helpUsage: action.payload.helpUsage
            };

        case types.SET_ON_THE_GO_VALIDATION:
            return {
                ...state,
                onTheGoValidation: action.payload.onTheGoValidation
            };

        case types.SET_SHOW_CONNECTED_CELLS:
            return {
                ...state,
                showConnectedCells: action.payload.showConnectedCells
            };

        case types.SET_PLACE_ALL_OF_ACTIVE:
            return {
                ...state,
                placeAllOfActive: action.payload.placeAllOfActive
            };

        default: return state
    }
};

export default board_reducer;