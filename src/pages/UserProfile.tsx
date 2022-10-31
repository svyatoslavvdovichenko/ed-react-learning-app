import { Button, Card } from 'antd'
import { Col, Row } from 'antd/lib/grid'
import Text from 'antd/lib/typography/Text'
import { FC } from 'react'
import { Layout } from '../components/Layout'
import { StyledText } from '../components/common/StyledComponents'
import { useUser } from '../hooks/useUser'
import { TaskItem } from '../components/dashboard/TaskItem'
import { EditOutlined } from '@ant-design/icons'

export const UserProfile: FC = () => {
  const { user } = useUser()

  return (
    <Layout>
      <Row justify="center">
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
                  style={{ height: 40, marginRight: 20 }}
                >
                  <EditOutlined />
                  Редактировать профиль
                </Button>
              </Col>
            </Row>

            <Row>
              <Text style={{ marginTop: '-10px' }} disabled>
                {user?.email}
              </Text>
            </Row>

            <Row style={{ marginTop: '30px' }}>
              <StyledText>Статистика пользователя</StyledText>
            </Row>

            <Row
              style={{
                width: '35%',
                display: 'flex',
                borderBottom: '1px solid #EEEEEE',
                flexWrap: 'nowrap',
              }}
            >
              <StyledText
                style={{
                  marginTop: '20px',
                  paddingBottom: '10px',
                  fontSize: '14px',
                  width: '100%',
                }}
              >
                Заданий выполнено
              </StyledText>

              <StyledText style={{ marginTop: '20px', fontSize: '14px' }}>
                {user?.completed_tasks.length}
              </StyledText>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: '30px' }}>
        <Col flex="0 1 970px">
          <Card>
            <StyledText>Активные задания</StyledText>

            <Row>
              {!!user?.active_tasks.length ? (
                user?.active_tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))
              ) : (
                <StyledText style={{ marginTop: '10px', fontSize: '14px' }}>
                  Нет активных заданий
                </StyledText>
              )}
            </Row>
          </Card>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: '30px' }}>
        <Col flex="0 1 970px">
          <Card>
            <StyledText>Выполненные задания</StyledText>

            {!! user?.completed_tasks.length ? (
              user?.completed_tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))
            ) : (
              <p style={{ marginTop: '10px' }}>Нет выполненных заданий</p>
            )}
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}
