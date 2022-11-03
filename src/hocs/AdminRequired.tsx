import React, { FC } from 'react'
import { useUser } from '../hooks/useUser'

interface IAdminRequired {
  children: React.ReactNode
}

export const AdminRequired: FC<IAdminRequired> = ({ children }) => {
  const { user } = useUser()

  return <>{user?.is_admin ? children : null}</>
}
