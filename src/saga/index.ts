import { all } from 'redux-saga/effects'
import { userWatcher } from './referencesSaga'

export function* rootWatcher() {
  yield all([userWatcher()])
}
