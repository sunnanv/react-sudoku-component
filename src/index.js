import React from 'react';
import PropTypes from 'prop-types'
import './styles.css';
import Board from './parts/board/board';
import ControlButtons from './parts/control-buttons/control-buttons';
import DifficultyButtons from './parts/difficulty-buttons/difficulty-buttons';
import NumberButtons from './parts/number-buttons/number-buttons';
import Timer from './parts/timer/timer';
import KeyboardEventListener from './parts/keyboard-event-listener/keyboard-event-listener';

import { StoreProvider } from "./hooks/StoreContext";

const Sudoku = (props) => {
    const {
        useKeyboardListener,
        showTimer,
        showDifficultyButtons,
        useDifficulty,
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
                <Timer show={showTimer}/>
                <DifficultyButtons show={showDifficultyButtons} />
                <Board />
                <NumberButtons />
                <ControlButtons />
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
    onSolved: () => {}
}



Sudoku.propTypes = {
    useKeyboardListener: PropTypes.bool,
    showTimer: PropTypes.bool,
    showDifficultyButtons: PropTypes.bool,
    useDifficulty: PropTypes.oneOf(['easy', 'medium', 'hard']),
    allowCandidates: PropTypes.bool,
    showNumberButtons: PropTypes.bool,
    showHelpButtons: PropTypes.bool,
    size: PropTypes.string,
    allowedHelps: PropTypes.array,
    onSolved: PropTypes.func
}

export default Sudoku