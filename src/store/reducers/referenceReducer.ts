import {
  ReferencesState,
  referencesAction,
  ReferencesActionTypes,
} from '../types/reference'

const initialState: ReferencesState = {
  technologies: [],
  specializations: [],
}

export const referenceReducer = (
  state = initialState,
  action: referencesAction,
): ReferencesState => {
  switch (action.type) {
    case ReferencesActionTypes.FETCH_REFERENCES:
      return { ...state }
      
    case ReferencesActionTypes.FETCH_REFERENCES_SUCCESS:
      return {
        ...state,
        technologies: action.payload.technologies,
        specializations: action.payload.specializations,
      }

    default:
      return state
  }
}
