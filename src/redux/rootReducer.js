import {combineReducers} from "redux";
import counterReducer from "./Counter/reducer.js";

import userReducer from "./User/reducer.js";
import profileReducer from "./Profile/reducer.js";
import contestReducer from "./Contest/reducer";

import standingFilterReducer from "./StandingFilter/reducer";
import subFilterReducer from "./SubFilter/reducer";
import problemFilterReducer from "./ProblemFilter/reducer";
import recentSubmissionReducer from "./RecentSubmission/reducer";

import ranksReducer from "./Rank/reducer";
import myOrgReducer from "./MyOrg/reducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  profile: profileReducer,
  contest: contestReducer,
  recentSubmission: recentSubmissionReducer,
  subFilter: subFilterReducer,
  problemFilter: problemFilterReducer,
  standingFilter: standingFilterReducer,
  ranks: ranksReducer,
  myOrg: myOrgReducer,
});

export default rootReducer;
