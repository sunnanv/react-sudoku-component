import React from 'react'
import DifficultyButtonsView from './difficulty-buttons-view';
//import * as DISPATCHES from '../../redux/dispatches/dispatches';

class DifficultyButtons extends React.Component {

    render() {
        return (
            <DifficultyButtonsView
  //              difficulty={this.props.difficulty}
  //              onDifficultyChanged={(difficulty) => this.props.generateSudoku(difficulty)}
            />
        )
    }
}

/*
const mapStateToProps = (state) => ({
    difficulty: state.sudoku_reducer.board.difficulty
})

const mapDispatchToProps = (dispatch) => ({
    generateSudoku: (difficulty) => dispatch(DISPATCHES.generateSudoku(difficulty))
})

export default connect (mapStateToProps,mapDispatchToProps)(DifficultyButtons)
*/
export default DifficultyButtons;