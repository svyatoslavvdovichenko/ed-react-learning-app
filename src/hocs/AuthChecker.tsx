import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Loader } from '../components/common/Loader'
import { useActions } from '../hooks/useActions'
import { useApi } from '../hooks/useApi'
import { setAuthHeader } from './ApiProvider'

export type AuthCheckerState = {
  isLoading: boolean
}

export const AuthChecker: FC = ({ children }) => {
  const [state, setState] = useState<AuthCheckerState>({ isLoading: true })

  const navigate = useHistory()

  const { setUser } = useActions()

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
        navigate.push('/auth')
      })

  useEffect(() => {
    setAuthHeader(api, localStorage.authToken)

    getUserProfile()
  }, [])

  if (state.isLoading) {
    return <Loader fullScreen />
  }

  return <>{children}</>
}
