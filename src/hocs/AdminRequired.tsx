import React, { FC } from 'react'
import { useUser } from '../hooks/useUser'

export const AdminRequired: FC = ({ children }) => {
  const { user } = useUser()

  return <>{user?.is_admin ? children : null}</>
}
