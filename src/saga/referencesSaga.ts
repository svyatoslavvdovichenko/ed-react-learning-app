import { put, takeEvery, call, StrictEffect } from 'redux-saga/effects'
import { setReferences } from '../store/actions/referenceActions'
import { ReferencesActionTypes } from '../store/types/reference'
import axios from 'axios'

const fetcher = (url: string) => {
  return axios
    .get(`https://api-challenger.fortech.dev/api/v1/technologies/`)
    .then((res) => res.data)
}

function* fetchUserWorker() {
  const { dataTech } = yield call(fetcher, 'v1/technologies/')

  yield put(
    setReferences({
      technologies: dataTech,
      specializations: [{ id: 1, title: 'string' }],
    }),
  )
}

export function* userWatcher(): Generator<StrictEffect> {
  yield takeEvery(ReferencesActionTypes.FETCH_REFERENCES, fetchUserWorker)
}
