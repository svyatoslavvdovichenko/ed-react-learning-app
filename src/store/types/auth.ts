import { IUser } from '../../types'

export interface AuthState {
  isAuthenticated: boolean
  user?: IUser | null
}

export enum AuthActionTypes {
  USER_LOGIN = 'USER_LOGIN',
  SET_USER = 'SET_USER',
  LOGOUT_USER = 'LOGOUT_USER',
}

export interface fetchUserSuccessAction {
  type: AuthActionTypes.USER_LOGIN
  payload: {
    values: any
  }
}

export interface setUserSuccessAction {
  type: AuthActionTypes.SET_USER
  payload: {
    user: IUser
  }
}

export interface logOutAuthAction {
  type: AuthActionTypes.LOGOUT_USER
}

export type AuthAction =
  | fetchUserSuccessAction
  | logOutAuthAction
  | setUserSuccessAction
