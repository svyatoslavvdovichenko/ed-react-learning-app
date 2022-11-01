import { Col, Row } from 'antd/lib/grid'
import { useHistory, useParams } from 'react-router-dom'
import { Loader } from '../components/common/Loader'
import { Layout } from '../components/Layout'
import { TaskForm } from '../components/task/TaskForm'
import { ERROR_NOTIFIFCATION_MESSAGE } from '../constants'
import { useApi } from '../hooks/useApi'
import { useQueryRequest } from '../hooks/useQueryRequest'
import { useTypedSelector } from '../hooks/useTypeSelector'

import { ITask } from '../types'
import {
  convertSpecializationOptions,
  convertTechnologiesOptions,
} from '../utils/converters'
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '../utils/systemNotification'

export const EditTask = () => {
  const api = useApi()
  const navigate = useHistory()
  const { taskId } = useParams<{ taskId: string }>()

  const { data: task, isLoading } = useQueryRequest<ITask>(
    `v1/tasks/${taskId}/`,
  )

  const { technologies, specializations } = useTypedSelector(
    (state) => state.referenceReducer,
  )

  const handleUpdateTask = (values: any) => {
    api
      .put(`v1/tasks/${taskId}/`, {
        ...values,
        specialization: convertSpecializationOptions(
          values.specialization,
          specializations,
        ),
        technologies: convertTechnologiesOptions(
          values.technologies,
          technologies,
        ),
        attachments: values.attachments.map((item: string) => ({ url: item })),
      })
      .then(() => {
        sendSuccessNotification('Задание успешно обновлено')
        navigate.push('/dashboard')
      })
      .catch((err) => sendErrorNotification(ERROR_NOTIFIFCATION_MESSAGE))
  }

  return (
    <Layout>
      <Row justify="center">
        <Col flex="0 1 970px">
          {isLoading && <Loader />}

          {!isLoading && task && (
            <TaskForm
              isEdit
              initialValues={{
                title: task.title,
                specialization: task.specialization.title,
                description: task.description,
                technologies: task.technologies.map((item) => item.title),
                attachments: task.attachments.map((item) => item.url),
              }}
              handleSubmit={handleUpdateTask}
              submitButtonText="Изменить"
            />
          )}
        </Col>
      </Row>
    </Layout>
  )
}
