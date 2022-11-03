import { Col, Row } from 'antd/lib/grid'
import { useHistory } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { TaskForm } from '../components/task/TaskForm'
import { ERROR_NOTIFIFCATION_MESSAGE } from '../constants'
import { useApi } from '../hooks/useApi'
import { useTypedSelector } from '../hooks/useTypedSelector'
import {
  convertTechnologiesOptions,
  convertSpecializationOptions,
} from '../utils/converters'
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '../utils/systemNotification'

export const NewTask = () => {
  const api = useApi()
  const navigate = useHistory()

  const { technologies, specializations } = useTypedSelector(
    (state) => state.referenceReducer,
  )

  const handleCreateTask = (values: any) => {
    api
      .post('v1/tasks/', {
        ...values,
        technologies: convertTechnologiesOptions(
          values.technologies,
          technologies,
        ),
        specialization: convertSpecializationOptions(
          values.specialization,
          specializations,
        ),
        attachments: values.attachments.map((item: string) => ({ url: item })),
      })
      .then(() => {
        sendSuccessNotification('Задание успешно создано')
        navigate.push('/dashboard')
      })
      .catch((err) => sendErrorNotification(ERROR_NOTIFIFCATION_MESSAGE))
  }

  return (
    <Layout>
      <Row justify="center">
        <Col flex="0 1 970px">
          <TaskForm
            initialValues={{
              title: '',
              specialization: '',
              description: '',
              technologies: [],
              attachments: [],
            }}
            handleSubmit={handleCreateTask}
            submitButtonText="Добавить"
          />
        </Col>
      </Row>
    </Layout>
  )
}
