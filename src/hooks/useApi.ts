import { useTypedSelector } from './useTypeSelector';

export const useApi = () => {
 const api = useTypedSelector(state => state.apiReducer.apiInstance);

  return api
}
