import { FC } from 'react'
import { Redirect } from 'react-router-dom'

interface PrivateRouteProps {
  privateElement: JSX.Element
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ privateElement }) => {
  if (localStorage.getItem('authToken')) return privateElement
  return <Redirect to="/auth" />
}
