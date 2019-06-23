import Sudoku from '../src/models/sudoku'


test("Create new sudoku", () => {
    const initials = [
        {cell: 0, number: 4},
        {cell: 4, number: 3},
        {cell: 15, number: 6},
        {cell: 62, number: 1},
        {cell: 22, number: 2},
        {cell: 74, number: 8},
        {cell: 73, number: 7},
        {cell: 72, number: 6},
        {cell: 71, number: 5},
        {cell: 80, number: 2}
    ];
    let sudoku = new Sudoku(initials);

    for(let initial of initials) {
        expect(sudoku.get(initial.cell)).toBe(initial.number)
    }
});

test("Place numbers on edges", () => {
    let sudoku = new Sudoku();
    sudoku.set(0, 1);
    sudoku.set(80, 1);

    expect(sudoku.get(0)).toBe(1);
    expect(sudoku.get(80)).toBe(1);
});

test("Place numbers outside", () => {
    let sudoku = new Sudoku();
    sudoku.set(-10, 1);
    sudoku.set(81, 1);
    for(let i = 0; i<81; ++i) {
        expect(sudoku.get(i)).toBe(0);
    }
});

test("Place invalid numbers", () => {
    let sudoku = new Sudoku();
    sudoku.set(0, 100);
    sudoku.set(1, 10);
    sudoku.set(5, -1);

    for(let i = 0; i<81; ++i) {
        expect(sudoku.get(i)).toBe(0)
    }
});