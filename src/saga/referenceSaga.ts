import { ITechnology, ISpecialization } from './../types';
import { ReferencesActionTypes } from './../store/types/reference';
import { put, takeEvery, call, select } from "redux-saga/effects";
import { AxiosInstance } from 'axios';
import { setReferences } from '../store/actions/referenceActions';

const fetchReferenceFromApi = (api: AxiosInstance, url: string) =>  api.get(url).then(response => response.data);

function* fetchToDosWorker() {
  const api: AxiosInstance = yield select(state => state.apiReducer.apiInstance); 
  const technologies: ITechnology[] = yield call(fetchReferenceFromApi, api, 'v1/technologies/');
  const specializations: ISpecialization[] = yield call(fetchReferenceFromApi, api, 'v1/specializations/');
  
  yield put(setReferences({
    technologies,
    specializations
  }));
}

export function* referenceWatcher() {
  yield takeEvery(ReferencesActionTypes.FETCH_REFERENCES, fetchToDosWorker)
}