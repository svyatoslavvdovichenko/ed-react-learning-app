import { ITechnology, ISpecialization } from '../types'

export const convertTechnologiesOptions = (
  beTechnologies: string[],
  technologies: ITechnology[],
) =>
  beTechnologies.map((item) => ({
    title: item,
    id: technologies.find((tech) => tech.title === item)!.id,
  }))

export const convertSpecializationOptions = (
  beSpecialization: string,
  specializations: ISpecialization[],
) => {
  return {
    title: beSpecialization,
    id: specializations.find((spec) => spec.title === beSpecialization)!.id,
  }
}
