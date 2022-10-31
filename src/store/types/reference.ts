import { ISpecialization, ITechnology } from '../../types'

export interface ReferencesState {
  technologies: ITechnology[]
  specializations: ISpecialization[]
  isLoadingTech: boolean
  isLoadingSpec: boolean
}

export enum ReferencesActionTypes {
  FETCH_REFERENCES = 'FETCH_REFERENCES',
  FETCH_REFERENCES_SUCCESS = 'FETCH_REFERENCES_SUCCESS',
}

export interface fetchReferencesAction {
  type: ReferencesActionTypes.FETCH_REFERENCES
}

export interface fetchReferencesSuccessAction {
  type: ReferencesActionTypes.FETCH_REFERENCES_SUCCESS
  payload: {
    technologies: ITechnology[]
    specializations: ISpecialization[]
  }
}

export type referencesAction =
  | fetchReferencesAction
  | fetchReferencesSuccessAction
