import React from 'react';
import PropTypes from 'prop-types';
import './timer-styles.css';

const TimerView = (props) => {
    const {
        timeElapsed
    } = props;

    const formatTime = () => {
        let time = timeElapsed;
        let h = Math.floor(time/60/60);
        let m = Math.floor(time/60) - h*60;
        let s = time - h*60*60 - m*60;

        let hh = h < 10? `0${h}` : `${h}`;
        let mm = m < 10? `0${m}` : `${m}`;
        let ss = s < 10? `0${s}` : `${s}`;
        
        return `${hh}:${mm}:${ss}`
    };

    return (
        <h5>{formatTime()}</h5>
    )
};

/*
TimerView.propTypes = {
    timeElapsed: PropTypes.number.isRequired
}
*/
export default TimerView;