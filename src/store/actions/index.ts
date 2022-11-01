import { setAuthHeader } from './apiActions'
import { loginUser, onLogout, setUser } from './authActions'
import { fetchReferences, setReferences } from './referenceActions'

export default {
  setReferences,
  fetchReferences,
  onLogout,
  loginUser,
  setUser,
  setAuthHeader
}
