import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/auth/authSlice";
import subjectReducer from "./slice/subject/subjectSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  subject: subjectReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
