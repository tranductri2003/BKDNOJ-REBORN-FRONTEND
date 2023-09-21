import { UPDATE, CLEAR } from './types';

export const updateUser = ({ user }) => {
    return {
        type: UPDATE,
        user,
    };
};

export const clearUser = () => {
    return {
        type: CLEAR,
    };
};