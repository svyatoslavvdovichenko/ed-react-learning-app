import { notification } from 'antd'
import { IconType } from 'antd/lib/notification'

const sendNotification = (type: IconType, message: string) => {
  notification[type]({
    message,
    placement: 'bottomRight',
  })
}

export const sendErrorNotification = (message: string): void => {
  sendNotification('error', message)
}

export const sendSuccessNotification = (message: string): void => {
  sendNotification('success', message)
}
