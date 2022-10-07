import React from 'react'
import { render, screen } from '@testing-library/react'
import { TaskItem } from '../../../components/dashboard/TaskItem'

describe('TaskItem', () => {
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

  test('TaskItem', () => {
    const { container } = render(
      <TaskItem
        task={{
          attachments: [{ id: 36, url: 'https://docs.google.com/document/d' }],
          description: 'В макетах',
          id: 23,
          specialization: {
            id: 1,
            title: 'frontend',
          },
          technologies: [
            {
              id: 123,
              title: 'adaptive',
            },
          ],
          title: 'Компонент выбора способа доставки',
        }}
      />,
    )
    expect(container).toBeTruthy()
    const checkTextRender = screen.getByText(
      /Компонент выбора способа доставки/i,
    )
    expect(checkTextRender).toBeInTheDocument()
  })
})
