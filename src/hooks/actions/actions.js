import { useBoardDispatches } from './board_dispatches';
import { useTimerDispatches } from "./timer_dispatches";
import { useHelpDispatches } from './help_dispatches';

import * as SudokuUtils from '../../utils/sudoku_utils';
import Sudoku from '../../models/sudoku';

export const useActions = (state, dispatch) => {
    const boardDispatches = useBoardDispatches(dispatch);
    const helpDispatches = useHelpDispatches(dispatch);
    const timerDispatches = useTimerDispatches(dispatch);

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
        const {
            board
        } = state.board;;

        let newBoard = board.copy();
        newBoard.clear();
        
        boardDispatches.setBoard(newBoard);
    };

    const setCurrentCell = (currentCell) => {
        boardDispatches.setCurrentCell(currentCell);
    };

    const handleNumberClick = (number, cell = state.board.currentCell) => {
        const {
            isSolved,
            board,
            writeCandidates
        } = state.board;

        const {
            placeAllOfActive
        } = state.help;

        if(isSolved)
            return;
        if(placeAllOfActive) {
            placeAllOf(number);
            togglePlaceAllOfActive();
        } else if(!board.isImmutableCell(cell)) {
            if(writeCandidates) {
                toggleCandidate(number, cell);
            } else {
                setNumber(number, cell);
            }
        }
    };

    // Find usages to switch to onNumberClicked
    const setNumber = (number, cell) => {
        const {
            board
        } = state.board;

        const {
            invalidCells
        } = state.help;

        let newBoard = board.copy();
        newBoard.set(cell, number);

        let newInvalidCells = invalidCells.filter(invalidCell => invalidCell !== cell);

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
        const {
            onSolved
        } = state.board;

        const {
            helpUsage
        } = state.help;

        const {
            timeElapsed
        } = state.timer;


        let invalidCells = SudokuUtils.validate_sudoku(board);
        helpDispatches.setInvalidCells(invalidCells);

        if(invalidCells.length === 0 && board.isFull()) {
            timerDispatches.setTimerActive(false);
            boardDispatches.setIsSolved(true);
            onSolved({time: timeElapsed, helps: helpUsage})
        } else {
            addHelpUsage(HELP_TYPES.VALIDATION);
        }
    };

    const toggleCandidate = (number, cell) => {
        const {
            candidates
        } = state.board;

        let newCandidates = new Map(candidates);
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
        const {
            writeCandidates
        } = state.board;

        let newWriteCandidates = !writeCandidates;
        boardDispatches.setWriteCandidates(newWriteCandidates);
    };

    const solveSudoku = () => {
        const CELLS_IN_SUDOKU = 81;
        const { 
            solution, 
            hintedCells,
            helpUsage
        } = state.help;

        const { 
            board,
            onSolved
        } = state.board;


        let newHintedCells = hintedCells.slice();
        let newBoard = board.copy();
        let nbrOfHinted = 0;

        for(let cell = 0; cell<CELLS_IN_SUDOKU; ++cell) {
            if(!board.isImmutableCell(cell) && board.get(cell) !== solution.get(cell)) {
                newBoard.addInitial(cell, solution.get(cell));
                newHintedCells.push(cell);
                nbrOfHinted++;
            }
        }

        addHelpUsage(HELP_TYPES.HINT, nbrOfHinted);

        boardDispatches.setBoard(newBoard);
        timerDispatches.setTimerActive(false);
        helpDispatches.setHintedCells(newHintedCells);
        onSolved(helpUsage)
    };

    const placeAllOf = (number) => {
        const {
            board
        } = state.board;

        const {
            solution,
            hintedCells
        } = state.help;

        let newBoard = board.copy();
        let newHintedCells = hintedCells.slice();

        let alreadyFilled = board.immutable.map(immutableCell => {
            if(immutableCell.number === number)
                return immutableCell.cell;
        });

        let nbrOfHints = 0;
        solution.board.forEach((numberInCell, cell) => {
            if(numberInCell === number && !alreadyFilled.includes(cell)) {
                newBoard.addInitial(cell, number);
                newHintedCells.push(cell);
                nbrOfHints++;
            }
        });

        addHelpUsage(HELP_TYPES.HINT, nbrOfHints);
        boardDispatches.setBoard(newBoard);
        helpDispatches.setHintedCells(newHintedCells);
        if(sudokuShouldBeValidated(newBoard))
            validateSudoku(newBoard);
    };

    const addHint = (cell = state.board.currentCell) => {
        const {
            board
        } = state.board;

        const {
            hintedCells,
            solution
        } = state.help;

        let newBoard = board.copy();
        let newHintedCells = hintedCells.slice();
        let numberInCell = solution.get(cell);

        if(!newBoard.isImmutableCell(cell)) {

            newBoard.addInitial(cell, numberInCell);
            newHintedCells.push(cell);

            boardDispatches.setBoard(newBoard);
            addHelpUsage(HELP_TYPES.HINT);
            helpDispatches.setHintedCells(newHintedCells);

            if (sudokuShouldBeValidated(newBoard))
                validateSudoku(newBoard);
        }

    };

    const toggleShowHelp = () => {
        const {
            showHelp
        } = state.help;

        let newShowHelp = !showHelp;
        helpDispatches.setShowHelp(newShowHelp);
    };

    const toggleOnTheGoValidation = () => {
        const {
            onTheGoValidation
        } = state.help;

        let newOnTheGoValidation = !onTheGoValidation;
        helpDispatches.setOnTheGoValidation(newOnTheGoValidation);
    };

    const toggleShowConnectedCells = () => {
        const {
            showConnectedCells
        } = state.help;

        let newShowConnectedCells = !showConnectedCells;
        helpDispatches.setShowConnectedCells(newShowConnectedCells);
    };

    const togglePlaceAllOfActive = () => {
        const {
            placeAllOfActive
        } = state.help;

        let newPlaceAllOfActive = !placeAllOfActive;
        helpDispatches.setPlaceAllOfActive(newPlaceAllOfActive);
    };

    const HELP_TYPES = {
        VALIDATION: 'validation',
        HINT: 'hint',
        PLACE_ALL_OF: 'placeAllOf',
        ON_THE_GO_VALIDATION: 'onTheGoValidation'
    };

    const addHelpUsage = (helpType, nbrOfHelps = 1) => {
        const {
            helpUsage
        } = state.help;
        let newHelpUsage = new Map(helpUsage);

        newHelpUsage.set(helpType, newHelpUsage.get(helpType)+nbrOfHelps);

        helpDispatches.setHelpUsage(newHelpUsage);
    };

    const tickTimer = () => {
        const {
            timeElapsed
        } = state.timer;

        timerDispatches.setTimeElapsed(timeElapsed + 1);
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
        togglePlaceAllOfActive,
        tickTimer
    }
};