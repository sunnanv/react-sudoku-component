import React from 'react';
import NumberButtonsView from './number-buttons-view';
/*import {connect} from 'react-redux';
import * as DISPATCHES from '../../redux/dispatches/dispatches';
*/
class NumberButtons extends React.Component {

  /*  placeAllOf = (numberToPlace) => {
        this.props.placeAllOf(numberToPlace)
    }

    handleNumberSelected = (number) => {
        if(this.props.placeAllOfActive) {
            this.placeAllOf(number);
        } else if (!this.props.board.getImmutableCells().includes(this.props.currentCell)) {
            if (!this.props.writeCandidates){
                this.props.setNumber(number, this.props.currentCell);
                if(this.props.board.isFull() || this.props.onTheGoValidation) {
                    this.handleValidateSudoku()
                }
            }
            else {
                this.props.toggleCandidate(number,this.props.currentCell);
            }
        }
    };

    handleValidateSudoku = () => {
        this.props.validateSudoku();
        if(this.props.board.isFull() && this.props.invalidCells.length === 0) {
            this.props.stopTimer();
        }
    };
*/
    render() {
        return (
            <React.Fragment>
            {//this.props.isInitialized > 0
          //  ?
            <NumberButtonsView
          //      onNumberSelected={(number) => this.handleNumberSelected(number)}
          //      writeCandidates={this.props.writeCandidates}
          //      toggleWriteCandidates={this.props.toggleWriteCandidates}
            />
          //  : null
        }
            </React.Fragment>
        )
    }
}
/*
const mapStateToProps = (state) => ({
    board: state.sudoku_reducer.board.board,
    writeCandidates: state.sudoku_reducer.board.writeCandidates,
    currentCell: state.sudoku_reducer.board.currentCell,
    onTheGoValidation: state.sudoku_reducer.board.onTheGoValidation,
    placeAllOfActive: state.sudoku_reducer.board.placeAllOfActive,
    isInitialized: state.sudoku_reducer.board.isInitialized
});

const mapDispatchToProps = (dispatch) => ({
    setNumber: (number, cell) => dispatch(DISPATCHES.setNumber(number, cell)),
    toggleCandidate: (number, cell) => dispatch(DISPATCHES.toggleCandidate(number, cell)),
    toggleWriteCandidates: () => dispatch(DISPATCHES.toggleWriteCandidates()),
    validateSudoku: () => dispatch(DISPATCHES.validateSudoku()),
    stopTimer: () => dispatch(DISPATCHES.stopTimer()),
    placeAllOf: (number) => dispatch(DISPATCHES.placeAllOf(number))
});

export default connect(mapStateToProps, mapDispatchToProps)(NumberButtons);*/
export default NumberButtons;