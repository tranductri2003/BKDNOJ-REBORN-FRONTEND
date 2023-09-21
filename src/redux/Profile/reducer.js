import { UPDATE, CLEAR } from './types';

const INITIAL_STATE = {
    profile: null,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE:
            return {
                ...state, 
                profile: action.profile,
            };
        case CLEAR:
            return {
                ...state, 
                profile: null,
            };
        default: 
            return state;
    }
};

export default reducer;