import Sudoku from '../../models/sudoku'

export const helpInitialState = {
    solution: new Sudoku(),
    invalidCells: [],
    showHelp: false,
    helpUsage: new Map([['validation', 0], ['hint', 0], ['placeAllOf', 0],['onTheGoValidation', 0]]),
    onTheGoValidation: false,
    showConnectedCells: true,
    placeAllOfActive: false,
    hintedCells: []
};