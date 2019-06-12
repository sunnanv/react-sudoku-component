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
    } = state.board_reducer;

    const {
        validateSudoku,//
        clearBoard,//
        solveSudoku,
        addHint,
        toggleShowHelp,
        toggleOnTheGoValidation,
        toggleShowConnectedCells,
        togglePlaceAllOfActive
    } = actions.board;

    let slideDown = "controll-button-container open";
    let normalClass = "controll-button-container";

    if(state.board_reducer.isInitialized)
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
export default ControlButtons;