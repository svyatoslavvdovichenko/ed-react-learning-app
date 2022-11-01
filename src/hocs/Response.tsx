import React, { FC } from 'react'
import { useQuery } from 'react-query'
import { Loader } from '../components/common/Loader'

export interface ResponseProps {
  key: string;
  children: React.ReactNode
}

export const Response: FC<ResponseProps> = ({ key, children }) => {
  const { data, isLoading, error } = useQuery(key)

  if (isLoading) {
    return <Loader fullScreen />
  }

  if (error) {
    return <div>error</div>
  }

  return <>{children}</>
  // return () => children(data)
}
