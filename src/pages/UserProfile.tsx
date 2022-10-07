import { Card } from 'antd'
import { Col, Row } from 'antd/lib/grid'
import Text from 'antd/lib/typography/Text'
import { FC } from 'react'
import { Layout } from '../components/Layout'
import { StyledText } from '../components/common/StyledComponents'
import { useUser } from '../hooks/useUser'
import { TaskItem } from '../components/dashboard/TaskItem'

export const UserProfile: FC = () => {
  const { user } = useUser()

  console.log('user', user)

  return (
    <Layout>
      <Row justify="center">
        <Col flex="0 1 970px">
          <Card>
            <Row>
              <StyledText>
                {user?.first_name} {user?.last_name}
              </StyledText>
            </Row>

            <Row>
              <Text>{user?.email}</Text>
            </Row>

            <StyledText>Активные задания</StyledText>

            <Row>
              {user?.active_tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </Row>

            <StyledText>Выполненные задания</StyledText>

            {user?.completed_tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}
