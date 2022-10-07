import React from 'react'
import { render } from '@testing-library/react'
import { SignIn } from '../../../components/onboarding/SignIn'

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

jest.mock('../../../hooks/useUser', () => ({
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

jest.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    onLogout: () => {},
    onLogin: () => {},
  }),
}))

describe('SignIn', () => {
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

  test('SignIn', () => {
    const { container } = render(<SignIn />)
    expect(container).toBeTruthy()
  })
})
