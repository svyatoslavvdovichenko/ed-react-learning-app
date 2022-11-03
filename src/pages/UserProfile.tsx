import { Button, Card } from 'antd'
import { Col, Row } from 'antd/lib/grid'
import Text from 'antd/lib/typography/Text'
import { FC } from 'react'
import styled from 'styled-components'
import { Layout } from '../components/Layout'
import { StyledText } from '../components/common/StyledComponents'
import { useUser } from '../hooks/useUser'
import { TaskItem } from '../components/dashboard/TaskItem'
import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined'

const DoneTaskLine = styled.div`
  width: 35%;
  display: flex;
  border-bottom: 1px solid #EEEEEE;
  flex-wrap: nowrap;
`
const DoneTaskText = styled(StyledText)`
  margin-top: 20px;
  padding-bottom: 10px;
  font-size: 14px;
  width: 100%;
`

const CountDoneTasks = styled(StyledText)`
  margin-top: 20px;
  font-size: 14px;
`

const StyledEmail = styled(Text)`
  margin-top: -10px;
`

const StyledRow = styled(Row)`
  margin-top: 30px
`

export const UserProfile: FC = () => {
  const { user } = useUser()

  return (
    <Layout>
      <StyledRow justify="center">
        <Col flex="0 1 970px">
          <Card>
            <Row justify="space-between">
              <Col span={8}>
                <StyledText>
                  {user?.first_name} {user?.last_name}
                </StyledText>
              </Col>
              
              <Col span={6}>
                <Button
                  type="primary"
                  ghost
                  icon={<EditOutlined />}
                >
                  Редактировать профиль
                </Button>
              </Col>
            </Row>

            <Row>
              <StyledEmail disabled>
                {user?.email}
              </StyledEmail>
            </Row>

            <Row>
              <StyledText>Статистика пользователя</StyledText>
            </Row>

            <DoneTaskLine>
              <DoneTaskText>
                Заданий выполнено
              </DoneTaskText>

              <CountDoneTasks>
                {user?.completed_tasks.length}
              </CountDoneTasks>
            </DoneTaskLine>
          </Card>
        </Col>
      </StyledRow>

      <StyledRow justify="center">
        <Col flex="0 1 970px">
          <Card>
            <StyledText>Активные задания</StyledText>

            <Row>
              {!!user?.active_tasks.length ? (
                user?.active_tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))
              ) : (
                <StyledText>
                  Нет активных заданий
                </StyledText>
              )}
            </Row>
          </Card>
        </Col>
      </StyledRow>

      <StyledRow justify="center">
        <Col flex="0 1 970px">
          <Card>
            <Row>
              <StyledText>Выполненные задания</StyledText>
            </Row>

            {!! user?.completed_tasks.length ? (
              user?.completed_tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))
            ) : (
              <Text>Нет выполненных заданий</Text>
            )}

          </Card>
        </Col>
      </StyledRow>
    </Layout>
  )
}
