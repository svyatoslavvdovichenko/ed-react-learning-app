import { IUser } from './../types'
import { createContext } from 'react'

export interface AuthContextType {
  isAuthenticated: boolean
  user?: IUser
  onLogin: (data: any) => void
}

export const AuthContext = createContext<AuthContextType>(undefined!)
