import * as SudokuUtils from '../src/utils/sudoku_utils'
import Sudoku from '../src/models/sudoku'

test("Get connected cells to 0", () => {
    let connectedTo0 = SudokuUtils.getConnectedCells(0);
    connectedTo0.sort((a,b) => a - b);
    let expectedConnectedTo0 = [1,2,3,4,5,6,7,8,9,10,11,18,19,20,27,36,45,54,63,72];
    expectedConnectedTo0.sort((a, b) => a - b);
    expect(connectedTo0).toHaveLength(expectedConnectedTo0.length);
    for(let i of expectedConnectedTo0) {
        expect(connectedTo0).toContain(i);
    }
    
})

test("Get connected cells to 40", () => {
    let connectedTo40 = SudokuUtils.getConnectedCells(40);
    connectedTo40.sort((a,b) => a - b);
    let expectedConnectedTo40 = [36,37,38,39,41,42,43,44,4,13,22,31,58,67,76,30,32,48,49,50];
    expectedConnectedTo40.sort((a, b) => a - b);
    expect(connectedTo40).toHaveLength(expectedConnectedTo40.length);
    for(let i of expectedConnectedTo40) {
        expect(connectedTo40).toContain(i)
    }
})

test("Empty sudoku valid", () => {
    let emptySudoku = new Sudoku();
    let answer = SudokuUtils.validate_sudoku(emptySudoku);
    expect(answer.length).toBe(0);
});

test("Place number on any postition in empty sudoku", () => {
    let emptySudoku = new Sudoku();

    for (let i = 0; i < 81; ++i) {
        emptySudoku.set(i, 7);
        expect(SudokuUtils.validate_sudoku(emptySudoku).length).toBe(0);
        emptySudoku.set(i, 0);
    }
});

describe('Tests for invalid sudoku', () =>
{
    test("Invalid column invalidates sudoku", () => {
        let invalidSudoku;
        for (let i = 18; i <= 26; ++i) {
            invalidSudoku = new Sudoku();
            invalidSudoku.set(i,1);
            invalidSudoku.set(i+45, 1);
            let invalidCells = SudokuUtils.validate_sudoku(invalidSudoku);
            expect(invalidCells.length).toBeGreaterThan(0);
            expect(invalidCells).toContain(i);
            expect(invalidCells).toContain(i+45);
        }
    });

    test("Invalid row invalidates sudoku", () => {
        let invalidSudoku;

        for (let i = 2; i <= 74; i += 9) {
            invalidSudoku = new Sudoku()
            invalidSudoku.set(i, 1);
            invalidSudoku.set(i+5, 1);
            let invalidCells = SudokuUtils.validate_sudoku(invalidSudoku);
            expect(invalidCells.length).toBeGreaterThan(0);
            expect(invalidCells).toContain(i);
            expect(invalidCells).toContain(i+5);
        }
    });

    test("Invalid box invalidates sudoku", () => {
        let invalidSudoku;
        let firstCell = 9;
        let secondCell = 19;

        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                invalidSudoku = new Sudoku();
                invalidSudoku.set(firstCell, 1);
                invalidSudoku.set(secondCell, 1);
                let invalidCells = SudokuUtils.validate_sudoku(invalidSudoku);
                expect(invalidCells.length).toBeGreaterThan(0);
                expect(invalidCells).toContain(firstCell);
                expect(invalidCells).toContain(secondCell);
                firstCell += 3;
                secondCell += 3;
            }
            firstCell += 18;
            secondCell += 18;
        }
    });
})
describe('Ahookstest for valid sudoku', () => {
    test("Valid row = valid sudoku", () => {
        let validSudoku = new Sudoku();
        for (let i = 0; i <= 72; i += 9) {
            validSudoku = new Sudoku();
            for (let j = 0; j < 9; ++j) {
                validSudoku.set(i+j, j+1);
            }
            expect(SudokuUtils.validate_sudoku(validSudoku).length).toBe(0);
        }
    });

    test("Valid column = valid sudoku", () => {
        let validSudoku = new Sudoku();
        for (let i = 0; i < 9; ++i) {
            validSudoku = new Sudoku();
            for (let j = 0; j < 9; ++j) {
                validSudoku.set(i + j * 9, j + 1);
            }
            expect(SudokuUtils.validate_sudoku(validSudoku).length).toBe(0);
        }
    });

    test("Valid box = valid sudoku", () => {
        let validSudoku;
        let starts = [0, 3, 6, 27, 30, 33, 54, 57, 60];
        let actNbr;
        for (let start of starts) {
            validSudoku = new Sudoku();
            actNbr = 1;
            for (let i = 0; i < 3; ++i) {
                for (let j = 0; j < 3; ++j) {
                    validSudoku.set(start + i * 9 + j, actNbr++);
                }
            }
            expect(SudokuUtils.validate_sudoku(validSudoku).length).toBe(0);
        }

    });
});

