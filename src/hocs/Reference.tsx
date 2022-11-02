import { FC } from 'react'
import { Loader } from '../components/common/Loader'
import { useActions } from '../hooks/useActions';
import { useQueryRequest } from '../hooks/useQueryRequest'
import { ITechnology, ISpecialization } from '../types'

interface IReference {
  children: React.ReactNode
}

export const Reference: FC<IReference> = ({ children }) => {
  const { setReferences } = useActions();

  const { data: dataTech, isLoading: isLoadingTech } =
    useQueryRequest<ITechnology[]>('v1/technologies/')
  const { data: dataSpec, isLoading: isLoadingSpec } = useQueryRequest<
    ISpecialization[]
  >('v1/specializations/');

  setReferences({
    technologies: dataTech!,
    specializations: dataSpec!,
  })

  return (
    <>
      {isLoadingTech || (isLoadingSpec && <Loader />)}

      {!isLoadingTech && dataTech && !isLoadingSpec && dataSpec && (
        <>{children}</>
      )}
    </>
  )
}
