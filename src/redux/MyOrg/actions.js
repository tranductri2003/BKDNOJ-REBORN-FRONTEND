import { UPDATE, UPDATE_SELECT, CLEAR } from './types';


export const updateMyOrg = ({ memberOf, adminOf, selectedOrg }) => {
    return {
        type: UPDATE,
        memberOf,
        adminOf,
        selectedOrg,
    };
};

export const updateSelectedOrg = ({ selectedOrg }) => {
    return {
        type: UPDATE_SELECT,
        selectedOrg,
    };
};

export const clearMyOrg = () => {
    return {
        type: CLEAR,
    };
};
