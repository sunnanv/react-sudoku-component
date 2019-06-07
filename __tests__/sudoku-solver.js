import { SudokuUtils } from "../parts/sudoku/utils/utils";
import { testBoards } from '../boards'
import Sudoku from '../parts/sudoku/components/model/sudoku'

test("Solve empty sudoku", async () => {
    let emptySudoku = new Sudoku();
    let solved = await SudokuUtils.solve(emptySudoku)

    expect(solved).toBe(true);
    expect(emptySudoku.isFull()).toBe(true)
});

test("Solve sudoku with 1 valid number", async () => {
    let sudoku = new Sudoku();
    sudoku.set(2, 5);
    let solved = await SudokuUtils.solve(sudoku)

    expect(solved).toBe(true);
    expect(sudoku.isFull()).toBe(true);
    expect(sudoku.get(2)).toBe(5);
});

test("Solve sudoku with 10 valid numbers", async () => {
    let initials = [
        { cell: 0, number: 9 }, { cell: 4, number: 1 }, { cell: 27, number: 2 },
        { cell: 28, number: 1 }, { cell: 29, number: 4 }, { cell: 40, number: 9 },
        { cell: 42, number: 2 }, { cell: 46, number: 8 }, { cell: 47, number: 9 },
        { cell: 49, number: 2 }];
    let sudoku = new Sudoku(initials);

    let solved = await SudokuUtils.solve(sudoku)

    expect(solved).toBe(true)
    expect(sudoku.isFull()).toBe(true);
    for (let i of initials) {
        expect(sudoku.get(i.cell)).toBe(i.number);
    }
});

test("Solve invalid sudoku with 2 values in same cell", async () => {
    let invalidSudoku;

    let first = 0, second = 20;
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            invalidSudoku = new Sudoku();
            invalidSudoku.set(first, 1);
            invalidSudoku.set(second, 1);
            let solved = await SudokuUtils.solve(invalidSudoku);
            expect(solved).toBe(false);
            first += 3;
            second += 3;
        }
        first += 18;
        second += 18;
    }
});

test("Solve invalid sudoku with two values in same row", async () => {
    let invalidSudoku;
    let first = 2;
    let second = 7;
    for (let i = 0; i < 9; ++i) {
        invalidSudoku = new Sudoku();
        invalidSudoku.set(first + i * 9, 1);
        invalidSudoku.set(second + i * 9, 1);
        let solved = await SudokuUtils.solve(invalidSudoku)
        expect(solved).toBe(false);
    }
});

test("Solve invalid sudoku with two values in same column", async () => {
    let invalidSudoku;
    let first = 9;
    let second = 63;
    for (let i = 0; i < 9; ++i) {
        invalidSudoku = new Sudoku();
        invalidSudoku.set(first + i, 1);
        invalidSudoku.set(second + i, 1);
        let solved = await SudokuUtils.solve(invalidSudoku)
        expect(solved).toBe(false);
    }
})

test("Solve real boards", async () => {
    for (let board of testBoards) {
        let currBoard = new Sudoku();
        currBoard.setBoard(board.board)
        let solution = board.solution.slice();
        let solved = await SudokuUtils.solve(currBoard)
        expect(currBoard.isFull()).toBe(true);
        expect(solved).toBe(true);

        for (let i = 0; i < 81; ++i) {
            expect(currBoard.get(i)).toBe(solution[i]);
        }

    }
})