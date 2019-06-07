
class Sudoku {
    board;
    initials;

    /**
     * Constructs a sudoku with the optional initial values
     * 
     * @param {Array<{cell: number, number:number}>} initials 
     */
    constructor(initials = []) {
        this.board = new Array(81).fill(0);
        this.initials = initials;
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
        return this.initials.map(initial => initial.cell);
    }

    addInitial(cell, number) {
        this.set(cell, number);
        this.initials.push({cell: cell, number: number})
    }

    clear() {
        this.board = new Array(81).fill(0);
        this.initials.forEach(initial => {
            this.board[initial.cell] = initial.number;
        })
    }

    copy() {
        let newSudoku = new Sudoku();
        newSudoku.initials = this.initials.slice();
        newSudoku.board = this.board.slice();
        return newSudoku;
    }

    isFull() {
        return !this.board.includes(0)
    }
}

export default Sudoku;