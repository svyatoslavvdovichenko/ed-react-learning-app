import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../components/common/Loader'
import { useActions } from '../hooks/useActions'
import { useApi } from '../hooks/useApi'

export type AuthCheckerState = {
  isLoading: boolean
}

interface IAuthChecker {
  children: React.ReactNode;
}

export const AuthChecker: React.FC<IAuthChecker> = ({ children }) => {
  const [state, setState] = useState<AuthCheckerState>({ isLoading: true })

  const navigate = useNavigate()

  const { setUser, setAuthHeader } = useActions()

  const api = useApi()

  const getUserProfile = (): Promise<void> =>
    api
      .get('user/profile/')
      .then(({ data }) => {
        setState(() => ({
          isLoading: false,
        }))
        setUser({ user: data })
      })
      .catch(() => {
        setState(() => ({ isLoading: false }))
        navigate('/auth');
      })

  useEffect(() => {
    setAuthHeader({ token: localStorage.authToken })
    
    getUserProfile()
  }, [])

  if (state.isLoading) {
    return <Loader fullScreen />
  }

  return <>{children}</>
}
