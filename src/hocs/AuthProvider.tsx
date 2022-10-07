import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Loader } from '../components/common/Loader'
import { AuthContext } from '../contexts/auth'
import { useApi } from '../hooks/useApi'
import { IUser } from '../types'
import { sendErrorNotification } from '../utils/systemNotification'
import { setAuthHeader } from './ApiProvider'

export type AuthProviderState = {
  isLoading: boolean
  user?: IUser
}

export const AuthProvider: FC = ({ children }) => {
  const [state, setState] = useState<AuthProviderState>({ isLoading: true })
  const navigate = useHistory()

  const api = useApi()

  const getUserProfile = (): Promise<void> =>
    api
      .get('user/profile/')
      .then(({ data }) => {
        setState(() => ({
          isLoading: false,
          user: data,
        }))
      })
      .catch(() => {
        setState(() => ({ isLoading: false }))
        onLogout()
      })

  useEffect(() => {
    setAuthHeader(api, localStorage.authToken)

    getUserProfile()
  }, [])

  const onLogin = (values: any) => {
    api
      .post('login/', { ...values })
      .then(({ data }) => {
        if (data) {
          localStorage.setItem('authToken', data.token)
          setAuthHeader(api, data.token)

          getUserProfile().then(() => {
            navigate.push('/dashboard')
          })
        }
      })
      .catch(() => {
        sendErrorNotification('Пользователь с введенными данными не найден')
      })
  }

  const onLogout = () => {
    localStorage.removeItem('authToken')
    navigate.push('/auth')
  }

  if (state.isLoading) {
    return <Loader fullScreen />
  }

  console.log('state', state)

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(state.user),
        user: state.user,
        onLogout,
        onLogin,
      }}
    >
      {console.log('hhhhh??')}
      {children}
    </AuthContext.Provider>
  )
}
