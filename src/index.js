import React from 'react';
import PropTypes from 'prop-types'
import './styles.css';

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
        allowCandidates,
        showNumberButtons,
        showHelpButtons,
        size,
        allowedHelps,
        onSolved,
    } = props;


    return (
        <StoreProvider style={{textAlign: 'center'}}>
            <KeyboardEventListener active={useKeyboardListener}>
                <Timer show={showTimer} />
                <DifficultyButtons show={showDifficultyButtons} defaultDifficulty={defaultDifficulty} size={size}/>
                <Board size={size} />
                <NumberButtons show={showNumberButtons} size={size} />
                <HelpButtons show={showHelpButtons} size={size} />
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
    onSolved: () => {},
    size: '70vmin'
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
    onSolved: PropTypes.func
}

export default Sudoku