import { apiActionTypes } from '../types/api'

export const setAuthHeader = (payload: { token: string | undefined }) => ({
  type: apiActionTypes.SET_API,
  payload,
})
