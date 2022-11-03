import { setAuthHeader } from './apiActions'
import { loginUser, onLogout, setUser, setAuthenticated } from './authActions'
import { fetchReferences, setReferences } from './referenceActions'

export default {
  setReferences,
  fetchReferences,
  onLogout,
  loginUser,
  setUser,
  setAuthHeader,
  setAuthenticated
}
