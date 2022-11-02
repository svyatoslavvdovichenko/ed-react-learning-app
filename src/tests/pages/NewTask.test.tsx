import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
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
    })
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

const renderWithRouter = (
  component: JSX.Element) => {
  return {
    ...render((
      <MemoryRouter>
          {component}
      </MemoryRouter>))
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
    const { container } = render(<NewTask/>)
    const user = userEvent;
  
    user.type(screen.getByPlaceholderText(/Введите название/i), 'John');
    user.type(screen.getByPlaceholderText(/https:\/\/example\.com/i), 'Example text');   
    user.type(screen.getByPlaceholderText(/введите текст/i), "sqeqww");
    
    user.click(screen.getByTestId('specialization'));
    user.click(screen.getByTestId(/technologies/i));   

    expect(container).toMatchSnapshot();
  })

  test("Click back button", () => {
    renderWithRouter(<NewTask/>)

    userEvent.click(screen.getByText(/Назад/i));
  })
})