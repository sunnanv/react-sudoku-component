import React, { useContext, useEffect } from "react";

import { StoreContext } from "../../hooks/StoreContext"

const DIRECTIONAL_KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
};

const DELETING_KEYS = {
    BACKSPACE: 8,
    DEL: 46,
    KEYBOARD_0: 48,
    KEYPAD_0: 96,
};

const NUMERIC_KEYS = {
    KEYBOARD_1:49,
    KEYBOARD_2:50,
    KEYBOARD_3:51,
    KEYBOARD_4:52,
    KEYBOARD_5:53,
    KEYBOARD_6:54,
    KEYBOARD_7:55,
    KEYBOARD_8:56,
    KEYBOARD_9: 57,
    KEYPAD_1: 97,
    KEYPAD_2: 98,
    KEYPAD_3: 99,
    KEYPAD_4: 100,
    KEYPAD_5: 101,
    KEYPAD_6: 102,
    KEYPAD_7: 103,
    KEYPAD_8: 104,
    KEYPAD_9: 105
};

const FUNCTIONAL_KEYS = {
    M: 77,
};

const KeyboardEventListener = (props) => {
    const { state, actions } = useContext(StoreContext);

    if(props.active) {
        useEffect(() => {
            window.addEventListener('keydown', handleKeyDown);

            return function cleanup() {
                window.removeEventListener('keydown', handleKeyDown);
            }
        });
    }

    const handleKeyDown = (event) => {
        const keyCode = event.keyCode;
        if(keyExists(keyCode)){
            event.preventDefault();

        if(keyIsNumeric(keyCode))
            handleNumericKey(parseInt(event.key));
        else if(keyIsDirectional(keyCode))
            handleDirectionalKey(keyCode);
        else if(keyIsDeleting(keyCode))
            handleDeletingKey();
        else if(keyIsFunctional(keyCode))
            handleFunctionalKey(keyCode);
        }
    };

    const keyExists = (keyCode) => keyIsNumeric(keyCode) || keyIsDirectional(keyCode) || keyIsDeleting(keyCode) || keyIsFunctional(keyCode);

    const keyIsNumeric = (keyCode) => Object.values(NUMERIC_KEYS).includes(keyCode);

    const keyIsDirectional = (keyCode) => Object.values(DIRECTIONAL_KEYS).includes(keyCode);

    const keyIsDeleting = (keyCode) => Object.values(DELETING_KEYS).includes(keyCode);

    const keyIsFunctional = (keyCode) => Object.values(FUNCTIONAL_KEYS).includes(keyCode);


    const handleNumericKey = (number) => actions.handleNumberClick(number);

    const directionValues = {
        37: -1,
        39: 1,
        38: -9,
        40: 9
    };

    const handleDirectionalKey = (directionKeyCode) => {
        let newCell = state.board.currentCell + directionValues[directionKeyCode];

        if(newCell < 0)
            newCell += 81;

        actions.setCurrentCell(newCell % 81)
        
    };

    const handleDeletingKey = () => actions.removeNumberFromCell(state.currentCell);

    const handleFunctionalKey = (keyCode) => {
        switch (keyCode) {
            case FUNCTIONAL_KEYS.M:
                actions.toggleWriteCandidates();
                break;
        }
    };

    return(
        <React.Fragment>
            {props.children}
        </React.Fragment>
    )
};


export default KeyboardEventListener;