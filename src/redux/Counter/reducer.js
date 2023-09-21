import { INCREMENT, DECREMENT, MULTIPLY } from './types';

const INITIAL_STATE = {
    count: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state, count: state.count + 1,
            };
        case DECREMENT:
            return {
                ...state, count: state.count - 1,
            };
        case MULTIPLY:
            return {
                ...state, count: state.count * action.payload.multiplier,
            };
        default: return state;
    }
};

export default reducer;