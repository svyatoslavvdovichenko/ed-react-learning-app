import { render, screen } from '@testing-library/react'
import { FiltersCard } from '../../../components/dashboard/FiltersCard'

jest.mock('react-query', () => {
  const originalModule = jest.requireActual('react-query')

  return {
    ...originalModule,
    useQueryClient: () => ({
      queryClient: {
        defaultOptions: {},
        mutationCache: {},
        mutationDefaults: [],
        queryCache: {},
        queryDefaults: [],
        unsubscribeFocus: () => {},
        unsubscribeOnline: () => {},
        setQueryData: (firstParam: string, data: any) => {
          return null
        },
      },
    }),
  }
})

describe('FiltersCard', () => {
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

  test('FiltersCard', () => {
    const { container } = render(<FiltersCard />)
    expect(container).toBeTruthy()
    const checkTextRender = screen.getByText(/Фильтры/i)
    expect(checkTextRender).toBeInTheDocument()
  })
})
