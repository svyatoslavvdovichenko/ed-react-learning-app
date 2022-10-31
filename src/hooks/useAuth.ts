import { useActions } from './useActions';
import { useContext } from 'react'
import { AuthContext } from '../contexts/auth'

export const useAuth = () => {
  const { onLogin } = useContext(AuthContext);
  const { onLogout } = useActions()

  return { onLogin, onLogout }
}
