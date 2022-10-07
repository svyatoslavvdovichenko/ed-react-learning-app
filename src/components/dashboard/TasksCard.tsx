import { FC } from 'react'
import { Row, Card, Spin } from 'antd'
import { StyledText } from '../common/StyledComponents'
import { TasksPagination } from './TasksPagination'
import { TaskItem } from './TaskItem'
import { DjangoResponse, ITask } from '../../types'
import { useQueryRequest } from '../../hooks/useQueryRequest'

export const TasksCard: FC = () => {
  const { isLoading, data } =
    useQueryRequest<DjangoResponse<ITask[]>>(`v1/tasks/`)

  return (
    <Card bodyStyle={{ padding: 32 }} style={{ marginBottom: 20 }}>
      {isLoading ? (
        <Row justify="center">
          <Spin size="large" />
        </Row>
      ) : (
        <Row justify="start">
          <StyledText style={{ marginBottom: 26, fontSize: 20 }}>
            {data?.results ? 'Последние добавленные' : 'Задачи не найдены'}
          </StyledText>
        </Row>
      )}

      {data && data.results.length > 0 ? (
        <>
          {data.results.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}

          <Row justify="center">
            <TasksPagination steps={data.results.length / 10} />
          </Row>
        </>
      ) : (
        <StyledText>Нет задач</StyledText>
      )}
    </Card>
  )
}
