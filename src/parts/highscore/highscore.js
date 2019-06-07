import React from 'react'
//import {connect} from 'react-redux'

import HighscoreView from './highscore-view';
//import * as DISPATCHES from '../../redux/dispatches/dispatches';

class Highscore extends React.Component {
  /*  componentDidMount() {
        this.props.fetchHighscores('5ccf4075dcaf9834e4198274');
    }

    handleToggleShowHighscore = () => {
        this.props.toggleShowHighscore()
    }

    formattedHighscores = () => {
        let formatted = this.props.highscores.map(highscore => {
            let difficulty = '';
            if(highscore.difficulty === 'easy')
                difficulty = 'enkelt';
            else if(highscore.difficulty === 'medium')
                difficulty = 'mellan';
            else
                difficulty = 'svårt';
            
            let h = Math.floor(highscore.time/60/60);
            let m = Math.floor(highscore.time/60) - h*60;
            let s = highscore.time - h*60*60 - m*60;
    
            let hh = h > 0? h < 10? `0${h}:` : `${h}:` : '';
            let mm = m < 10? `0${m}:` : `${m}:`;
            let ss = s < 10? `0${s}` : `${s}`;
            
            let time = `${hh}${mm}${ss}`
            return {time, difficulty}
        })
        return formatted
    }*/

    render() {
        return (
            <HighscoreView 
         ///       onToggleShowHighscore={this.handleToggleShowHighscore}
          //   showHighscore={this.props.showHighscore}
           //     highscores={this.formattedHighscores()}
            />
        )
    }
}
/*
const mapStateToProps = (state) => ({
    showHighscore: state.sudoku_reducer.highscore.showHighscore,
    highscores: state.sudoku_reducer.highscore.highscores
})

const mapDispatchToProps = (dispatch) => ({
    toggleShowHighscore: () => dispatch(DISPATCHES.toggleShowHighscore()),
    fetchHighscores: (userId) => dispatch(DISPATCHES.fetchHighscores(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Highscore)*/

export default Highscore;