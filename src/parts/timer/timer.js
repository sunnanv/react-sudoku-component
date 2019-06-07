import React from 'react';
/*import { connect } from 'react-redux';
import * as DISPATCHES from '../../redux/dispatches/dispatches';*/
import TimerView from './timer-view'


class Timer extends React.Component {
/*
    interval = -100;


    componentDidMount() {
//        this.props.startTimer();
        this.interval = setInterval(() => this.handleTimerTick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    handleTimerTick = () => {
        if (this.props.timerActive) {
            this.props.tickTimer()
        }
    };
*/
    render() {
        return (
            <TimerView
  //              timeElapsed={this.props.currentTime}
            />
        )
    }
}

/*const mapStateToProps = (state) => ({
    currentTime: state.sudoku_reducer.timer.currentTime,
    timerActive: state.sudoku_reducer.timer.timerActive
})

const mapDispatchToProps = (dispatch) => ({
    startTimer: () => dispatch(DISPATCHES.startTimer()),
    tickTimer: () => dispatch(DISPATCHES.tickTimer())
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer)*/
export default Timer;