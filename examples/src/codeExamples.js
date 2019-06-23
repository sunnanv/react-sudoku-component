import React from 'react';
import Sudoku from '../../src';

export default {
    'Basic Example': {
        example: '',
        code: <Sudoku/>,
        info: `The most basic configuration for this component.`
    },

    'All props': {
        example: `useKeyboardListener={false}
        size={'70vmin'}
        defaultDifficulty={undefined}
        onSolved={() => {}}
        disableTimer={false}
        disableDifficultyButtons={false}
        disableNumberButtons={false}
        disableHelpButtons={false}
        allowedHelps={['solve', 'validate','hint','hintAllOf','validateOnTheGo']}
        disabledHelps={undefined}`,
        code: <Sudoku
                useKeyboardListener={false}
                size={'70vmin'}
                defaultDifficulty={undefined}
                onSolved={() => {}}
                disableTimer={false}
                disableDifficultyButtons={false}
                disableNumberButtons={false}
                disableHelpButtons={false}
                allowedHelps={['solve', 'validate','hint','hintAllOf','validateOnTheGo']}
                disabledHelps={undefined}
              />,
        info: 'All the available props and their default-values'
    },

    'useKeyboardListener': {
        example:`useKeyboardListener={false}`,
        code: <Sudoku
            useKeyboardListener={false}
        />,
        info: `With this proptype the Keyboard Listener can be turned on/off by setting useKeyboardListener to true/false respectively.`,
        values: ['true' , 'false'],
        default: 'true'
    },

    'size': {
        example:`size={'20vw'}`,
        code: <Sudoku
            size={'20vw'}
        />,
        info: `With this proptype the size of the sudoku can be changed. Accepts all css-compatible size units, ranging from 250px (min) to 100vmin (max)`,
        values: ['CSS-compatible size units as a string (default is \'70vmin\')']
    },
    'defaultDifficulty': {
        example: `defaultDifficulty={'hard'}`,
        code: <Sudoku
                defaultDifficulty={'hard'}
              />,
        info: `Sets the default difficulty, i. e. there is no need to press any of the difficulty-buttons to initialize the board.`,
        values: ['\'easy\'', '\'medium\'', '\'hard\'']
    },
    'onSolved': {
        example: `onSolved={(result) => console.log(result)}`,
        code: <Sudoku
                onSolved={(result) => console.log(result)}
              />,
        info: `Accepts a function that handles the result of a solved sudoku. Returns an object containin two values:
        
                time: amount of time (in seconds) for solving the sudoku
                helps: a Map containing information about how much help the user used (validation and hint)`
    },
    'disableTimer': {
        example: `disableTimer`,
        code: <Sudoku
                disableTimer
              />,
        info: `Disables the timer`,
        values: ['true', 'false'],
        default: 'false'
    },
    'disableDifficultyButtons': {
        example: `disableDifficultyButtons`,
        code: <Sudoku
            disableDifficultyButtons
        />,
        info: `Disables the difficulty buttons. If no 'defaultDifficulty' is specified it defaults to 'easy'.`,
        values: ['true', 'false'],
        default: 'false'
    },
    'disableNumberButtons': {
        example: `disableNumberButtons`,
        code: <Sudoku
            disableNumberButtons
        />,
        info: `Disables the number buttons`,
        values: ['true', 'false'],
        default: 'false'
    },
    'disableHelpButtons': {
        example: `disableHelpButtons`,
        code: <Sudoku
            disableHelpButtons
        />,
        info: `Disables the help buttons`,
        values: ['true', 'false'],
        default: 'false'
    },
    'allowedHelps': {
        example: `allowedHelps={['solve', 'hint']}`,
        code: <Sudoku
                allowedHelps={['solve', 'hint']}
              />,
        info: `Specifies which helps is allowed (enabled) for use. Works as the opposite of 'disabledHelps', and is overwritten if both are specified.`,
        allowedValuesDescription: 'Takes an array containing one or more of the following strings: ',
        values: ['solve', 'validate','hint','hintAllOf','validateOnTheGo']
    },
    'disabledHelps': {
        example: `disabledHelps={['solve', 'hint']}`,
        code: <Sudoku
                disabledHelps={['solve', 'hint']}
              />,
        info: `Specifies which helps is disabled for use. Works as the opposite of 'allowedHelps', and overwrites it if both are specified.`,
        allowedValuesDescription: 'Takes an array containing one or more of the following strings: ',
        values: ['solve', 'validate','hint','hintAllOf','validateOnTheGo']
    }


};