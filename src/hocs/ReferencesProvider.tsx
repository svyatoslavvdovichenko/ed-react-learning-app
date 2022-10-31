import { FC } from 'react'
import { Provider } from 'react-redux'
import { Loader } from '../components/common/Loader'
import { useQueryRequest } from '../hooks/useQueryRequest'
import { store } from '../store'
import { ITechnology, ISpecialization } from '../types'

export const ReferencesProvider: FC = ({ children }) => {
  const { data: dataTech, isLoading: isLoadingTech } =
    useQueryRequest<ITechnology[]>('v1/technologies/')
  const { data: dataSpec, isLoading: isLoadingSpec } = useQueryRequest<
    ISpecialization[]
  >('v1/specializations/')

  return (
    <>
      {isLoadingTech || (isLoadingSpec && <Loader />)}

      {!isLoadingTech && dataTech && !isLoadingSpec && dataSpec && (
        <Provider store={store}>{children}</Provider>
      )}
    </>
  )
}
