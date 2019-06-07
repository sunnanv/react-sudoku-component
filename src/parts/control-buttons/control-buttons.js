import React from 'react';
//import { connect } from 'react-redux';
//import * as DISPATCHES from '../../redux/dispatches/dispatches';
import ControlButtonsView from './control-buttons-view';

class ControlButtons extends React.Component {

  /*  handleAddHint = () => {
        if (!this.props.board.getImmutableCells().includes(this.props.currentCell)){
            this.props.addHint(this.props.currentCell, this.props.solution)
        }
    }*/

    render() {
        return (
            <React.Fragment>
            {/*this.props.isInitialized > 0
            ?*/
            <ControlButtonsView
               /* onValidateSudoku={this.props.validateSudoku}
                onClearBoard={this.props.clearBoard}
                onSolveSudoku={this.props.solveSudoku}
                onAddHint={this.handleAddHint}
                showHelp={this.props.showHelp}
                toggleShowHelp={this.props.toggleShowHelp}
                onTheGoValidation={this.props.onTheGoValidation}
                toggleOnTheGoValidation={this.props.toggleOnTheGoValidation}
                showConnectedCells={this.props.showConnectedCells}
                toggleShowConnectedCells={this.props.toggleShowConnectedCells}
                placeAllOfActive={this.props.placeAllOfActive}
                togglePlaceAllOfActive={this.props.togglePlaceAllOfActive}
           */ />
            //: null
        }
            </React.Fragment>
        )
    }
}

/*
const mapStateToProps = (state) => ({
    currentCell: state.sudoku_reducer.board.currentCell,
    board: state.sudoku_reducer.board.board,
    isInitialized: state.sudoku_reducer.board.isInitialized,
    solution: state.sudoku_reducer.board.solution,
    showHelp: state.sudoku_reducer.board.showHelp,
    onTheGoValidation: state.sudoku_reducer.board.onTheGoValidation,
    showConnectedCells: state.sudoku_reducer.board.showConnectedCells,
    placeAllOfActive: state.sudoku_reducer.board.placeAllOfActive

})

const mapDispatchToProps = (dispatch) => ({
    clearBoard: () => dispatch(DISPATCHES.clearBoard()),
    addHint: (cell) => dispatch(DISPATCHES.addHint(cell)),
    toggleShowHelp: () => dispatch(DISPATCHES.toggleShowHelp()),
    toggleOnTheGoValidation: () => dispatch(DISPATCHES.toggleOnTheGoValidation()),
    toggleShowConnectedCells: () => dispatch(DISPATCHES.toggleShowConnectedCells()),
    togglePlaceAllOfActive: () => dispatch(DISPATCHES.togglePlaceAllOfActive()),
    validateSudoku: () => dispatch(DISPATCHES.validateSudoku()),
    solveSudoku: () => dispatch(DISPATCHES.solveSudoku())
})

export default connect(mapStateToProps, mapDispatchToProps)(ControlButtons)*/
export default ControlButtons;