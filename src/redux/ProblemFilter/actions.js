import {
  UPDATE_PROBLEM_TAGS,
  CLEAR_PROBLEM_TAGS
} from "./types";

export const updateProblemTags = ({problemTags}) => {
  return {
    type: UPDATE_PROBLEM_TAGS,
    problemTags,
  };
};

export const clearProblemTags = () => {
  return {
    type: CLEAR_PROBLEM_TAGS,
  };
};