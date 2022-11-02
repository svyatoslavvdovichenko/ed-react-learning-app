import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MemoryRouter, Route, Switch } from 'react-router-dom'
import { Dashboard } from '../../pages/Dashboard'
import { EditTask } from '../../pages/EditTask'

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

jest.mock('../../hooks/useQueryRequest', () => ({
  useQueryRequest: () => ({
    isLoading: false,
    data: {
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
  }),
}))

const queryClient = new QueryClient()

const renderWithRouter = (component: JSX.Element) => {
  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/task/:taskId/edit']}>
          <Switch>
            <Route path="/task/:taskId/edit">
              <EditTask />
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

jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    onLogout: () => {},
    onLogin: () => {},
  }),
}))

describe('EditTask', () => {
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

  test('EditTask', () => {
    const { container } = render(<EditTask />)
    expect(container).toBeTruthy()
  })

  test('Placeholder works corrently', () => {
    render(<EditTask />)
    expect(screen.getByPlaceholderText(/Введите название/i)).toBeInTheDocument()
  })

  test('form works currently', () => {
    const { container, getByTestId, getByText, getByPlaceholderText } = render(<EditTask/>)
    const user = userEvent;
  
    user.type(getByPlaceholderText(/Введите название/i), 'John');
    user.type(getByPlaceholderText(/https:\/\/example\.com/i), 'Example text');
    user.type(getByPlaceholderText(/введите текст/i), "sqeqww");
    user.click(getByTestId(/specialization/i));
    user.click(getByText(/Frontend/i))
    user.click(getByTestId(/technologies/i));
    user.click(getByText(/React/i))
    user.click(getByText(/Добавить/i));

    expect(container).toMatchSnapshot();
  })
})

