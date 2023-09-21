import { UPDATE, CLEAR } from './types';


export const updateProfile = ({ profile }) => {
    return {
        type: UPDATE,
        profile,
    };
};

export const clearProfile = () => {
    return {
        type: CLEAR,
    };
};