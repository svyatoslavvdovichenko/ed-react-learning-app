import { FC } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRouteProps {
  privateElement: JSX.Element
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ privateElement }) => {
  if (localStorage.getItem('authToken')) return privateElement
  return <Navigate to="/auth" replace />
}
