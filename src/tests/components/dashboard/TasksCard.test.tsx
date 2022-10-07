import React from 'react'
import { render, screen } from '@testing-library/react'
import { TasksCard } from '../../../components/dashboard/TasksCard'

jest.mock('../../../hooks/useQueryRequest', () => ({
  useQueryRequest: () => ({
    isLoading: false,
    data: {
      count: 1,
      next: 2,
      previous: 3,
      results: [
        {
          attachments: [{ id: 36, url: 'https://docs.google.com/document' }],
          description: 'Описание тестового задания',
          id: 23,
          specialization: {
            id: 1,
            title: 'frontend',
          },
          technologies: [
            {
              id: 123,
              title: 'react',
            },
          ],
          title: 'Название тестового задания',
        },
      ],
    },
  }),
}))

describe('TasksCard', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      value: () => {
        return {
          matches: false,
          addListener: () => {},
          removeListener: () => {},
        }
      },
    })
  })

  test('TasksCard', () => {
    const { container } = render(<TasksCard />)
    expect(container).toBeTruthy()
  })
})
