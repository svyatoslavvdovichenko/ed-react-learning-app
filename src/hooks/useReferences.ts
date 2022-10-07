import { ReferencesContext } from './../contexts/references'
import { useContext } from 'react'

export const useReferences = () => {
  return useContext(ReferencesContext)
}
