import React from 'react';
import './styles.css';
import Board from './parts/board/board';
import ControlButtons from './parts/control-buttons/control-buttons';
import DifficultyButtons from './parts/difficulty-buttons/difficulty-buttons';
import NumberButtons from './parts/number-buttons/number-buttons';
import Timer from './parts/timer/timer';
import KeyboardEventListener from './parts/keyboard-event-listener/keyboard-event-listener';

import { StoreProvider } from "./hooks/StoreContext";

const Sudoku = (props) => (
    <StoreProvider>
        <KeyboardEventListener active={props.keyboardActive}>
            <Timer />
            <DifficultyButtons />
            <Board />
            <NumberButtons />
            <ControlButtons />
        </KeyboardEventListener>
    </StoreProvider>
);

export default Sudoku