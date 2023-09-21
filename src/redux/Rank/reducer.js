import { UPDATE } from './types';

const INITIAL_STATE = {
    ranks: [
        {
            "rank": "Newbie",
            "rating_floor": 0,
            "rank_class": "rate-newbie"
        },
        {
            "rank": "Pupil",
            "rating_floor": 1200,
            "rank_class": "rate-pupil"
        },
        {
            "rank": "Specialist",
            "rating_floor": 1400,
            "rank_class": "rate-specialist"
        },
        {
            "rank": "Expert",
            "rating_floor": 1600,
            "rank_class": "rate-expert"
        },
        {
            "rank": "Candidate Master",
            "rating_floor": 1900,
            "rank_class": "rate-candidate-master"
        },
        {
            "rank": "Master",
            "rating_floor": 2200,
            "rank_class": "rate-master"
        },
        {
            "rank": "International Master",
            "rating_floor": 2300,
            "rank_class": "rate-international-master"
        },
        {
            "rank": "Grandmaster",
            "rating_floor": 2400,
            "rank_class": "rate-grandmaster"
        },
        {
            "rank": "International Grandmaster",
            "rating_floor": 2600,
            "rank_class": "rate-international-grandmaster"
        },
        {
            "rank": "Legendary Grandmaster",
            "rating_floor": 2900,
            "rank_class": "rate-legendary-grandmaster"
        }
    ],
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE:
            return {
                ...state,
                ranks: action.ranks,
            };
        default:
            return state;
    }
};

export default reducer;
