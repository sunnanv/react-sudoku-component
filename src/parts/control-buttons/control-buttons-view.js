import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../hooks/StoreContext"
import './control-buttons-styles.css'
import PropTypes from 'prop-types'

const ControlButtonsView = (props) => {
    const {
        onValidateSudoku,
        onClearBoard,
        onSolveSudoku,
        onAddHint,
        toggleShowHelp,
        toggleOnTheGoValidation,
        toggleShowConnectedCells,
        togglePlaceAllOfActive,
        showHelp = true,
        onTheGoValidation,
        showConnectedCells,
        placeAllOfActive
    } = props;

    let slideDown = "controll-button-container open";
    let normalClass = "controll-button-container";

    return (
        <React.Fragment>
        <button onClick={toggleShowHelp}>{showHelp? 'Hide Help':'Show Help'}</button>
        <div className={showHelp? slideDown:normalClass}
            style={showHelp? {visibility: 'visible'} : {visibility: 'hidden'}}>
            <ControlButton onClick={onClearBoard}>Clear</ControlButton>
            <ControlButton onClick={onSolveSudoku}>Solve</ControlButton>
            <ControlButton onClick={onValidateSudoku}>Validate</ControlButton>
            <ControlButton onClick={onAddHint}>Hint</ControlButton>
            <ControlButton onClick={togglePlaceAllOfActive} isActive={placeAllOfActive}>Hint all of #</ControlButton>
            <ControlButton onClick={toggleOnTheGoValidation} isActive={onTheGoValidation}>Validate OnTheGo</ControlButton>
            <ControlButton onClick={toggleShowConnectedCells} isActive={showConnectedCells}>Show connected cells</ControlButton>
        </div>
        </React.Fragment>
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
/*
ControlButton.propTypes = {
    onClick: PropTypes.func,
    isActive: PropTypes.bool
}

ControlButtonsView.propTypes = {
    onValidateSudoku: PropTypes.func.isRequired,
    onClearBoard: PropTypes.func.isRequired,
    onSolveSudoku: PropTypes.func.isRequired,
    onAddHint: PropTypes.func.isRequired,
    toggleShowHelp: PropTypes.func.isRequired,
    toggleOnTheGoValidation: PropTypes.func.isRequired,
    toggleShowConnectedCells: PropTypes.func.isRequired,
    togglePlaceAllOfActive: PropTypes.func.isRequired,
    showHelp: PropTypes.bool.isRequired,
    onTheGoValidation: PropTypes.bool.isRequired,
    showConnectedCells: PropTypes.bool.isRequired,
    placeAllOfActive: PropTypes.bool.isRequired

};*/
export default ControlButtonsView;