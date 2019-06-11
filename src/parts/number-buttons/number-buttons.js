import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "StoreContext"
import './number-buttons-styles.css'
import PropTypes from 'prop-types'

const NumberButtons = (props) => {
    const { state, dispatch, actions } = useContext(StoreContext);

    const {
        writeCandidates
    } = state.board_reducer;

    const {
        toggleWriteCandidates,
        handleNumberClick
    } = actions.board;

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

    return (
        <div className="number-container">
            {buttons}
        </div>
    )
};

export default NumberButtons;