import Button from 'antd/lib/button'
import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import { ERROR_NOTIFIFCATION_MESSAGE } from '../../constants'
import { useApi } from '../../hooks/useApi'
import {
  sendErrorNotification,
  sendSuccessNotification,
} from '../../utils/systemNotification'

type TaskStatus = 'completed' | 'inProgress' | 'loading'

export const StatusButton = () => {
  const [status, setStatus] = useState<TaskStatus>('loading')

  const { taskId } = useParams<{ taskId: string }>()

  const api = useApi()

  useEffect(() => {
    api
      // @ts-ignore
      .get<any>(`v1/tasks/${taskId}/status/`)
      .then(({ data }) => {
        setStatus(data.in_progress ? 'inProgress' : 'completed')
      })
  }, [])

  const handleStartTask = () => {
    api
      .post(`v1/tasks/${taskId}/start/`)
      .then(() => {
        sendSuccessNotification('Задание было начато')
        setStatus('inProgress')
      })
      .catch((err) => {
        return sendErrorNotification(ERROR_NOTIFIFCATION_MESSAGE)
      })
  }

  const handleFinishTask = () => {
    api
      .post(`v1/tasks/${taskId}/complete/`)
      .then(() => {
        sendSuccessNotification('Задание было закончено')
        setStatus('completed')
      })
      .catch((err) => {
        return sendErrorNotification(ERROR_NOTIFIFCATION_MESSAGE)
      })
  }

  return (
    <>
      {status === 'loading' && <></>}

      {status !== 'loading' && (
        <Button
          style={{ height: 40 }}
          type="primary"
          onClick={status === 'inProgress' ? handleFinishTask : handleStartTask}
        >
          {status === 'inProgress' ? 'Закончить задание' : 'Начать задание'}
        </Button>
      )}
    </>
  )
}
