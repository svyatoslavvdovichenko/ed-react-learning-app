import { createContext } from 'react'

export interface AuthContextType {
  onLogin: (data: any) => void
}

export const AuthContext = createContext<AuthContextType>(undefined!)
