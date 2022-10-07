import React from 'react'
import { render } from '@testing-library/react'
import { Settings } from '../../pages/Settings'

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom')

  return {
    ...originalModule,
    Link: () => <div />,
    useLocation: () => ({
      location: {
        search: 'search',
        pathname: 'pathname',
      },
    }),
    useParams: () => ({
      taskId: '1ffgj23dfaf234fg3',
    }),
  }
})

jest.mock('../../hooks/useUser', () => ({
  useUser: () => ({
    email: 'string',
    first_name: 'string',
    id: 213,
    is_admin: false,
    last_name: 'string',
    completed_tasks: [],
    active_tasks: [],
  }),
}))

jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    onLogout: () => {},
    onLogin: () => {},
  }),
}))

jest.mock('../../hooks/useQueryRequest', () => ({
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

describe('Settings', () => {
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

  test('Settings', () => {
    const { container } = render(<Settings />)
    expect(container).toBeTruthy()
  })
})
