import { AxiosError } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import { useApi } from './useApi'

export interface LoadingBag {
  loading: true
}

export interface ErrorBag {
  error: Error | AxiosError
  loading: false
}

export interface ApiDataBag<T> {
  loading: false
  data: T
}

export type ApiResponse<T> = ApiDataBag<T> | LoadingBag | ErrorBag

export const useQueryRequest = <T>(url: string): UseQueryResult<T> => {
  const api = useApi()

  const fetcher = (): Promise<T> => {
    return api.get(url).then((res) => res.data)
  }

  return useQuery<T, AxiosError, T>(url, fetcher, {
    refetchOnWindowFocus: false,
  })

  // TODO think about better return from this hook
  // if (!error && !apiData) {
  //   return { loading: true }
  // }

  // if (error) {
  //   sendErrorNotification('Error occured')
  //   return { error, loading: false }
  // }

  // return { loading: false, data: apiData! } as ApiDataBag<T>
}
