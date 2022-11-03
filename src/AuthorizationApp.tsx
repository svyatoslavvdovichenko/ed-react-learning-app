import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Authorization } from './pages/Authorization'
import { ForgetPassword } from './components/onboarding/ForgetPassword'
import { UserApp } from './UserApp'
import { useTypedSelector } from './hooks/useTypedSelector'

export const AuthorizationApp: FC = () => {
  const { isAuthenticated } = useTypedSelector((state) => state.authReducer)

  if (isAuthenticated) {
    return <UserApp />
  }

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />

      <Route path="/auth" element={<Authorization />} />

      <Route path="/forget-password" element={<ForgetPassword />} />
    </Routes>
  )
}
