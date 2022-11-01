import { FC } from 'react'
import { Loader } from '../components/common/Loader'
import { useQueryRequest } from '../hooks/useQueryRequest'
import { ITechnology, ISpecialization } from '../types'

interface IReferencesProvider {
  children: React.ReactNode;
}

export const ReferencesProvider: FC<IReferencesProvider> = ({ children }) => {
  const { data: dataTech, isLoading: isLoadingTech } =
    useQueryRequest<ITechnology[]>('v1/technologies/')
  const { data: dataSpec, isLoading: isLoadingSpec } = useQueryRequest<
    ISpecialization[]
  >('v1/specializations/')

  return (
    <>
      {isLoadingTech || (isLoadingSpec && <Loader />)}

      {!isLoadingTech && dataTech && !isLoadingSpec && dataSpec && (
        {children}
      )}
    </>
  )
}
