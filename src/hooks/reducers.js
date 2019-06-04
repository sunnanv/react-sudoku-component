const initialState = {
    test: 1
};

const types = {
    INCREMENT_TEST: "INCREMENT_TEST",
    DECREMENT_TEST: "DECREMENT_TEST"
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.INCREMENT_TEST:
            return {
                ...state,
                test: state.test + action.payload
            };
        case types.DECREMENT_TEST:
            return {
                ...state,
                test: state.test - action.payload
            };
        default: throw new Error("Unexpected action");
    }
}

export { initialState, types, reducer };