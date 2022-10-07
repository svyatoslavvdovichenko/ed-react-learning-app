import { useContext } from 'react'
import { AuthContext } from '../contexts/auth'

export const useAuth = () => {
  const { onLogout, onLogin } = useContext(AuthContext)

  return { onLogout, onLogin }
}
