import React from 'react';
import PropTypes from 'prop-types'

import {
    Board,
    HelpButtons,
    DifficultyButtons,
    NumberButtons,
    Timer,
    KeyboardEventListener
} from './parts';

import { StoreProvider } from "./hooks/StoreContext";

const Sudoku = (props) => {
    const {
        useKeyboardListener,
        disableTimer,
        disableDifficultyButtons,
        defaultDifficulty,
        disableNumberButtons,
        disableHelpButtons,
        size,
        allowedHelps,
        onSolved,
        disabledHelps
    } = props;

    return (
        <StoreProvider style={{textAlign: 'center'}} onSolved={onSolved}>
            <KeyboardEventListener active={useKeyboardListener} >
                <Timer disable={disableTimer} />
                <DifficultyButtons disable={disableDifficultyButtons} defaultDifficulty={defaultDifficulty} size={size}/>
                <Board size={size} />
                <NumberButtons disable={disableNumberButtons} size={size} />
                <HelpButtons disable={disableHelpButtons} size={size} allowedHelps={allowedHelps} disabledHelps={disabledHelps} />
            </KeyboardEventListener>
        </StoreProvider>
    )
            };

Sudoku.defaultProps = {
    useKeyboardListener: true,
    disableTimer: false,
    disableDifficultyButtons: false,
    disableNumberButtons: false,
    disableHelpButtons: false,
    onSolved: () => {},
    size: '70vmin',
    allowedHelps: ['solve', 'validate','hint','hintAllOf','validateOnTheGo'],
};


Sudoku.propTypes = {
    useKeyboardListener: PropTypes.bool,
    size: PropTypes.string,
    defaultDifficulty: PropTypes.oneOf(['easy', 'medium', 'hard']),
    onSolved: PropTypes.func,
    disableTimer: PropTypes.bool,
    disableDifficultyButtons: PropTypes.bool,
    disableNumberButtons: PropTypes.bool,
    disableHelpButtons: PropTypes.bool,
    allowedHelps: PropTypes.array,
    disabledHelps: PropTypes.array
};

export default Sudoku