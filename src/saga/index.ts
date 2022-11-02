import { all } from "redux-saga/effects";
import { referenceWatcher } from "./referenceSaga";

export function* rootWatcher() {
  yield all([referenceWatcher()])
}