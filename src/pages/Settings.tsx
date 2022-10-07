import React from 'react'
import { Layout } from '../components/Layout'
import { useQueryRequest } from '../hooks/useQueryRequest'
import { ITechnology } from '../types'

export const Settings = () => {
  const { data: technologiesTags } =
    useQueryRequest<ITechnology[]>('v1/technologies/')

  return <Layout>Settings</Layout>
}
