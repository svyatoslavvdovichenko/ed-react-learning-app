import React from 'react'
import { render } from '@testing-library/react'
import { Breadcrumbs } from '../../../components/common/Breadcrumbs'

describe('Breadcrumbs', () => {
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

  test('Breadcrumbs', () => {
    const { container } = render(
      <Breadcrumbs
        items={[
          {
            key: 'currentTask',
            title: 'title',
            link: `/task/taskId`,
          },
        ]}
      />,
    )
    expect(container).toBeTruthy()
  })
})
