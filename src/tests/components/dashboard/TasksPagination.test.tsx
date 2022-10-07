import React from 'react'
import { render, screen } from '@testing-library/react'
import { TasksPagination } from '../../../components/dashboard/TasksPagination'

describe('TasksPagination', () => {
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

  test('TasksPagination', () => {
    const { container } = render(<TasksPagination />)
    expect(container).toBeTruthy()
  })
})
