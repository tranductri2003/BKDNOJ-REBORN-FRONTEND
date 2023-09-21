import { UPDATE, CLEAR } from './types';


export const updateContest = ({ contest }) => {
    return {
        type: UPDATE,
        virtual: (contest && contest.virtual) || null,
        ...contest,
    };
};

export const clearContest = () => {
    return {
        type: CLEAR,
    };
};
