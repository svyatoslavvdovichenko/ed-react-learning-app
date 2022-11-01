import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Authorization } from './pages/Authorization'
import { ForgetPassword } from './components/onboarding/ForgetPassword'
import { UserApp } from './UserApp'
import { useTypedSelector } from './hooks/useTypeSelector'

export const AuthorizationApp: FC = () => {
  const { user } = useTypedSelector((state) => state.authReducer)

  if (user) {
    return <UserApp />
  } else {
    return (
      <>
        <Routes>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />

          <Route path="/auth" element={<Authorization />} />

          <Route path="/forget-password" element={<ForgetPassword />} />
        </Routes>
      </>
    )
  }
}
