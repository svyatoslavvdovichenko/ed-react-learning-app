import { FC, useEffect } from 'react'
import { useActions } from '../hooks/useActions'

interface IReference {
  children: React.ReactNode
}

export const Reference: FC<IReference> = ({ children }) => {
  const { fetchReferences } = useActions()

  useEffect(() => {
    fetchReferences()
  }, [])

  return <>{children}</>
}
