import React, { useContext} from "react";
import { StoreContext } from "../../hooks/StoreContext"
import './help-buttons-styles.css'

const HelpButtons = (props) => {
    const { state, actions } = useContext(StoreContext);

    const {
        size,
        show,
        allowedHelps,
        disabledHelps
    } = props;

    const {
        showHelp,
        onTheGoValidation,
        showConnectedCells,
        placeAllOfActive
    } = state.help;

    const {
        validateSudoku,
        clearBoard,
        solveSudoku,
        addHint,
        toggleShowHelp,
        toggleOnTheGoValidation,
        toggleShowConnectedCells,
        togglePlaceAllOfActive
    } = actions;

    const helpButtons = [
        {key: 'solve',              button: <HelpButton key={'solve'} onClick={solveSudoku}>Solve</HelpButton>},
        {key: 'validate',           button: <HelpButton key={'validate'} onClick={() => validateSudoku()}>Validate</HelpButton>},
        {key: 'hint',               button: <HelpButton key={'hint'} onClick={() => addHint()}>Hint</HelpButton>},
        {key: 'hintAllOf',          button: <HelpButton key={'hintAllOf'} onClick={togglePlaceAllOfActive} isActive={placeAllOfActive}>Hint all of #</HelpButton>},
        {key: 'validateOnTheGo',    button: <HelpButton key={'validateOnTheGo'} onClick={toggleOnTheGoValidation} isActive={onTheGoValidation}>Validate OnTheGo</HelpButton>},
    ];

    let slideDown = "help-button-container open";
    let normalClass = "help-button-container";

    if(state.board.isInitialized)
        return (
            <div className={"show-help-container"}>

                <HelpButton onClick={clearBoard}>Clear</HelpButton>
                <HelpButton onClick={toggleShowConnectedCells} isActive={showConnectedCells}>Show connected cells</HelpButton>
                <br/>
                {show
                    ? <>
                        <button className="show-help-button" onClick={toggleShowHelp}>{showHelp? 'Hide Help':'Show Help'}</button>
                            <div className={showHelp? slideDown:normalClass}
                                style={showHelp? {visibility: 'visible', width: size } : {visibility: 'hidden', width: size}}>

                                {helpButtons.map(helpButton =>
                                    disabledHelps
                                        ? disabledHelps.includes(helpButton.key)
                                            ? null
                                            : helpButton.button
                                        : allowedHelps.includes(helpButton.key)
                                            ? helpButton.button
                                            : null
                                )}

                            </div>
                    </>
                    : null }

            </div>
        );
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
};

export default HelpButtons;