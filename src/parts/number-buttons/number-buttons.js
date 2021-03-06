import React, { useContext} from "react";
import { StoreContext } from "../../hooks/StoreContext"
import './number-buttons-styles.css'

const NumberButtons = (props) => {
    const {
        disable,
        size
    } = props;

    if(disable)
        return <></>;

    const { state, actions } = useContext(StoreContext);


    const {
        writeCandidates
    } = state.board;

    const {
        toggleWriteCandidates,
        handleNumberClick
    } = actions;

    let buttons = [];
    for (let i = 0; i < 10; ++i) {
        buttons.push(
            <button key={i} className="number-button" onClick={() => handleNumberClick(i)}>
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
    );


    if(state.board.isInitialized)
        return (
            <div className="number-container" style={{width: size, height: `calc(${size}/11)`}}>
                {buttons}
            </div>
        );
    else
        return (
            <React.Fragment />
        )
};

export default NumberButtons;