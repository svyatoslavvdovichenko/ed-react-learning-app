import { IUser } from '../../types'
import { AuthActionTypes } from '../types/auth'

export const loginUser = (payload: any) => {
  return {
    type: AuthActionTypes.USER_LOGIN,
    payload,
  }
}

export const setUser = (payload: { user: IUser }) => {
  //localStorage.setItem('authToken', );

  return {
    type: AuthActionTypes.SET_USER,
    payload,
  }
}

export const onLogout = () => {
  localStorage.removeItem('authToken')
  return { type: AuthActionTypes.LOGOUT_USER }
}
