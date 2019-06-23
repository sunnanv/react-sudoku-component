import * as SudokuUtils from '../src/utils/sudoku_utils'

const difficulties = [{difficulty: 'easy', nbrOfGiven: 37}, 
                      {difficulty: 'medium', nbrOfGiven: 29}, 
                      {difficulty: 'hard', nbrOfGiven: 21}];

for(let difficulty of difficulties) {
    describe(`Generate ${difficulty.difficulty} sudoku`, () => {
        for(let i = 0; i<2; ++i) {
            describe(`Test number ${i}`, () => {
                let generated;
                beforeAll( () => {
                    generated = SudokuUtils.generateSudoku(difficulty.difficulty);
                });
                it('has a valid solution', () => {
                    expect(SudokuUtils.validate_sudoku(generated.solution).length).toBe(0);
                    expect(generated.solution.isFull());
                });
                it('is solvable', () => {
                    let solved = SudokuUtils.solve(generated.sudoku.copy());
                    expect(solved).toBe(true)
                });
                it('has numbers from solution in sudoku', () => {
                    for(let j = 0; j<81; ++j) {
                        if(generated.sudoku.get(j) !== 0) {
                            expect(generated.sudoku.get(j)).toBe(generated.solution.get(j));
                        }
                    }
                });
                it(`has ${difficulty.nbrOfGiven} given numbers`, () => {
                    let count = 0;
                    generated.sudoku.board.forEach(nbr => {
                        if(nbr !== 0) count++
                    });
                    expect(count).toBe(difficulty.nbrOfGiven)
                });
                it('is solvable', () => {
                    let sudoku = generated.sudoku.copy();
                    let solved = SudokuUtils.solve(sudoku);
                    expect(solved).toBe(true);
                    expect(sudoku.isFull()).toBe(true);
                })
                
        })
        }
    })
}
