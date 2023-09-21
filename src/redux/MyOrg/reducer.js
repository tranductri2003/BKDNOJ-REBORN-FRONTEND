import { UPDATE, UPDATE_SELECT, CLEAR } from './types';

const INITIAL_SELECTED_ORG = {
    name: "Global",
    short_name: "Global",
    slug: null,
};

const INITIAL_STATE = {
    memberOf: [],
    adminOf: [],
    selectedOrg: INITIAL_SELECTED_ORG,
};

const reducer = (state = INITIAL_STATE, action) => {
    // console.log(state)
    switch (action.type) {
        case UPDATE_SELECT:
            return {
                ...state,
                selectedOrg: action.selectedOrg,
            };
        case UPDATE:
            return {
                ...state,
                memberOf: action.memberOf,
                adminOf: action.adminOf,
                selectedOrg: action.selectedOrg || state.selectedOrg,
            };
        case CLEAR:
            return {
                ...state,
                ...INITIAL_STATE,
            };
        default:
            return state;
    }
};

export default reducer;
