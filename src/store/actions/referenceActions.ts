import { ITechnology, ISpecialization } from './../../types'
import { ReferencesActionTypes, ReferencesState } from './../types/reference'

export const fetchReferences = () => ({
  type: ReferencesActionTypes.FETCH_REFERENCES,
})
export const setReferences = (payload: {
  technologies: ITechnology[]
  specializations: ISpecialization[]
}) => ({ type: ReferencesActionTypes.FETCH_REFERENCES_SUCCESS, payload })
