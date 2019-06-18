import {helpInitialState} from '../initial_states/help_initial_state';
import * as types from '../action_types';

const help_reducer = (state = helpInitialState, action) => {
    switch (action.type) {
        case types.RESET_HELP_STATE:
            return {
                ...helpInitialState
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

        case types.SET_HINTED_CELLS:
            return {
                ...state,
                hintedCells: action.payload.hintedCells
            };

        default:
            return state
    }
}

export default help_reducer;