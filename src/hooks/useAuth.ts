import { useActions } from './useActions'

export const useAuth = () => {
  const { onLogout } = useActions()

  return { onLogout }
}
