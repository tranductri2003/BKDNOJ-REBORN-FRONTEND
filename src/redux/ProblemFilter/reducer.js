import {
  CLEAR_PROBLEM_TAGS,
  UPDATE_PROBLEM_TAGS,
} from "./types";

const INIT_STATE = {
  problemTags: null,
};

const reducer = (state = INIT_STATE, action) => {
  console.log("In reducer", action)
  switch (action.type) {
    case UPDATE_PROBLEM_TAGS: {
      const problemTags = [...action.problemTags]
      return {
        ...state,
        problemTags: problemTags,
      };
    }
    case CLEAR_PROBLEM_TAGS:
      return {
        ...state,
        problemTags: null,
      };

    default:
      return state;
  }
};

export default reducer;
