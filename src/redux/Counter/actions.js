import { INCREMENT, DECREMENT, MULTIPLY } from './types';

export const increaseCounter = () => {
    return {
        type: INCREMENT,
    };
};

export const decreaseCounter = () => {
    return {
        type: DECREMENT,
    };
};

export const multiplyCounter = (payload) => {
    return {
        type: MULTIPLY,
        payload,
    };
};