import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../hooks/StoreContext"
import PropTypes from 'prop-types'
import './difficulty-buttons-styles.css'


const DifficultyButtonsView = (props) => {
    
    return (
        <React.Fragment>
            <div className="button-container">
                <DifficultyButton difficultyForButton={'easy'} {...props}/>
                <DifficultyButton difficultyForButton={'medium'} {...props} />
                <DifficultyButton difficultyForButton={'hard'} {...props} />
            </div>
        </React.Fragment>
    )
}

const DifficultyButton = (props) => {
    const {
        difficultyForButton,
        difficulty,
        onDifficultyChanged
    } = props;

    const activeStyle = 'difficulty-button difficulty-button-active';
    const normalStyle = 'difficulty-button';

    const swedishDifficultys = {
        'easy': 'Enkelt',
        'medium': 'Mellan',
        'hard': 'Svårt'
    }

    return (
        <button
            className={difficultyForButton === difficulty? activeStyle:normalStyle}
            onClick={() => onDifficultyChanged(difficultyForButton)}>
            {swedishDifficultys[difficultyForButton]}    
        </button>
    )
}
/*
DifficultyButtonsView.propTypes = {
    difficulty: PropTypes.oneOf(['easy', 'medium', 'hard']).isRequired,
    onDifficultyChanged: PropTypes.func.isRequired
}*/

export default DifficultyButtonsView;