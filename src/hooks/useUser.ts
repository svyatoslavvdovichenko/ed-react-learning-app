import { useTypedSelector } from './useTypeSelector';
import { useContext } from 'react'
import { AuthContext } from '../contexts/auth'

export const useUser = () => {
  const { user } = useTypedSelector(state => state.authReducer)

  return { user }
}
