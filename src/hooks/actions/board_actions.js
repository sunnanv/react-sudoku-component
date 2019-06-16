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
        boardDispatches.resetState();
        boardDispatches.setDifficulty(difficulty);

        const {sudoku, solution} = SudokuUtils.generateSudoku(difficulty);
        

        let initials = [];

        for(let i = 0; i< sudoku.board.length; ++i) {
            if(sudoku.get(i) !== 0) {
                initials.push({cell: i, number: sudoku.get(i)})
            } 
        }

        boardDispatches.setInitialized(true);
        boardDispatches.setBoard(new Sudoku(initials));

        let solutionInitials = [];
        for(let i = 0; i<solution.board.length; ++i) {
            solutionInitials.push({cell: i, number: solution.get(i)});
        }
        boardDispatches.setSolution(new Sudoku(solutionInitials));
        timerDispatches.startTimer();
    };

    const clearBoard = () => {
        let newBoard = state.board_reducer.board.copy();
        newBoard.clear();
        boardDispatches.setBoard(newBoard);

    };

    const setCurrentCell = (currentCell) => {
        boardDispatches.setCurrentCell(currentCell);
    };

    const handleNumberClick = (number, cell = state.board_reducer.currentCell) => {
        if(state.board_reducer.placeAllOfActive) {
            placeAllOf(number);
            togglePlaceAllOfActive();
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

        let newInvalidCells = state.board_reducer.invalidCells.filter(invalidCell => invalidCell !== cell);

        boardDispatches.setBoard(newBoard);
        boardDispatches.setInvalidCells(newInvalidCells);

        if(sudokuShouldBeValidated(newBoard))
            validateSudoku(newBoard)
    };

    const sudokuShouldBeValidated = (sudoku) => sudoku.isFull() || state.board_reducer.onTheGoValidation;

    const removeNumberFromCell = (cell) => {
        handleNumberClick(0, cell);
    };

    const validateSudoku = (board = state.board_reducer.board) => {
        let invalidCells = SudokuUtils.validate_sudoku(board);
        boardDispatches.setInvalidCells(invalidCells);

        if(invalidCells.length === 0 && board.isFull()) {
            timerDispatches.stopTimer();
        } else if(!state.board_reducer.onTheGoValidation) {
            addHelpUsage(HELP_TYPES.VALIDATION);
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
        let newWriteCandidates = !state.board_reducer.writeCandidates;
        boardDispatches.setWriteCandidates(newWriteCandidates);
    };

    const solveSudoku = () => {
        boardDispatches.setBoard(state.board_reducer.solution);
        timerDispatches.stopTimer();
    };

    const placeAllOf = (number) => {
        let solution = state.board_reducer.solution.board;
        let oldBoard = state.board_reducer.board;
        let newBoard = oldBoard.copy();

        let alreadyFilled = oldBoard.immutable.map(immutableCell => {
            if(immutableCell.number === number)
                return immutableCell.cell;
        });

        let nbrOfHints = 0;
        solution.forEach((numberInCell, cell) => {
            if(numberInCell === number && !alreadyFilled.includes(cell)) {
                newBoard.addInitial(cell, number);
                nbrOfHints++;
            }
        });

        addHelpUsage(HELP_TYPES.HINT, nbrOfHints);

        boardDispatches.setBoard(newBoard)
    };

    const addHint = (cell = state.board_reducer.currentCell) => {
        let newBoard = state.board_reducer.board.copy();
        let numberInCell = state.board_reducer.solution.get(cell);
        newBoard.addInitial(cell, numberInCell);
        boardDispatches.setBoard(newBoard);
        addHelpUsage(HELP_TYPES.HINT);
    };

    const toggleShowHelp = () => {
        let newShowHelp = !state.board_reducer.showHelp;
        boardDispatches.setShowHelp(newShowHelp);
    };

    const toggleOnTheGoValidation = () => {
        let newOnTheGoValidation = !state.board_reducer.onTheGoValidation;
        boardDispatches.setOnTheGoValidation(newOnTheGoValidation);
        addHelpUsage(HELP_TYPES.ON_THE_GO_VALIDATION);
    };

    const toggleShowConnectedCells = () => {
        let newShowConnectedCells = !state.board_reducer.showConnectedCells;
        boardDispatches.setShowConnectedCells(newShowConnectedCells);
    };

    const togglePlaceAllOfActive = () => {
        let newPlaceAllOfActive = !state.board_reducer.placeAllOfActive;
        boardDispatches.setPlaceAllOfActive(newPlaceAllOfActive);
    };

    const HELP_TYPES = {
        VALIDATION: 'validation',
        HINT: 'hint',
        PLACE_ALL_OF: 'placeAllOf',
        ON_THE_GO_VALIDATION: 'onTheGoValidation'
    };

    const addHelpUsage = (helpType, nbrOfHelps = 1) => {
        let newHelpUsage = new Map(state.board_reducer.helpUsage);
        newHelpUsage.set(helpType, newHelpUsage.get(helpType)+nbrOfHelps);

        boardDispatches.setHelpUsage(newHelpUsage);
    };

    return {
        generateSudoku,
        clearBoard,
        setCurrentCell,
        handleNumberClick,
        setNumber,
        removeNumberFromCell,
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