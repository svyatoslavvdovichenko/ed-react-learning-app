import React from 'react'
import { render } from '@testing-library/react'
import { Loader } from '../../../components/common/Loader'

describe('Loader', () => {
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

  test('Loader', () => {
    const { container } = render(<Loader />)
    expect(container).toBeTruthy()
  })
})
