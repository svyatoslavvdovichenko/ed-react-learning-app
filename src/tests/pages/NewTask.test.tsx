import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MemoryRouter, Route, Switch } from 'react-router-dom'
import { Dashboard } from '../../pages/Dashboard'
import { NewTask } from '../../pages/NewTask'

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

jest.mock('../../hooks/useReferences', () => ({
  useReferences: () => ({
    technologies: [
      {
        id: 123,
        title: 'adaptive',
      },
    ],
    specialization: [
      {
        id: 1,
        title: 'frontend',
      },
    ],
  }),
}))

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

const queryClient = new QueryClient()

const renderWithRouter = (component: JSX.Element) => {
  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/new-task']}>
          <Switch>
            <Route path="/new-task">
              <NewTask />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </MemoryRouter>
      </QueryClientProvider>,
    ),
  }
}

jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    onLogout: () => {},
    onLogin: () => {},
  }),
}))

describe('NewTask', () => {
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

  test('Placeholder works corrently', () => {
    render(<NewTask />)
    expect(screen.getByPlaceholderText(/Введите название/i)).toBeInTheDocument()
  })

  test('form works currently', () => {
    const { container, getByTestId, getByText, getByPlaceholderText } = render(<NewTask />)
    const user = userEvent

    user.type(getByPlaceholderText(/Введите название/i), 'John')
    user.type(
      getByPlaceholderText(/https:\/\/example\.com/i),
      'Example text',
    )
    user.type(getByPlaceholderText(/введите текст/i), 'sqeqww')

    user.click(getByTestId('specialization'))
    user.click(getByTestId(/technologies/i))

    expect(container).toMatchSnapshot()
  })

  test('Click back button', () => {
    renderWithRouter(<NewTask />)

    userEvent.click(
      screen.getByRole('button', {
        name: /left назад/i,
      }),
    )

    expect(screen.getByText(/фильтры/i)).toBeInTheDocument()
  })
})
