import { ITechnology, ISpecialization } from './../types'
import { createContext } from 'react'

export interface ReferencesContextType {
  technologies: ITechnology[]
  specializations: ISpecialization[]
}

export const ReferencesContext = createContext<ReferencesContextType>(
  undefined!,
)
