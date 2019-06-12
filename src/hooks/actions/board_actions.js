import { useBoardDispatches } from './board_dispatches';
import { useTimerDispatches } from "./timer_dispatches";

import * as SudokuUtils from '../../utils/sudoku_utils';
import Sudoku from '../../models/sudoku';

export const useBoardActions = (state, dispatch) => {
    const boardDispatches = useBoardDispatches(state, dispatch);
    const timerDispatches = useTimerDispatches(state, dispatch);

    const generateSudoku = (difficulty) => {
        timerDispatches.resetTimer();
        //animateDispatches.resetAnimate();

        boardDispatches.resetBoard();
        boardDispatches.setDifficulty(difficulty);

        const {sudoku, solution} = SudokuUtils.generateSudoku(difficulty);
        

        let initials = [];

        for(let i = 0; i< sudoku.board.length; ++i) {
            if(sudoku.get(i) !== 0) {
                initials.push({cell: i, number: sudoku.get(i)})
            }
        }

        boardDispatches.initializeBoard(initials);

        let solutionInitials = [];
        for(let i = 0; i<solution.board.length; ++i) {
            solutionInitials.push({cell: i, number: solution.get(i)});
        }
        boardDispatches.setSolution(new Sudoku(solutionInitials));
        timerDispatches.startTimer();
            
    

    }

    const clearBoard = () => {
        let newBoard = state.board_reducer.board.copy();
        newBoard.clear();
        boardDispatches.setBoard(newBoard);
    }

    const setCurrentCell = (currentCell) => {
        boardDispatches.setCurrentCell(currentCell);
    }

    const handleNumberClick = (number, cell = state.board_reducer.currentCell) => {
        if(state.board_reducer.placeAllOfActive) {
            placeAllOf(number);
        } else if(!state.board_reducer.board.isImmutableCell(cell)) {
            if(state.board_reducer.writeCandidates) {
                toggleCandidate(number, cell);
            } else {
                setNumber(number, cell);
            }
        }
    }

    // Find usages to switch to onNumberClicked
    const setNumber = (number, cell) => {


        let newBoard = state.board_reducer.board.copy();
        newBoard.set(cell, number);


        boardDispatches.setBoard(newBoard);
        boardDispatches.removeCellFromInvalid(cell);

        if(sudokuShouldBeValidated(newBoard))
            validateSudoku(newBoard)
    };

    const sudokuShouldBeValidated = (sudoku) => sudoku.isFull() || state.board_reducer.onTheGoValidation;

    const validateSudoku = (board = state.board_reducer.board) => {
        let invalidCells = SudokuUtils.validate_sudoku(board);
        boardDispatches.setInvalidCells(invalidCells);
        if(invalidCells.length === 0 && board.isFull()) {
            timerDispatches.stopTimer();
        }
    };

    const toggleCandidate = (number, cell) => {
        let newCandidates = new Map(state.board_reducer.candidates);
        let cellCandidates = newCandidates.get(cell);

        if(cellCandidates) {
            if(cellCandidates.includes(number)) {
                cellCandidates = cellCandidates.filter(candidate => candidate !== number);
            } else {
                cellCandidates.push(number);
            }
            newCandidates.set(cell, cellCandidates);
        } else {
            newCandidates.set(cell, [number]);
        }

        boardDispatches.setCandidates(newCandidates);
    };

    const toggleWriteCandidates = () => {
        console.log("state from action",state)
        boardDispatches.toggleWriteCandidates();
    };

    const solveSudoku = () => {
        boardDispatches.setBoard(state.board_reducer.solution);
        timerDispatches.stopTimer();
    };

    const placeAllOf = (number) => {
        let solution = state.board_reducer.solution.board;
        let newBoard = state.board_reducer.board.copy();

        solution.forEach((numberInCell, cell) => {
            if(numberInCell === number) {
                newBoard.addInitial(cell, number)
            }
        })

        boardDispatches.setBoard(newBoard)
    };

    const addHint = (cell = state.board_reducer.currentCell) => {
        console.log("cell is: ", cell)
        let newBoard = state.board_reducer.board.copy();
        newBoard.addInitial(cell, state.board_reducer.solution.get(cell));

        boardDispatches.setBoard(newBoard);
    };

    const toggleShowHelp = () => {
        boardDispatches.toggleShowHelp();
    };

    const toggleOnTheGoValidation = () => {
        boardDispatches.toggleOnTheGoValidation();
    };

    const toggleShowConnectedCells = () => {
        boardDispatches.toggleShowConnectedCells();
    };

    const togglePlaceAllOfActive = () => {
        boardDispatches.togglePlaceAllOfActive();
    };

    return {
        generateSudoku,
        clearBoard,
        setCurrentCell,
        handleNumberClick,
        setNumber,
        toggleWriteCandidates,
        validateSudoku,
        solveSudoku,
        addHint,
        toggleShowHelp,
        toggleOnTheGoValidation,
        toggleShowConnectedCells,
        togglePlaceAllOfActive
    }
}