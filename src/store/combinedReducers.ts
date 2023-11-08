import apiFailureReducer from "../commonApiLogic";
import projectListReducer from "../components/Dashboard/components";

import loginReducer from "../components/Login/logic";

export const combinedReducers = {
  ...loginReducer,
  ...apiFailureReducer,
  ...projectListReducer,
};
