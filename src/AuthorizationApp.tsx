import { FC } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Authorization } from './pages/Authorization'
import { ForgetPassword } from './components/onboarding/ForgetPassword'
import { UserApp } from './UserApp'

export const AuthorizationApp: FC = () => (
  <Switch>
    <Redirect exact from="/" to="/dashboard" />

    <Route path="/auth" exact>
      <Authorization />
    </Route>

    <Route path="/forget-password" exact>
      <ForgetPassword />
    </Route>

    <UserApp />
  </Switch>
)
