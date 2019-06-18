import { useBoardDispatches } from './board_dispatches';
import { useTimerDispatches } from "./timer_dispatches";
import { useHelpDispatches } from './help_dispatches';

import * as SudokuUtils from '../../utils/sudoku_utils';
import Sudoku from '../../models/sudoku';

export const useActions = (state, dispatch) => {
    const boardDispatches = useBoardDispatches(dispatch);
    const timerDispatches = useTimerDispatches(dispatch);
    const helpDispatches = useHelpDispatches(dispatch);

    const generateSudoku = (difficulty) => {
        timerDispatches.resetTimerState();
        helpDispatches.resetHelpState();
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
        helpDispatches.setSolution(new Sudoku(solutionInitials));
        timerDispatches.setTimerActive(true);
    };

    const clearBoard = () => {
        let newBoard = state.board.board.copy();
        newBoard.clear();
        boardDispatches.setBoard(newBoard);

    };

    const setCurrentCell = (currentCell) => {
        boardDispatches.setCurrentCell(currentCell);
    };

    const handleNumberClick = (number, cell = state.board.currentCell) => {
        if(state.help.placeAllOfActive) {
            placeAllOf(number);
            togglePlaceAllOfActive();
        } else if(!state.board.board.isImmutableCell(cell)) {
            if(state.board.writeCandidates) {
                toggleCandidate(number, cell);
            } else {
                setNumber(number, cell);
            }
        }
    }

    // Find usages to switch to onNumberClicked
    const setNumber = (number, cell) => {
        let newBoard = state.board.board.copy();
        newBoard.set(cell, number);

        let newInvalidCells = state.help.invalidCells.filter(invalidCell => invalidCell !== cell);

        boardDispatches.setBoard(newBoard);
        helpDispatches.setInvalidCells(newInvalidCells);

        if(sudokuShouldBeValidated(newBoard))
            validateSudoku(newBoard)
    };

    const sudokuShouldBeValidated = (sudoku) => sudoku.isFull() || state.help.onTheGoValidation;

    const removeNumberFromCell = (cell) => {
        handleNumberClick(0, cell);
    };

    const validateSudoku = (board = state.board.board) => {
        let invalidCells = SudokuUtils.validate_sudoku(board);
        helpDispatches.setInvalidCells(invalidCells);

        if(invalidCells.length === 0 && board.isFull()) {
            timerDispatches.setTimerActive(false);
        } else if(!state.help.onTheGoValidation) {
            addHelpUsage(HELP_TYPES.VALIDATION);
        }
    };

    const toggleCandidate = (number, cell) => {
        let newCandidates = new Map(state.board.candidates);
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
        let newWriteCandidates = !state.board.writeCandidates;
        boardDispatches.setWriteCandidates(newWriteCandidates);
    };

    const solveSudoku = () => {
        const CELLS_IN_SUDOKU = 81;
        console.log(state);
        const { solution, hintedCells } = state.help;
        const { board } = state.board;


        let newHintedCells = hintedCells.slice();
        let newBoard = board.copy();

        for(let cell = 0; cell<CELLS_IN_SUDOKU; ++cell) {
            if(!board.isImmutableCell(cell) && board.get(cell) !== solution.get(cell)) {
                newBoard.addInitial(cell, solution.get(cell));
                newHintedCells.push(cell);
            }
        }

        boardDispatches.setBoard(newBoard);
        timerDispatches.setTimerActive(false);
        helpDispatches.setHintedCells(newHintedCells);
    };

    const placeAllOf = (number) => {
        let solution = state.help.solution.board;
        let oldBoard = state.board.board;
        let newBoard = oldBoard.copy();
        let newHintedCells = state.help.hintedCells.slice();

        let alreadyFilled = oldBoard.immutable.map(immutableCell => {
            if(immutableCell.number === number)
                return immutableCell.cell;
        });

        let nbrOfHints = 0;
        solution.forEach((numberInCell, cell) => {
            if(numberInCell === number && !alreadyFilled.includes(cell)) {
                newBoard.addInitial(cell, number);
                newHintedCells.push(cell);
                nbrOfHints++;
            }
        });

        addHelpUsage(HELP_TYPES.HINT, nbrOfHints);
        boardDispatches.setBoard(newBoard);
        helpDispatches.setHintedCells(newHintedCells);
    };

    const addHint = (cell = state.board.currentCell) => {
        let newBoard = state.board.board.copy();
        let newHintedCells = state.help.hintedCells.slice();
        let numberInCell = state.help.solution.get(cell);
        newBoard.addInitial(cell, numberInCell);
        newHintedCells.push(cell);
        boardDispatches.setBoard(newBoard);
        addHelpUsage(HELP_TYPES.HINT);
        helpDispatches.setHintedCells(newHintedCells);
    };

    const toggleShowHelp = () => {
        console.log(state)
        let newShowHelp = !state.help.showHelp;
        helpDispatches.setShowHelp(newShowHelp);
    };

    const toggleOnTheGoValidation = () => {
        let newOnTheGoValidation = !state.help.onTheGoValidation;
        helpDispatches.setOnTheGoValidation(newOnTheGoValidation);
        addHelpUsage(HELP_TYPES.ON_THE_GO_VALIDATION);
    };

    const toggleShowConnectedCells = () => {
        let newShowConnectedCells = !state.help.showConnectedCells;
        helpDispatches.setShowConnectedCells(newShowConnectedCells);
    };

    const togglePlaceAllOfActive = () => {
        let newPlaceAllOfActive = !state.help.placeAllOfActive;
        helpDispatches.setPlaceAllOfActive(newPlaceAllOfActive);
    };

    const HELP_TYPES = {
        VALIDATION: 'validation',
        HINT: 'hint',
        PLACE_ALL_OF: 'placeAllOf',
        ON_THE_GO_VALIDATION: 'onTheGoValidation'
    };

    const addHelpUsage = (helpType, nbrOfHelps = 1) => {
        let newHelpUsage = new Map(state.help.helpUsage);
        newHelpUsage.set(helpType, newHelpUsage.get(helpType)+nbrOfHelps);

        helpDispatches.setHelpUsage(newHelpUsage);
    };

    const tickTimer = () => {
        timerDispatches.setTimeElapsed(state.timer.timeElapsed + 1);
    }

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
        togglePlaceAllOfActive,
        tickTimer
    }
}