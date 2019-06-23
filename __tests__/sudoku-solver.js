import * as SudokuUtils from '../src/utils/sudoku_utils'
import Sudoku from '../src/models/sudoku'

test("Solve empty sudoku", () => {
    let emptySudoku = new Sudoku();
    let solved = SudokuUtils.solve(emptySudoku);

    expect(solved).toBe(true);
    expect(emptySudoku.isFull()).toBe(true)
});

test("Solve sudoku with 1 valid number",  () => {
    let sudoku = new Sudoku();
    sudoku.set(2, 5);
    let solved =  SudokuUtils.solve(sudoku);

    expect(solved).toBe(true);
    expect(sudoku.isFull()).toBe(true);
    expect(sudoku.get(2)).toBe(5);
});

test("Solve sudoku with 10 valid numbers",  () => {
    let initials = [
        { cell: 0, number: 9 }, { cell: 4, number: 1 }, { cell: 27, number: 2 },
        { cell: 28, number: 1 }, { cell: 29, number: 4 }, { cell: 40, number: 9 },
        { cell: 42, number: 2 }, { cell: 46, number: 8 }, { cell: 47, number: 9 },
        { cell: 49, number: 2 }];
    let sudoku = new Sudoku(initials);

    let solved =  SudokuUtils.solve(sudoku);

    expect(solved).toBe(true);
    expect(sudoku.isFull()).toBe(true);
    for (let i of initials) {
        expect(sudoku.get(i.cell)).toBe(i.number);
    }
});

test("Solve invalid sudoku with 2 values in same cell",  () => {
    let invalidSudoku;

    let first = 0, second = 20;
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            invalidSudoku = new Sudoku();
            invalidSudoku.set(first, 1);
            invalidSudoku.set(second, 1);
            let solved =  SudokuUtils.solve(invalidSudoku);
            expect(solved).toBe(false);
            first += 3;
            second += 3;
        }
        first += 18;
        second += 18;
    }
});

test("Solve invalid sudoku with two values in same row",  () => {
    let invalidSudoku;
    let first = 2;
    let second = 7;
    for (let i = 0; i < 9; ++i) {
        invalidSudoku = new Sudoku();
        invalidSudoku.set(first + i * 9, 1);
        invalidSudoku.set(second + i * 9, 1);
        let solved =  SudokuUtils.solve(invalidSudoku);
        expect(solved).toBe(false);
    }
});

test("Solve invalid sudoku with two values in same column",  () => {
    let invalidSudoku;
    let first = 9;
    let second = 63;
    for (let i = 0; i < 9; ++i) {
        invalidSudoku = new Sudoku();
        invalidSudoku.set(first + i, 1);
        invalidSudoku.set(second + i, 1);
        let solved =  SudokuUtils.solve(invalidSudoku);
        expect(solved).toBe(false);
    }
});

test("Solve real boards",  () => {
    for (let board of testBoards) {
        let currBoard = new Sudoku();
        currBoard.setBoard(board.board);
        let solution = board.solution.slice();
        let solved =  SudokuUtils.solve(currBoard);
        expect(currBoard.isFull()).toBe(true);
        expect(solved).toBe(true);

        for (let i = 0; i < 81; ++i) {
            expect(currBoard.get(i)).toBe(solution[i]);
        }

    }
});



/* Hard Boards: */

export const testBoards =[
    {board:
            [
                0,0,0, 0,1,0, 0,0,0,
                0,0,9, 8,5,2, 3,0,0,
                8,0,0, 0,4,0, 0,0,9,

                0,7,0, 1,0,4, 0,9,0,
                0,0,0, 0,8,0, 0,0,0,
                0,0,0, 7,0,3, 0,0,0,

                5,0,0, 0,0,0, 0,0,8,
                6,4,0, 9,0,5, 0,1,2,
                0,9,1, 0,0,0, 5,3,0
            ],
        solution:
            [
                4,2,7, 3,1,9, 6,8,5,
                1,6,9, 8,5,2, 3,4,7,
                8,5,3, 6,4,7, 1,2,9,

                3,7,5, 1,2,4, 8,9,6,
                9,1,4, 5,8,6, 2,7,3,
                2,8,6, 7,9,3, 4,5,1,

                5,3,2, 4,7,1, 9,6,8,
                6,4,8, 9,3,5, 7,1,2,
                7,9,1, 2,6,8, 5,3,4
            ]
    }
];