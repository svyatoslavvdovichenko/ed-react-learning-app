import React, { FC } from 'react'
import { Pagination } from 'antd'

interface TasksPaginationProps {
  steps?: number
}

export const TasksPagination: FC<TasksPaginationProps> = ({ steps }) => (
  <Pagination defaultCurrent={1} total={steps} />
)
