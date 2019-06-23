import React from 'react';
import { render} from 'react-dom';
import Sudoku from '../../src';
const handleSolved = (solvedData) => console.log("I am solved in testing: ",solvedData);

const App = () => (
    <>
    <Sudoku defaultDifficulty={'easy'} onSolved={handleSolved} />
    </>
);
render(<App />, document.getElementById("root"));