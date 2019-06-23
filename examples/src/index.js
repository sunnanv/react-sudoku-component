import React from 'react';
import { render} from 'react-dom';
import Sudoku from '../../src';
const handleSolved = (solvedData) => console.log("I am solved in testing: ",solvedData);
const disabledHelps = ['solve', 'hintAllOf'];
const allowedHelps = ['solve', 'hint'];
const App = () => (
    <>
    <Sudoku/>
    </>
);
render(<App />, document.getElementById("root"));