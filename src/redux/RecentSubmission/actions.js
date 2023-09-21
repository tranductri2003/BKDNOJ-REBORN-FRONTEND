import { START_POLLING, STOP_POLLING } from './types';

export const startPolling = () => {
    return {
        type: START_POLLING,
    };
};

export const stopPolling = () => {
    return {
        type: STOP_POLLING,
    };
};
