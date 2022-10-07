import React from 'react'
import { render, screen } from '@testing-library/react'
import { TaskSearchForm } from '../../../components/dashboard/TaskSearchForm'

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

describe('TaskSearchForm', () => {
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

  test('TaskSearchForm', () => {
    const { container } = render(<TaskSearchForm />)
    expect(container).toBeTruthy()
    const checkTextRender = screen.getByText(/Найти/i)
    expect(checkTextRender).toBeInTheDocument()
  })
})
