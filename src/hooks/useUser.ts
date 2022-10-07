import { useContext } from 'react'
import { AuthContext } from '../contexts/auth'

export const useUser = () => {
  const { user } = useContext(AuthContext)

  return { user }
}
