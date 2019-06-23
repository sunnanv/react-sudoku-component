import React from 'react';
import { render} from 'react-dom';
import Sudoku from '../../src';
const App = () => (
    <>
    <Sudoku/>
    </>
);
render(<App />, document.getElementById("root"));