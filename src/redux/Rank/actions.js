import { UPDATE } from './types';

export const updateRanks = ({ ranks }) => {
    return {
        type: UPDATE,
        ranks,
    };
};
