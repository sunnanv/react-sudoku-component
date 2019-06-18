import Sudoku from "../../models/sudoku";


export const boardInitialState = {
    board: new Sudoku(),
    isLoading: false,
    isInitialized: false,
    difficulty: '',
    currentCell: 0,
    writeCandidates: false,
    candidates: new Map(),
    isSolved: false
};