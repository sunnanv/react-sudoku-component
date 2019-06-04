import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../hooks/StoreContext";

const Test = () => {
    const { state, dispatch, actions } = useContext(StoreContext);
    return (
        <div>
            <h1>Test variable: {state.test}</h1>

            <button onClick={() => actions.incrementTest()}>Increment</button>
            <button onClick={() => actions.decrementTest()}>Decrement</button><br/>
            <button onClick={() => actions.incrementTest(5)}>Increment by 5</button>
            <button onClick={() => actions.decrementTest(5)}>Decrement by 5</button>
        </div>
    )

};

export default Test;