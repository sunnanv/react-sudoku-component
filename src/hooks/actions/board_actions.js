import { useBoardDispatches } from './board_dispatches';

import * as SudokuUtils from '../../utils/sudoku_utils';

export const useBoardActions = (state, dispatch) => {
    const boardDispatches = useBoardDispatches(state, dispatch);

    const generateSudoku = (difficulty) => {
        /*timerDispatches.resetTimer();
        animateDispatches.resetAnimate();
        */
        boardDispatches.resetBoard();
        boardDispatches.setDifficulty(difficulty);

        const {sudoku, solution} = SudokuUtils.generateSudoku(difficulty)
        

        let initials = [];

        for(let i = 0; i< sudoku.board.length; ++i) {
            if(sudoku.get(i) !== 0) {
                initials.push({cell: i, number: sudoku.get(i)})
            }
        }

        boardDispatches.initializeBoard(initials);
        boardDispatches.setSolution(solution);
        // timerDispatches.startTimer();
            
    

    }

    const clearBoard = () => {
        boardDispatches.clearBoard();
    }

    const setCurrentCell = (currentCell) => {
        boardDispatches.setCurrentCell(currentCell);
    }

    const setNumber = (number, cell) => {
        boardDispatches.setNumber(number, cell);
        boardDispatches.removeCellFromInvalid(cell);
    }

    return {
        generateSudoku,
        clearBoard,
        setCurrentCell,
        setNumber
    }
}