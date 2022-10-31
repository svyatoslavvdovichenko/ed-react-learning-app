import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Loader } from '../components/common/Loader'
import { AuthContext } from '../contexts/auth'
import { useActions } from '../hooks/useActions'
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

  const { setUser } = useActions();

  const api = useApi()

  const getUserProfile = (): Promise<void> =>
    api
      .get('user/profile/')
      .then(({ data }) => {

        setState(() => ({
          isLoading: false,
          user: data,
        }))
        setUser({ user: data });
      })
      .catch(() => {
        setState(() => ({ isLoading: false }))
        navigate.push('/auth')
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

  if (state.isLoading) {
    return <Loader fullScreen />
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(state.user),
        user: state.user,
        onLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
