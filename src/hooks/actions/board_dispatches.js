import * as types from "../action_types";
import { SET_NUMBER, VALIDATE_SUDOKU } from "../action_types";

export const useBoardDispatches = (state, dispatch) => {

    const resetBoard = () => dispatch({
        type: types.RESET_BOARD
    })
    
    const setDifficulty = (difficulty) => dispatch({
        type: types.SET_DIFFICULTY, 
        payload: {
            difficulty
        }
    })

    const startFetchingBoard = () => dispatch({
        type: types.START_FETCHING_BOARD
    })

    const doneFetchingBoard = () => dispatch({
        type: types.DONE_FETCHING_BOARD
    })

    const initializeBoard = (initials) => dispatch({
        type: types.INITIALIZE_BOARD,
        payload: {
            initials
        }
    })

    const setCurrentCell = (currentCell) => dispatch({
        type: types.SET_CURRENT_CELL,
        payload: {
            currentCell
        }
    })

    const setNumber = (number, cell) => dispatch({
        type: types.SET_NUMBER,
        payload: {
            number,
            cell
        }
    })

    const clearBoard = () => dispatch({
        type: types.CLEAR_BOARD
    })
    
    const toggleWriteCandidates = () => dispatch({
        type: types.TOGGLE_WRITE_CANDIDATES
    })

    const toggleCandidate = (candidate, cell) => dispatch({
        type: types.TOGGLE_CANDIDATE,
        payload: {
            cell, 
            candidate
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

    const setInvalidCells = (invalidCells) => dispatch({
        type: types.SET_INVALID_CELLS,
        payload: {
            invalidCells
        }
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
    })

    const validateSudoku = () => dispatch({
        type: VALIDATE_SUDOKU
    })

    return {
        resetBoard,
        setDifficulty,
        startFetchingBoard,
        doneFetchingBoard,
        initializeBoard,
        setCurrentCell,
        setNumber,
        clearBoard,
        toggleWriteCandidates,
        toggleCandidate,
        setSolution,
        toggleShowHelp,
        addHelpUsage,
        addHint,
        toggleOnTheGoValidation,
        toggleShowConnectedCells,
        togglePlaceAllOfActive,
        setInvalidCells,
        removeCellFromInvalid,
        placeAllOf,
        validateSudoku
    }
};