import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "StoreContext"
import './number-buttons-styles.css'
import PropTypes from 'prop-types'

const NumberButtons = (props) => {
    if(!props.show)
        return <></>

    const { state, dispatch, actions } = useContext(StoreContext);

    const {
        writeCandidates
    } = state.board;

    const {
        toggleWriteCandidates,
        handleNumberClick
    } = actions;

    let buttons = [];
    for (let i = 0; i < 10; ++i) {
        buttons.push(
            <button key={i} className="number-button" onClick={() => handleNumberClick(i)}>
                {i !== 0
                    ? i
                    : 'C'
                }
            </button>
        )
    }
    buttons.push(
        <button key={'help'} className="number-button" onClick={toggleWriteCandidates}
            style={
                writeCandidates
                ? {border: '2px inset gray', background: 'lightgray'}
                : {border: '2px outset gray'}
            }
        >
            M
        </button>
    );


    if(state.board.isInitialized)
        return (
            <div className="number-container">
                {buttons}
            </div>
        )
    else
        return (
            <React.Fragment />
        )
};

export default NumberButtons;