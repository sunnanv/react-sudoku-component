import Sudoku from "../../models/sudoku";


export const boardInitialState = {
    board: new Sudoku(),
    isLoading: false,
    isInitialized: false,
    difficulty: '',
    currentCell: 0,
    writeCandidates: false,
    candidates: new Map(),

    //split
    solution: new Sudoku(),
    invalidCells: [],
    showHelp: true, //false
    helpUsage: new Map([['validation', 0], ['hint', 0], ['placeAllOf', 0],['onTheGoValidation', 0]]),
    onTheGoValidation: false,
    showConnectedCells: true,
    placeAllOfActive: false,
};