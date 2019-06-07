import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../hooks/StoreContext";

const Test = () => {
    const { state, dispatch, actions } = useContext(StoreContext);
    return (
        <div>
            <h1>Test variable: {state.test_reducer.test}</h1> <br/>
            <h1>Test variable: {state.test2_reducer.test2}</h1>

            <button onClick={() => actions.testActions.incrementTest()}>Increment</button>
            <button onClick={() => actions.testActions.decrementTest()}>Decrement</button><br/>
            <button onClick={() => actions.testActions.incrementTest(5)}>Increment by 5</button>
            <button onClick={() => actions.testActions.decrementTest(5)}>Decrement by 5</button><br/><br/>
            
            <button onClick={() => actions.test2Actions.incrementTest()}>Increment</button>
            <button onClick={() => actions.test2Actions.decrementTest()}>Decrement</button><br/>
            <button onClick={() => actions.test2Actions.incrementTest(5)}>Increment by 5</button>
            <button onClick={() => actions.test2Actions.decrementTest(5)}>Decrement by 5</button><br/><br/>

            <button onClick={() => console.log(state)}>Print state </button>
        </div>
    )

};

export default Test;