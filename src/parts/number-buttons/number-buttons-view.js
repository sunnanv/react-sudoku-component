import React from 'react'
import './number-buttons-styles.css'
import PropTypes from 'prop-types'

const NumberButtonsView = (props) => {
    const {
        onNumberSelected,
        writeCandidates,
        toggleWriteCandidates
    } = props;

    let buttons = [];
    for (let i = 0; i < 10; ++i) {
        buttons.push(
            <button key={i} className="number-button" onClick={() => onNumberSelected(i)}>
                {i !== 0
                    ? i
                    : 'C'
                }
            </button>
        )
    }
    buttons.push(
        <button key={'help'} className="number-button" onClick={toggleWriteCandidates}
            style={
                writeCandidates
                ? {border: '2px inset gray', background: 'lightgray'}
                : {border: '2px outset gray'}
            }
        >
            M
        </button>
    )
    return (
        <div className="number-container">
            {buttons}
        </div>
    )
};

NumberButtonsView.propTypes = {
    onNumberSelected: PropTypes.func.isRequired,
    writeCandidates: PropTypes.bool.isRequired,
    toggleWriteCandidates: PropTypes.func.isRequired
};

export default NumberButtonsView;