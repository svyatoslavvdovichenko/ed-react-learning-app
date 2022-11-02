import { FC } from 'react'
import { Dashboard } from './pages/Dashboard'
import { Redirect, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './hocs/PrivateRoute'
import { TaskProfile } from './pages/TaskProfile'
import { NewTask } from './pages/NewTask'
import { UserProfile } from './pages/UserProfile'
import { EditTask } from './pages/EditTask'
import { Reference } from './hocs/Reference'



export const UserApp: FC = () => (
  <Reference>
    <Switch>
      <Route
        path="/dashboard"
        exact
        render={() => <PrivateRoute privateElement={<Dashboard />} />}
      />
      <Route
        path="/task/:taskId"
        exact
        render={() => <PrivateRoute privateElement={<TaskProfile />} />}
      />
      <Route
        path="/task/:taskId/edit"
        exact
        render={() => <PrivateRoute privateElement={<EditTask />} />}
      />

      <Route
        path="/new-task"
        exact
        render={() => <PrivateRoute privateElement={<NewTask />} />}
      />

      <Route
        path="/profile"
        exact
        render={() => <PrivateRoute privateElement={<UserProfile />} />}
      />

      <Redirect to="/dashboard" />
    </Switch>
  </Reference>
)
