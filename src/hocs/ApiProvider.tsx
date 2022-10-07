import { AxiosInstance } from 'axios'
import { FC } from 'react'
import { ApiContext } from '../contexts/api'
import { createApi } from '../services'

export const setAuthHeader = (instance: AxiosInstance, token: string): void => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete instance.defaults.headers.common['Authorization']
    localStorage.removeItem('authToken')
  }
}

export const ApiProvider: FC = ({ children }) => {
  const apiInstance = createApi()

  apiInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response.status === 401) {
        localStorage.removeItem('authToken')
      }
      return Promise.reject(err)
    },
  )

  return (
    <ApiContext.Provider value={apiInstance}>{children}</ApiContext.Provider>
  )
}
