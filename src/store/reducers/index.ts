import { referenceReducer } from './referenceReducer';
import { combineReducers } from "redux";
import { apiReducer } from './apiReducers';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  referenceReducer,
  apiReducer,
  authReducer,
})