import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../hooks/StoreContext"
import './help-buttons-styles.css'
import PropTypes from 'prop-types'

const HelpButtons = (props) => {
    const { state, dispatch, actions } = useContext(StoreContext);

    const {
        size
    } = props;

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

    let slideDown = "help-button-container open";
    let normalClass = "help-button-container";

    if(state.board.isInitialized)
        return (
            <div className={"show-help-container"}>
            <button className="show-help-button" onClick={toggleShowHelp}>{showHelp? 'Hide Help':'Show Help'}</button>
            <div className={showHelp? slideDown:normalClass}
                style={showHelp? {visibility: 'visible', width: size } : {visibility: 'hidden', width: size}}>
                <HelpButton onClick={clearBoard}>Clear</HelpButton>
                <HelpButton onClick={solveSudoku}>Solve</HelpButton>
                <HelpButton onClick={() => validateSudoku()}>Validate</HelpButton>
                <HelpButton onClick={() => addHint()}>Hint</HelpButton>
                <HelpButton onClick={togglePlaceAllOfActive} isActive={placeAllOfActive}>Hint all of #</HelpButton>
                <HelpButton onClick={toggleOnTheGoValidation} isActive={onTheGoValidation}>Validate OnTheGo</HelpButton>
                <HelpButton onClick={toggleShowConnectedCells} isActive={showConnectedCells}>Show connected cells</HelpButton>
            </div>
            </div>
        )
    else
        return (
            <React.Fragment />
        )
};

const HelpButton = (props) => {
    const {
        onClick,
        isActive,
        children
    } = props;

    return (
        <button 
            className={"help-button"}
            onClick={onClick} 
            style={isActive? {background: 'red'} : null}>
                {children}
        </button>
    )
}

export default HelpButtons;