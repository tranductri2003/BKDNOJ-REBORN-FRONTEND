import { START_POLLING, STOP_POLLING } from './types';

const INITIAL_STATE = {
    polling: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case START_POLLING:
            return {
                ...state, polling: state.polling+1,
            };
        case STOP_POLLING:
            return {
                ...state, polling: 0,
            };
        default: return state;
    }
};

export default reducer;
