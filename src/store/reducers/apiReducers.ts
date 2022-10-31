import { createApi } from '../../services'
import { apiState } from '../types/api'

const initialState: apiState = {
  apiInstance: createApi(),
}

export const apiReducer = (state = initialState): apiState => {
  state.apiInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response.status === 401) {
        localStorage.removeItem('authToken')
      }
      return Promise.reject(err)
    },
  )

  return state
}
