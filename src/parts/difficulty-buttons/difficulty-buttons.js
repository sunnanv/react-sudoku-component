import React, { useContext } from "react";
import { StoreContext } from "../../hooks/StoreContext";
import './difficulty-buttons-styles.css';


const DifficultyButtons = (props) => {
    if(props.showDifficultyButtons === false)
        return <></>
    const { state, dispatch, actions } = useContext(StoreContext);

    const {
        difficulty
    } = state.board;

    const {
        generateSudoku
    } = actions;

    
    return (
        <React.Fragment>
            <div className="button-container">
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