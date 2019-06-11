import * as types from "../action_types";
import { SET_BOARD, VALIDATE_SUDOKU } from "../action_types";

export const useBoardDispatches = (state, dispatch) => {

    const resetBoard = () => dispatch({
        type: types.RESET_BOARD
    });
    
    const setDifficulty = (difficulty) => dispatch({
        type: types.SET_DIFFICULTY, 
        payload: {
            difficulty
        }
    });

    const startFetchingBoard = () => dispatch({
        type: types.START_FETCHING_BOARD
    });

    const doneFetchingBoard = () => dispatch({
        type: types.DONE_FETCHING_BOARD
    });

    const initializeBoard = (initials) => dispatch({
        type: types.INITIALIZE_BOARD,
        payload: {
            initials
        }
    });

    const setCurrentCell = (currentCell) => dispatch({
        type: types.SET_CURRENT_CELL,
        payload: {
            currentCell
        }
    })

    const setBoard = (board) => dispatch({
        type: types.SET_BOARD,
        payload: {
            board
        }
    })

    const clearBoard = () => dispatch({
        type: types.CLEAR_BOARD
    })
    
    const toggleWriteCandidates = () => dispatch({
        type: types.TOGGLE_WRITE_CANDIDATES
    })

    const setCandidates = (candidates) => dispatch({
        type: types.TOGGLE_CANDIDATE,
        payload: {
            candidates
        }
    })

    const setSolution = (solution) => dispatch({
        type: types.SET_SOLUTION,
        payload: {
            solution
        }
    })

    const toggleShowHelp = () => dispatch({
        type: types.TOGGLE_SHOW_HELP
    })

    const addHelpUsage = (helpType) => dispatch({
        type: types.ADD_HELP_USAGE,
        payload: {
            helpType
        }
    })

    const addHint = (cell) => dispatch({
        type: types.ADD_HINT,
        payload: {
            cell
        }
    })

    const toggleOnTheGoValidation = () => dispatch({
        type: types.TOGGLE_ON_THE_GO_VALIDATION
    })

    const toggleShowConnectedCells = () => dispatch({
        type: types.TOGGLE_SHOW_CONNECTED_CELLS
    })

    const togglePlaceAllOfActive = () => dispatch({
        type: types.TOGGLE_PLACE_ALL_OF_ACTIVE
    })

    const removeCellFromInvalid = (cell) => dispatch({
        type: types.REMOVE_CELL_FROM_INVALID,
        payload: {
            cell
        }
    })

    const placeAllOf = (number) => dispatch({
        type: types.PLACE_ALL_OF,
        payload: {
            number
        }
    });

    const setInvalidCells = (invalidCells) => dispatch({
        type: VALIDATE_SUDOKU,
        payload: {
            invalidCells
        }
    });

    return {
        resetBoard,
        setDifficulty,
        startFetchingBoard,
        doneFetchingBoard,
        initializeBoard,
        setCurrentCell,
        setBoard,
        clearBoard,
        toggleWriteCandidates,
        setCandidates,
        setSolution,
        toggleShowHelp,
        addHelpUsage,
        addHint,
        toggleOnTheGoValidation,
        toggleShowConnectedCells,
        togglePlaceAllOfActive,
        removeCellFromInvalid,
        placeAllOf,
        setInvalidCells
    }
};