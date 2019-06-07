import React from "react";
import BoardView from './board-view'
//import * as DISPATCHES from '../../redux/dispatches/dispatches';
import * as SudokuUtils from '../../utils/sudoku_utils';


const KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    BACKSPACE: 8,
    M: 77,
    KEYBOARD_0: 48,
    KEYBOARD_9: 57,
    KEYPAD_0: 96,
    KEYPAD_9: 105
};

class Board extends React.Component {
    
   /* componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (evt) => {
        let charCode =  evt.keyCode;
        let newCell;
        switch (charCode) {
            case KEYS.M:
                this.props.toggleWriteCandidates()
                break;
            case KEYS.LEFT:
                evt.preventDefault();
                newCell = this.props.currentCell - 1;
                break;
            case KEYS.UP:
                evt.preventDefault();
                newCell = this.props.currentCell - 9;
                break;
            case KEYS.RIGHT:
                evt.preventDefault();
                newCell = this.props.currentCell + 1;
                break;
            case KEYS.DOWN:
                evt.preventDefault();
                newCell = this.props.currentCell + 9;
                break;
            case KEYS.BACKSPACE:
                this.props.setNumber(0, this.props.currentCell);
                break;
            default: {
                if (((charCode <= KEYS.KEYBOARD_9 && charCode >= KEYS.KEYBOARD_0) || (charCode <= KEYS.KEYPAD_9 && charCode >= KEYS.KEYPAD_0))) {
                    if(this.props.placeAllOfActive) {
                        this.placeAllOf(parseInt(evt.key));
                    } else if (!this.props.board.getImmutableCells().includes(this.props.currentCell)) {
                        if (!this.props.writeCandidates) {
                            this.props.setNumber(parseInt(evt.key), this.props.currentCell);
                            
                            if (this.props.board.isFull() || this.props.onTheGoValidation) {
                                this.handleValidateSudoku();
                            }
                        } else {
                            this.props.toggleCandidate(this.props.currentCell, parseInt(evt.key))
                        }
                    }
                }
            }
        }

        if (newCell === 0 || newCell) {
            if (newCell < 0) {
                newCell += 81
            }
            this.props.setCurrentCell(newCell % 81);

        }

    };*/

  /*  placeAllOf = (numberToPlace) => {
        this.props.placeAllOf(numberToPlace)
    }

    handleValidateSudoku = () => {
        this.props.validateSudoku();
        if(this.props.board.isFull() && this.props.invalidCells.length === 0) {
            this.props.stopTimer();
        }
    };*/

    render() {
        return (
            <div>
            {/*this.props.isInitialized > 0
                ?*/<BoardView 
                   /* board={this.state.board_reducer.board}
                    currentCell={this.state.board_reducer.currentCell}
                    /*invalidCells={this.props.invalidCells}
                    connectedCells={this.props.showConnectedCells? SudokuUtils.getConnectedCells(this.props.currentCell):[]}
                    candidates={this.props.candidates}
                    onCellClicked={(cell) => this.props.setCurrentCell(cell)}
                    solveAnimate={this.props.solveAnimate}  */
                />
            /*:null*/}
            </div>
        )
    }
}

/*const mapStateToProps = (state) => ({
    board: state.sudoku_reducer.board.board,
    isInitialized: state.sudoku_reducer.board.isInitialized,
    currentCell: state.sudoku_reducer.board.currentCell,
    candidates: state.sudoku_reducer.board.candidates,
    writeCandidates: state.sudoku_reducer.board.writeCandidates,
    invalidCells: state.sudoku_reducer.board.invalidCells,
    onTheGoValidation: state.sudoku_reducer.board.onTheGoValidation,
    showConnectedCells: state.sudoku_reducer.board.showConnectedCells,
    placeAllOfActive: state.sudoku_reducer.board.placeAllOfActive,
    
    solveAnimate: state.sudoku_reducer.animate.solveAnimate
})

const mapDispatchToProps = (dispatch) => ({
    generateSudoku: (difficulty) => dispatch(DISPATCHES.generateSudoku(difficulty)),
    setCurrentCell: (currentCell) => dispatch(DISPATCHES.setCurrentCell(currentCell)),
    toggleWriteCandidates: () => dispatch(DISPATCHES.toggleWriteCandidates()),
    setNumber: (number, cell) => dispatch(DISPATCHES.setNumber(number, cell)),
    toggleCandidate: (number, cell) => dispatch(DISPATCHES.toggleCandidate(cell, number)),
    placeAllOf: (number) => dispatch(DISPATCHES.placeAllOf(number)),
    validateSudoku: () => dispatch(DISPATCHES.validateSudoku()),
    stopTimer: () => dispatch(DISPATCHES.stopTimer())
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)*/
export default Board;