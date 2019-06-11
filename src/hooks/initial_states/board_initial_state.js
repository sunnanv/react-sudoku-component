import Sudoku from "../../models/sudoku";


export const boardInitialState = {
    board: new Sudoku(),
    isInitialized: false,
    difficulty: '',
    currentCell: 0,
    writeCandidates: false,
    candidates: new Map(),
    solution: new Sudoku(),
    invalidCells: [],
    showHelp: true, //false
    helpUsage: new Map([['validation', 0], ['hint', 0], ['placeAllOf', 0],['onTheGoValidation', false]]),
    onTheGoValidation: false,
    showConnectedCells: true,
    placeAllOfActive: false
}