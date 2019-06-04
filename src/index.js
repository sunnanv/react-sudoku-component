import React from 'react';
import './styles.css';

import { StoreProvider } from "./hooks/StoreContext";
import Test from './parts/test'

const Sudoku = () => (
    <StoreProvider>
        <Test/>
    </StoreProvider>
);

export default Sudoku