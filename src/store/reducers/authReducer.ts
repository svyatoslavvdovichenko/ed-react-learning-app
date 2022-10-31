import { AuthState, AuthAction, AuthActionTypes } from "../types/auth"

const initialState: AuthState = {
  isAuthenticated: false,
  user: undefined,
}

export const authReducer = (
  state = initialState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.USER_LOGIN:
      return { ...state }

    case AuthActionTypes.SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      }
    case AuthActionTypes.LOGOUT_USER: 
      return {
        ...state,
        isAuthenticated: false,
        user: undefined
      }

    default:
      return state
  }
}
