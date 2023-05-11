import { Button, Card, Col, Divider, Popconfirm, Row, Tag } from 'antd'
import { FC } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/common/Breadcrumbs'
import { Loader } from '../components/common/Loader'
import { Layout } from '../components/Layout'
import { StyledText } from '../components/common/StyledComponents'
import { ITask } from '../types'
import { useQueryRequest } from '../hooks/useQueryRequest'
import { StatusButton } from '../components/task/StatusButton'
import ReactMarkdown from 'react-markdown'
import { useApi } from '../hooks/useApi'
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '../utils/systemNotification'
import { ERROR_NOTIFIFCATION_MESSAGE } from '../constants'
import { AdminRequired } from '../hocs/AdminRequired'
import { DeleteOutlined, EditOutlined, LeftOutlined } from '@ant-design/icons'

export const TaskProfile: FC = () => {
  const { taskId } = useParams<{ taskId: string }>()
  const taskUrl = `v1/tasks/${taskId}/`

  const api = useApi()
  const navigate = useHistory()

  const { data: task, isLoading } = useQueryRequest<ITask>(taskUrl)

  const handleDeleteTask = () => {
    api
      .delete(taskUrl)
      .then(() => {
        sendSuccessNotification('Задание успешно удалено')
        navigate.push('/dashboard')
      })
      .catch((err) => sendErrorNotification(ERROR_NOTIFIFCATION_MESSAGE))
  }

  
  return (
    <Layout>
      <Breadcrumbs
        items={[
          {
            key: 'currentTask',
            title: task?.title ?? '-',
            link: `/task/${taskId}`,
          },
        ]}
      />
      {isLoading && <Loader fullScreen />}

      {!isLoading && task && (
        <Row justify="center">
          <Col flex="0 1 970px">
            <Card
              headStyle={{ padding: '16px 32px 0', maxWidth: '970px'}}
              bodyStyle={{ padding: '16px 32px 32px', maxWidth: '970px' }}
              title={task.title.length < 30 ? task.title : task.title.substr(0, 30) + "..."}
              extra={
                <AdminRequired>
                  <Popconfirm
                    title="Вы уверены, что хотите удалить эту задачу?"
                    onConfirm={handleDeleteTask}
                    okText="Да"
                    cancelText="Нет"
                  >
                    <Button
                      type="primary"
                      danger
                      style={{ margin: '0 8px 0 20px' }}
                    >
                      <DeleteOutlined />
                      Удалить задание
                    </Button>
                  </Popconfirm>

                  <Button
                    type="primary"
                    ghost
                    onClick={() => navigate.push(`/task/${taskId}/edit`)}
                  >
                    <EditOutlined />
                    Изменить
                  </Button>
                </AdminRequired>
              }
            >
              <Row align="middle" style={{ marginBottom: 20 }}>
                <StyledText>{task.specialization.title}</StyledText>

                <Divider
                  type="vertical"
                  style={{ background: '#555555', height: '20px' }}
                />

                {task.technologies.map((technology) => (
                  <Tag key={technology.id} color="green">
                    {technology.title}
                  </Tag>
                ))}
              </Row>

              <Row gutter={[0, 8]} style={{ marginBottom: 6 }}>
                <Col span={24}>
                  <StyledText>Описание задания</StyledText>
                </Col>

                <Col span={24} style={{ overflowWrap: "break-word" }}>
                  <ReactMarkdown>
                    {task.description}
                  </ReactMarkdown>
                </Col>
              </Row>

              {task.attachments.length > 0 && (
                <Row style={{ overflow: 'hidden' }}>
                  {task.attachments.map((attachment) => (
                    <Col
                      style={{ margin: '5px 0' }}
                      key={attachment.id}
                      span={24}
                    >
                      <a href={attachment.url} target="_blank">
                        {attachment.url}
                      </a>
                    </Col>
                  ))}
                </Row>
              )}

              <Row style={{ marginTop: 20 }} justify="end">
                <Button
                  type="primary"
                  ghost
                  onClick={() => navigate.push('/dashboard')}
                  style={{ height: 40, marginRight: 20 }}
                >
                  <LeftOutlined />
                  Назад
                </Button>

                <StatusButton />
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </Layout>
  )
}
