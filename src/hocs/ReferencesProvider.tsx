import { FC } from 'react'
import { Loader } from '../components/common/Loader'
import { ReferencesContext } from '../contexts/references'
import { useQueryRequest } from '../hooks/useQueryRequest'
import { ITechnology, ISpecialization } from '../types'

export const ReferencesProvider: FC = ({ children }) => {
  // TODO for now using only technologies
  const { data: dataTech, isLoading: isLoadingTech } =
    useQueryRequest<ITechnology[]>('v1/technologies/')
  const { data: dataSpec, isLoading: isLoadingSpec } = useQueryRequest<
    ISpecialization[]
  >('v1/specializations/')

  return (
    <>
      {isLoadingTech || (isLoadingSpec && <Loader />)}

      {!isLoadingTech && dataTech && !isLoadingSpec && dataSpec && (
        <ReferencesContext.Provider
          value={{ technologies: dataTech, specializations: dataSpec }}
        >
          {children}
        </ReferencesContext.Provider>
      )}
    </>
  )
}
