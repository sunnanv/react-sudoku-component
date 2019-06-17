import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../hooks/StoreContext"
import './control-buttons-styles.css'
import PropTypes from 'prop-types'

const ControlButtons = (props) => {
    const { state, dispatch, actions } = useContext(StoreContext);

    const {
        showHelp,
        onTheGoValidation,
        showConnectedCells,
        placeAllOfActive
    } = state.help;

    const {
        validateSudoku,//
        clearBoard,//
        solveSudoku,
        addHint,
        toggleShowHelp,
        toggleOnTheGoValidation,
        toggleShowConnectedCells,
        togglePlaceAllOfActive
    } = actions;

    let slideDown = "controll-button-container open";
    let normalClass = "controll-button-container";

    if(state.board.isInitialized)
        return (
            <div className={"show-help-container"}>
            <button className="show-help-button" onClick={toggleShowHelp}>{showHelp? 'Hide Help':'Show Help'}</button>
            <div className={showHelp? slideDown:normalClass}
                style={showHelp? {visibility: 'visible'} : {visibility: 'hidden'}}>
                <ControlButton onClick={clearBoard}>Clear</ControlButton>
                <ControlButton onClick={solveSudoku}>Solve</ControlButton>
                <ControlButton onClick={() => validateSudoku()}>Validate</ControlButton>
                <ControlButton onClick={() => addHint()}>Hint</ControlButton>
                <ControlButton onClick={togglePlaceAllOfActive} isActive={placeAllOfActive}>Hint all of #</ControlButton>
                <ControlButton onClick={toggleOnTheGoValidation} isActive={onTheGoValidation}>Validate OnTheGo</ControlButton>
                <ControlButton onClick={toggleShowConnectedCells} isActive={showConnectedCells}>Show connected cells</ControlButton>
            </div>
            </div>
        )
    else
        return (
            <React.Fragment />
        )
};

const ControlButton = (props) => {
    const {
        onClick,
        isActive,
        children
    } = props;

    return (
        <button 
            className={"controll-button"} 
            onClick={onClick} 
            style={isActive? {background: 'red'} : null}>
                {children}
        </button>
    )
}

export default ControlButtons;