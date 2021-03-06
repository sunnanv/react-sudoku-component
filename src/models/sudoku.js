
class Sudoku {
    board;
    immutable;

    /**
     * Constructs a sudoku with the optional initial values
     * 
     * @param {Array<{cell: number, number:number}>} initials 
     */
    constructor(initials = []) {
        this.board = new Array(81).fill(0);
        this.immutable = initials;
        initials.forEach(initial => {
            this.board[initial.cell] = initial.number;
        })
    }

    /**
     * @param {String} board
     */
    setBoard(board) {
        this.board = board;
    }

    /**
     * @param {number} i
     * @returns {number} the number at place i in sudoku
     */
    get(i) {
        if(i < 0 || i > 80)
            return 0;
        return this.board[i];
    }


    set(i,number) {
        if(i < 0 || i > 89) 
            return;
        if(number < 0 || number > 9)
            return;
        if(this.getImmutableCells().includes(i))
            return;
        this.board[i] = number;
    }

    getImmutableCells() {
        return this.immutable.map(initial => initial.cell);
    }

    isImmutableCell(cell) {
        return this.getImmutableCells().includes(cell)
    }

    addInitial(cell, number) {
        this.set(cell, number);
        this.immutable.push({cell: cell, number: number})
    }

    clear() {
        this.board = new Array(81).fill(0);
        this.immutable.forEach(initial => {
            this.board[initial.cell] = initial.number;
        })
    }

    copy() {
        let newSudoku = new Sudoku();
        newSudoku.immutable = this.immutable.slice();
        newSudoku.board = this.board.slice();
        return newSudoku;
    }

    isFull() {
        return !this.board.includes(0)
    }

    isEmpty() {
        return !this.board.some(cell => cell !== 0)
    }
}

export default Sudoku;