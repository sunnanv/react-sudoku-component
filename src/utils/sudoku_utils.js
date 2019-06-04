import Sudoku from "../models/sudoku";

export class SudokuUtils {

    /**
     * Validates all cells in a sudoku-board
     * Returns an array of invalid cells
     */
    static validate_sudoku = (board) => {
        let invalidCells = [];
        for (let i = 0; i < 80; ++i) {
            if (!this.validateCell(board, i))
                invalidCells.push(i);
        }
        return invalidCells;
    };


    /**
     * Returns an array containing
     * all cells connected to the current cell
     * (row, column and cell-group)
     */
    static getConnectedCells = (cell) => {
        let connectedCells = [];

        let rowStart = cell;
        while (rowStart % 9 !== 0) {
            rowStart--;
        }

        let colStart = cell;
        while (colStart > 8) {
            colStart -= 9
        }

        let cellGroupStart = cell;
        while (cellGroupStart % 27 > 8) {
            cellGroupStart -= 9;
        }
        while (cellGroupStart % 3 !== 0) {
            cellGroupStart--;
        }

        for (let i = 0; i < 9; ++i) {
            let actRow = rowStart + i;
            let actCol = colStart + 9 * i;
            let actCellGroup = cellGroupStart + i % 3;
            if (actRow !== cell && !connectedCells.includes(actRow))
                connectedCells.push(actRow);
            if (actCol !== cell && !connectedCells.includes(actCol))
                connectedCells.push(actCol)
            if (actCellGroup !== cell && !connectedCells.includes(actCellGroup))
                connectedCells.push(actCellGroup)
            if ((actCellGroup + 1) % 3 === 0) {
                cellGroupStart += 9
            }
        }
        return connectedCells
    }

    /**
     * Validates a single cell.
     * Returns true or false
     */
    static validateCell = (board, cell) => {

        if (board.get(cell) === 0) return true;

        let nbr = board.get(cell);
        let connectedCells = this.getConnectedCells(cell);

        for(let j of connectedCells) {
            if(board.get(j) === nbr) {
                return false;
            }
        }
        return true;
    };

    /**
     * Solves the sudoku that is passed. The solution will be written on the passed board.
     * @param {SudokuBoard} board the board to solve
     * @returns true if the sudoku was solvable, else false
     */
    static solve(board) {
        if(this.validate_sudoku(board).length === 0)
            return this.recSolve(0, board, board);
        else return false;
    }

    /**
     * Recursive funtion that solved a sudoku by brute force
     * @param {number} cell number of the current cell (0-81)
     * @param {SudokuBoard} board the board to solve
     * @param {SudokuBoard} initialBoard the board as it looked in the beginning
     */
    static recSolve = (cell, board, initialBoard) => {
        if(cell === 81) {
            return this.validate_sudoku(board).length === 0;
        }
        if(this.validate_sudoku(board).length===0) {
            if(initialBoard.get(cell) !== 0) {
                return this.recSolve(cell+1, board, initialBoard)
            }
            for(let i = 1; i<10; ++i) {
                board.set(cell, i);
                if(this.recSolve(cell+1, board, initialBoard)){
                    return true;
                }
                board.set(cell, 0);
            }
        }
        return false;
    }


    /**
     * Generates a random sudoku
     * @param {string} difficulty the difficulty of the sudoku to solve {easy, medium, hard}
     */
    static generateSudoku = (difficulty) => {
        // Generate first and last row
        let lastRow = [];
        let firstRow = [];
        let solved;
        let solvedSudoku;
        do {
            for(let i = 0; i<9; ++i) {
                let lastRowNbr = Math.floor(Math.random()*9)+1;
                let firstRowNbr = Math.floor(Math.random()*9)+1;
                while(lastRow.includes(lastRowNbr)) {
                    lastRowNbr = Math.floor(Math.random()*9)+1;
                }
                while(firstRow.includes(firstRowNbr) || firstRowNbr === lastRowNbr) {
                    firstRowNbr = Math.floor(Math.random()*9)+1;
                }
                firstRow.push(firstRowNbr);
                lastRow.push(lastRowNbr);
            }

            solvedSudoku = new Sudoku();
            for(let i = 0; i<9; ++i) {
                solvedSudoku.set(i, firstRow[i]);
                solvedSudoku.set(i+72, lastRow[i]);
            }

            solved = this.solve(solvedSudoku);
        } while(!solved)


        let sudoku = new Sudoku();

        let nbrsToAdd = 37;
        if(difficulty === 'hard') nbrsToAdd = 21;
        else if(difficulty === 'medium') nbrsToAdd = 29;

        for(let i = 0; i<nbrsToAdd; ++i) {
            let cell = Math.floor(Math.random()*81);
            while(sudoku.get(cell) !== 0) {
                cell = Math.floor(Math.random()*81);
            }
            sudoku.board[cell] = solvedSudoku.get(cell)
        }

        return {sudoku: sudoku, solution: solvedSudoku}
    }
}



