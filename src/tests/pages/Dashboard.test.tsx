import { render, screen } from '@testing-library/react'
import { Dashboard } from '../../pages/Dashboard'

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

jest.mock('react-query', () => {
  const originalModule = jest.requireActual('react-query')

  return {
    ...originalModule,
    useQueryClient: () => ({
      defaultOptions: {},
      mutationCache: {},
      mutationDefaults: [],
      queryCache: {},
      queryDefaults: [],
      unsubscribeFocus: () => {},
      unsubscribeOnline: () => {},
    }),
  }
})

describe('Dashboard', () => {
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

  test('Dashboard', () => {
    const { container } = render(<Dashboard />)
    expect(container).toBeTruthy()
  })
})
