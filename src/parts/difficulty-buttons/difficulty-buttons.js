import React, { useContext } from "react";
import { StoreContext } from "../../hooks/StoreContext";
import './difficulty-buttons-styles.css';


const DifficultyButtons = (props) => {
    const { state, dispatch, actions } = useContext(StoreContext);

    const {
        show,
        defaultDifficulty,
        size
    } = props;

    

    const {
        difficulty,
        board
    } = state.board;

    const {
        generateSudoku
    } = actions;
    
    if(defaultDifficulty) {
        if(board.isEmpty() ) generateSudoku(defaultDifficulty);
    } 

    if(!show) {
        if(board.isEmpty() ) generateSudoku('easy');
        return <></>
    }
    return (
        <React.Fragment>
            <div className="button-container" style={{width: size}}>
                <DifficultyButton difficultyForButton={'easy'} onClick={generateSudoku} difficulty={difficulty} />
                <DifficultyButton difficultyForButton={'medium'} onClick={generateSudoku} difficulty={difficulty} />
                <DifficultyButton difficultyForButton={'hard'} onClick={generateSudoku} difficulty={difficulty} />
            </div>
        </React.Fragment>
    )
}

const DifficultyButton = (props) => {
    const {
        difficultyForButton,
        difficulty,
        onClick
    } = props;

    const activeStyle = 'difficulty-button difficulty-button-active';
    const normalStyle = 'difficulty-button';

    return (
        <button
            className={difficultyForButton === difficulty? activeStyle:normalStyle}
            onClick={() => onClick(difficultyForButton)}>
            {difficultyForButton}
        </button>
    )
};

export default DifficultyButtons;