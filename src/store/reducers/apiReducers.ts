import { createApi } from '../../services'
import { apiState, apiActions, apiActionTypes } from '../types/api'

const initialState: apiState = {
  apiInstance: createApi(),
}

export const apiReducer = (state = initialState, action: apiActions): apiState => {
  switch (action.type) {
    case apiActionTypes.SET_API: {
      let apiInstanceWithNewHeader = state.apiInstance;
      console.log(action.payload);
      
      if (action.payload.token) {
        apiInstanceWithNewHeader.defaults.headers.common['Authorization'] = `Bearer ${action.payload.token}`
      } else {
        delete apiInstanceWithNewHeader.defaults.headers.common['Authorization']
        localStorage.removeItem('authToken')
      }
      return ({ ...state, apiInstance: apiInstanceWithNewHeader })
    }
    default:
      return state;
  }
}
