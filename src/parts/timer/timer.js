import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../hooks/StoreContext"
import PropTypes from 'prop-types';
import './timer-styles.css';

const Timer = (props) => {
    if(!props.show)
        return <></>
    const { state, dispatch, actions } = useContext(StoreContext);

    let interv = -100
    useEffect(() => {
        interv = setInterval(tickTimer, 1000);

        return function cleanup() {
            clearInterval(interv)
        }
    });

    const tickTimer = () => {
        if(state.timer.timerActive)
            actions.tickTimer();
    };

    const {
        timeElapsed
    } = state.timer;

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
        <h5 className="timer-container">{formatTime()}</h5>
    )
};

/*
TimerView.propTypes = {
    timeElapsed: PropTypes.number.isRequired
}
*/
export default Timer;