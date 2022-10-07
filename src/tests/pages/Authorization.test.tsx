import React from 'react'
import { render, screen } from '@testing-library/react'
import { Authorization } from '../../pages/Authorization'

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

describe('Authorization', () => {
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

  test('Authorization', () => {
    const { container } = render(<Authorization />)
    expect(container).toBeTruthy()
    const checkTextRender = screen.getByText(
      /Пожалуйста, выполните вход или регистрацию в системе/i,
    )
    expect(checkTextRender).toBeInTheDocument()
  })
})
