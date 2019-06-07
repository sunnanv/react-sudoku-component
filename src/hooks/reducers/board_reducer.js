import {boardInitialState} from '../initial_states/board_initial_state';
import * as types from '../action_types';
import * as SudokuUtils from '../../utils/sudoku_utils';
import Sudoku from '../../models/sudoku';


const board_reducer = (state = boardInitialState, action) => {
    switch(action.type) {
        case types.RESET_BOARD: 
            console.log("boardInitialState", boardInitialState);
            return {
                ...boardInitialState
            }
        
        case types.SET_DIFFICULTY: 
            return {
                ...state,
                difficulty: action.payload.difficulty
            }
        
        case types.START_FETCHING_BOARD: 
            // TODO set some loading variable to true
            return {
                ...state
            }
        
        case types.DONE_FETCHING_BOARD: 
            // TODO set some loading variable to false
            return {
                ...state
            }
        
        case types.INITIALIZE_BOARD: 
            return {
                ...state,
                board: new Sudoku(action.payload.initials),
                isInitialized: true
            }
        
        case types.SET_CURRENT_CELL: {
            return {
                ...state, 
                currentCell: action.payload.currentCell
            }
        }
        case types.SET_NUMBER: {
            let newBoard = state.board.copy()
            let cell = action.payload.cell? action.payload.cell : state.currentCell;
            newBoard.set(cell, action.payload.number)
            return ({
                ...state,
                board: newBoard
            })
        }
        case types.CLEAR_BOARD: {
            let newBoard = state.board.copy();
            newBoard.clear();
            return ({
                ...state,
                board: newBoard,
                candidates: new Map()
            })
        }
        case types.TOGGLE_WRITE_CANDIDATES: {
            return ({
                ...state,
                writeCandidates: !state.writeCandidates
            })
        }
        case types.TOGGLE_CANDIDATE: {
            let newCandidates = new Map(state.candidates);
            let cellCandidates = state.candidates.get(action.payload.cell);
            if(cellCandidates) {
                // There are candidates for this cell, check if this candidate exists
                let contains = cellCandidates.includes(action.payload.candidate);
                if(contains) {
                    // It exists, remove from list
                    cellCandidates = cellCandidates.filter(candidate => candidate !== action.payload.candidate);
                }else {
                    // It doesn't exist, add to list
                    cellCandidates.push(action.payload.candidate);
                }
                newCandidates.set(action.payload.cell, cellCandidates);
            } else {
                // There are no current, just add candidate
                newCandidates.set(action.payload.cell, [action.payload.candidate]);
            }
            return ({
                ...state,
                candidates: newCandidates
            })
        }
        case types.SET_SOLUTION: {
            return ({
                ...state,
                solution: action.payload.solution
            })
        }
        case types.TOGGLE_SHOW_HELP: {
            return ({
                ...state,
                showHelp: !state.showHelp
            })
        }
        case types.ADD_HELP_USAGE: {
            let newHelpUsage = new Map(state.helpUsage);
            if(action.payload.helpType === types.HELP_TYPE_ON_THE_GO_VALIDATION) {
                newHelpUsage.set(action.payload.helpType, true);
            } else {
                let oldCount = newHelpUsage.get(action.payload.helpType);
                newHelpUsage.set(action.payload.helpType, oldCount+1);
            }
            return ({
                ...state,
                helpUsage: newHelpUsage
            })
        }
        case types.ADD_HINT: {
            let newBoard = state.board.copy();
            newBoard.addInitial(action.payload.cell, state.solution.get(action.payload.cell))
            return ({
                ...state,
                board: newBoard
            })
        }
        case types.TOGGLE_ON_THE_GO_VALIDATION: {
            return ({
                ...state,
                onTheGoValidation: !state.onTheGoValidation
            })
        }
        case types.TOGGLE_SHOW_CONNECTED_CELLS: {
            return ({
                ...state,
                showConnectedCells: !state.showConnectedCells
            })
        }
        case types.TOGGLE_PLACE_ALL_OF_ACTIVE: {
            return ({
                ...state,
                placeAllOfActive: !state.placeAllOfActive
            })
        }
        case types.SET_INVALID_CELLS: {
            return ({
                ...state,
                invalidCells: action.payload.invalidCells
            })
        }
        case types.REMOVE_CELL_FROM_INVALID: {
            return ({
                ...state,
                invalidCells: state.invalidCells.filter(cell => cell !== action.payload.cell)
            })
        }
        case types.PLACE_ALL_OF: {
            let newBoard = state.board.copy();
            state.solution.board.forEach((number, cell) => {
                if(number === action.payload.number)
                    newBoard.addInitial(cell, number);
            })
            return ({
                ...state,
                board: newBoard,
            })
        }
        case types.VALIDATE_SUDOKU: {
            let invalid = SudokuUtils.validate_sudoku(state.board);
            return ({
                ...state,
                invalidCells: invalid
            })
        }
        default: {
            return state
        }
    }
}

export default board_reducer;