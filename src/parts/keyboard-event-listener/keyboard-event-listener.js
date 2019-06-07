import React, { useContext, useState, useEffect } from "react";

import { StoreContext } from "../../hooks/StoreContext"


const KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    BACKSPACE: 8,
    M: 77,
    KEYBOARD_0: 48,
    KEYBOARD_9: 57,
    KEYPAD_0: 96,
    KEYPAD_9: 105
};

const KeyboardEventListener = (props) => {
    const { state, dispatch, actions } = useContext(StoreContext);

    if(props.active)
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return function cleanup() {
            window.removeEventListener('keydown', handleKeyDown);
        }
    })

    const handleKeyDown = (event) => {
        const keyCode = event.keyCode;
        if(Object.values(KEYS).includes(keyCode))
            event.preventDefault();

        if(keyIsNumeric(keyCode))
            handleNumericKey(parseInt(event.key));
        else if(keyIsDirectional(keyCode))
            handleDirectionalKey(keyCode);
        else if(keyIsBackspace(keyCode))
            handleBackspaceKey();
        else if(keyIsFunctional(keyCode))
            handleFunctionalKey();        
    }

    const keyIsNumeric = (keyCode) => 
    ((keyCode <= KEYS.KEYBOARD_9 && keyCode >= KEYS.KEYBOARD_0) 
    || (keyCode <= KEYS.KEYPAD_9 && keyCode >= KEYS.KEYPAD_0));

    const keyIsDirectional = (keyCode) =>
    (keyCode === KEYS.LEFT || keyCode === KEYS.RIGHT
    || keyCode === KEYS.UP || keyCode === KEYS.DOWN);

    const keyIsBackspace = (keyCode) => (keyCode === KEYS.BACKSPACE);

    const keyIsFunctional = (keyCode) => (keyCode === KEYS.M);

    const handleNumericKey = (number) => {
        console.log("numeric " + number)
        actions.board.setNumber(number, state.currentCell)
    }

    const directionValues = {
        37: -1,
        39: 1,
        38: -9,
        40: 9
    }
    const handleDirectionalKey = (directionKeyCode) => {
        console.log("directional");
        let newCell = state.board_reducer.currentCell + directionValues[directionKeyCode];
        console.log(newCell);

        if(newCell < 0)
            newCell += 81;

        actions.board.setCurrentCell(newCell % 81)
        
    };

    const handleBackspaceKey = () => {
        actions.board.setNumber(0, state.currentCell);
    };

    const handleFunctionalKey = () => {console.log("functional")};

    return(
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
}


export default KeyboardEventListener;