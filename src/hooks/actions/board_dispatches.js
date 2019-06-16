import * as types from "../action_types";

export const useBoardDispatches = (dispatch) => {

    const resetState = () => dispatch({
        type: types.RESET_STATE
    });

    const setLoading = (isLoading) => dispatch({
        type: types.SET_LOADING,
        payload: {
            isLoading
        }
    });

    const setBoard = (board) => dispatch({
        type: types.SET_BOARD,
        payload: {
            board
        }
    });

    const setInitialized = (isInitialized = true) => dispatch({
        type: types.SET_INITIALIZED,
        payload: {
            isInitialized
        }
    });

    const setDifficulty = (difficulty) => dispatch({
        type: types.SET_DIFFICULTY,
        payload: {
            difficulty
        }
    });

    const setCurrentCell = (currentCell) => dispatch({
        type: types.SET_CURRENT_CELL,
        payload: {
            currentCell
        }
    });

    const setWriteCandidates = (writeCandidates) => dispatch({
        type: types.SET_WRITE_CANDIDATES,
        payload: {
            writeCandidates
        }
    });

    const setCandidates = (candidates) => dispatch({
        type: types.SET_CANDIDATES,
        payload: {
            candidates
        }
    });

    return {
        resetState,
        setLoading,
        setBoard,
        setInitialized,
        setDifficulty,
        setCurrentCell,
        setWriteCandidates,
        setCandidates,
    }
};