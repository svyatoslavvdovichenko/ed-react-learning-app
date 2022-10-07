export interface IUser {
  email: string
  first_name: string
  id: number
  is_admin: boolean
  last_name: string
  completed_tasks: ITask[]
  active_tasks: ITask[]
}

export interface ITask {
  id: number
  title: string
  description: string
  specialization: ISpecialization
  technologies: ITechnology[]
  attachments: IAttachment[]
}

export interface ITechnology {
  id: number
  title: string
}

export interface ISpecialization {
  id: number
  title: string
}

export interface IAttachment {
  id: number
  url: string
}
export interface DjangoResponse<T> {
  count: number
  next: number
  previous: number
  results: T
}
