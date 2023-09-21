import { UPDATE, CLEAR } from './types';
import { __ls_remove_credentials } from 'helpers/localStorageHelpers';

const INITIAL_STATE = {
    user: null,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE:
            return {
                ...state, 
                user: action.user,
            };
        case CLEAR:
            __ls_remove_credentials();
            return {
                ...state, 
                user: null,
            };
        default: 
            return state;
    }
};

export default reducer;