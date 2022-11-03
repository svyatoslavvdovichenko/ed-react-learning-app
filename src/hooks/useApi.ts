import { useTypedSelector } from './useTypedSelector';

export const useApi = () => {
 const api = useTypedSelector(state => state.apiReducer.apiInstance);

  return api
}
