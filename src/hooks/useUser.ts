import { useTypedSelector } from './useTypeSelector';

export const useUser = () => {
  const { user } = useTypedSelector(state => state.authReducer)

  return { user }
}
