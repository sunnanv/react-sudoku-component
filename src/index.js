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
        showTimer,
        showDifficultyButtons,
        defaultDifficulty,
        showNumberButtons,
        showHelpButtons,
        size,
        allowedHelps,
        onSolved,
        disabledHelps
    } = props;

    return (
        <StoreProvider style={{textAlign: 'center'}} onSolved={onSolved}>
            <KeyboardEventListener active={useKeyboardListener} >
                <Timer show={showTimer} />
                <DifficultyButtons show={showDifficultyButtons} defaultDifficulty={defaultDifficulty} size={size}/>
                <Board size={size} />
                <NumberButtons show={showNumberButtons} size={size} />
                <HelpButtons show={showHelpButtons} size={size} allowedHelps={allowedHelps} disabledHelps={disabledHelps} />
            </KeyboardEventListener>
        </StoreProvider>
    )
            };

Sudoku.defaultProps = {
    useKeyboardListener: true,
    showTimer: true,
    showDifficultyButtons: true,
    allowCandidates: true,
    showNumberButtons: true,
    showHelpButtons: true,
    onSolved: (test) => {console.log("TESTAR", test)},
    size: '70vmin',
    allowedHelps: ['solve', 'validate','hint','hintAllOf','validateOnTheGo'],
};


Sudoku.propTypes = {
    useKeyboardListener: PropTypes.bool,
    showTimer: PropTypes.bool,
    showDifficultyButtons: PropTypes.bool,
    defaultDifficulty: PropTypes.oneOf(['easy', 'medium', 'hard']),
    allowCandidates: PropTypes.bool,
    showNumberButtons: PropTypes.bool,
    showHelpButtons: PropTypes.bool,
    size: PropTypes.string,
    allowedHelps: PropTypes.array,
    onSolved: PropTypes.func,
    disabledHelps: PropTypes.array
}

export default Sudoku