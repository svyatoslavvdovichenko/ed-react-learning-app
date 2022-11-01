import { FC } from 'react'
import { Dashboard } from './pages/Dashboard'
import { PrivateRoute } from './hocs/PrivateRoute'
import { TaskProfile } from './pages/TaskProfile'
import { NewTask } from './pages/NewTask'
import { UserProfile } from './pages/UserProfile'
import { EditTask } from './pages/EditTask'
import { ReferencesProvider } from './hocs/ReferencesProvider'
import { Navigate, Route, Routes } from 'react-router-dom'

export const UserApp: FC = () => (
  <>
    <Routes>
      <Route
        path="/dashboard"
        element={<PrivateRoute privateElement={<Dashboard />} />}
      />
      <Route
        path="/task/:taskId"
        element={<PrivateRoute privateElement={<TaskProfile />} />}
      />
      <Route
        path="/task/:taskId/edit"
        element={<PrivateRoute privateElement={<EditTask />} />}
      />

      <Route
        path="/new-task"
        element={<PrivateRoute privateElement={<NewTask />} />}
      />

      <Route
        path="/profile"
        element={<PrivateRoute privateElement={<UserProfile />} />}
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </>
)
