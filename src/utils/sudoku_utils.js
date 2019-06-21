import Sudoku from "../models/sudoku";

/**
     * Validates a sudoku-board and return the invalid cells.
     * 
     * @param {Sudoku} board the sudoku-board to validate
     * @returns {number[]} an array containing the invalid cells
     */
    export const validate_sudoku = (board) => {
        let invalidCells = [];
        for (let i = 0; i < 81; ++i) {
            if (!validateCell(board, i))
                invalidCells.push(i);
        }
        return invalidCells;
    };

    /**
     * Validates a single cell.
     * @param {Sudoku} board the sudoku-board where the cell is included
     * @param {number} cell the cell to validate
     * @returns {boolean} true if the cell is valid, else false
     */
    export const validateCell = (board, cell) => {

        if (board.get(cell) === 0) return true;

        let nbr = board.get(cell);
        let connectedCells = getConnectedCells(cell);

        for(let j of connectedCells) {
            if(board.get(j) === nbr) {
                return false;
            }
        }
        return true;
    };


    /**
     * Returns an array containing
     * all cells connected to the current cell.
     * (row, column and cell-group)
     * @param {number} cell the cell from which to find connected cells
     * @returns {number[]} an array containing all cells connected to the specified cell
     */
    export const getConnectedCells = (cell) => {
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
     * Solves the sudoku that is passed. The solution will be written on the passed board.
     * @param {Sudoku} board the board to solve
     * @returns {boolean}true if the sudoku was solvable, else false
     */
    export const solve = (board) => {
        if(validate_sudoku(board).length === 0)
            return recSolve(0, board, board);
        else return false;
    }

    /**
     * Recursive funtion that solved a sudoku by brute force
     * @param {number} cell number of the current cell (0-81)
     * @param {Board} board the board to solve
     * @param {Board} initialBoard the board as it looked in the beginning
     * 
     * @returns true if the sudoku was solved, else false
     */
    export const recSolve = (cell, board, initialBoard) => {
        if(cell === 81) {
            return validate_sudoku(board).length === 0;
        }
        if(validate_sudoku(board).length===0) {
            if(initialBoard.get(cell) !== 0) {
                return recSolve(cell+1, board, initialBoard)
            }
            for(let i = 1; i<10; ++i) {
                board.set(cell, i);
                if(recSolve(cell+1, board, initialBoard)){
                    return true;
                }
                board.set(cell, 0);
            }
        }
        return false;
    }
  
    /**
     * Generates a random sudoku
     * @param {('easy'|'medium'|'hard')} difficulty the difficulty of the sudoku to solve
     * 
     * @returns {{sudoku: Sudoku, solution: Sudoku}} the generated sudoku and its solution
     */
    export const generateSudoku = (difficulty) => { 
        let solved;
        let solvedSudoku;
        do {
            
            let firstRow = generateSudokuRow();            
            let lastRow = generateSudokuRow([firstRow]);

            solvedSudoku = new Sudoku();

            for(let i = 0; i<9; ++i) {
                solvedSudoku.set(i, firstRow[i]);
                solvedSudoku.set(i+72, lastRow[i]);
            }
                        
            solved = solve(solvedSudoku);
                        
        } while(solved !== true);
        
        let sudoku = createSudokuFromSolvedSudoku(solvedSudoku, difficulty);

        return {sudoku: sudoku, solution: solvedSudoku}
    }

    /**
     * Generates a row for a sudoku.
     * @param {number[][]} matchingRows an array of arrays containing numbers from neighbor rows
     * 
     * @returns {number[]} an array of numbers to be placed in a row
     */
    export const generateSudokuRow = (matchingRows = []) => {
        const MAX_NBR_OF_TRIES = 1000;
        const ROW_LENGTH = 9;
        const randomCellNumber = () => Math.floor(Math.random()*9)+1;
        let row = [];

        while(row.length !== ROW_LENGTH) {
            
            let nbrOfTries = 0;
            let nbrsInOtherRows = matchingRows.map(otherRow => otherRow[row.length]);
            let cellNbr = randomCellNumber();

            while (++nbrOfTries <= MAX_NBR_OF_TRIES && 
                  (row.includes(cellNbr) || nbrsInOtherRows.includes(cellNbr))) {

                    cellNbr = randomCellNumber();
            }
            
            
            if(nbrOfTries >= MAX_NBR_OF_TRIES)
                row = [];

            row.push(cellNbr)
        }
        return row;
    }

    export const difficulties = {
        'easy': 37,
        'medium': 29,
        'hard': 21
    };

    /**
     * Creates a sudoku with the specified difficulty from the passed solved sudoku
     * @param {Sudoku} solvedSudoku a solved sudoku
     * @param {('easy'|'medium'|'hard')} difficulty difficulty of the new sudoku
     * 
     * @returns {Sudoku} a sudoku derived from the solved sudoku. 
     */
    export const createSudokuFromSolvedSudoku = (solvedSudoku, difficulty) => {

        const getRandomCellNumber = () => Math.floor(Math.random()*81);
        let nbrsToAdd = difficulties[difficulty];
        
        let sudoku = new Sudoku();

        for(let i = 0; i<nbrsToAdd; ++i) {
            let cell = getRandomCellNumber();
            while(sudoku.get(cell) !== 0) {
                cell = getRandomCellNumber();
            }
            sudoku.board[cell] = solvedSudoku.get(cell)
        }
        return sudoku;
    }