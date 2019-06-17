import * as types from "../action_types";

export const useHelpDispatches = (dispatch) => {
    const resetHelpState = () => dispatch({
        type: types.RESET_HELP_STATE
    });

    const setSolution = (solution) => dispatch({
        type: types.SET_SOLUTION,
        payload: {
            solution
        }
    });

    const setInvalidCells = (invalidCells) => dispatch({
        type: types.SET_INVALID_CELLS,
        payload: {
            invalidCells
        }
    });

    const setShowHelp = (showHelp) => dispatch({
        type: types.SET_SHOW_HELP,
        payload: {
            showHelp
        }
    });

    const setHelpUsage = (helpUsage) => dispatch({
        type: types.SET_HELP_USAGE,
        payload: {
            helpUsage
        }
    });

    const setOnTheGoValidation = (onTheGoValidation) => dispatch({
        type: types.SET_ON_THE_GO_VALIDATION,
        payload: {
            onTheGoValidation
        }
    });

    const setShowConnectedCells = (showConnectedCells) => dispatch({
        type: types.SET_SHOW_CONNECTED_CELLS,
        payload: {
            showConnectedCells
        }
    });

    const setPlaceAllOfActive = (placeAllOfActive) => dispatch({
        type: types.SET_PLACE_ALL_OF_ACTIVE,
        payload: {
            placeAllOfActive
        }
    });

    const setHintedCells = (hintedCells) => dispatch({
        type: types.SET_HINTED_CELLS,
        payload: {
            hintedCells
        }
    });
    
    return {
        resetHelpState,
        setSolution,
        setInvalidCells,
        setShowHelp,
        setHelpUsage,
        setOnTheGoValidation,
        setShowConnectedCells,
        setPlaceAllOfActive,
        setHintedCells
    }
};