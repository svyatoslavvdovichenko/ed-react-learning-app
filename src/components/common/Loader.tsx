import { Row, Spin } from 'antd'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'

export interface LoaderProps {
  fullScreen?: boolean
}

const StyledRow = styled(Row)<{ $fullScreen: boolean }>`
  ${(props) =>
    props.$fullScreen &&
    css`
      width: 100vw;
      height: 100vh;
    `}
`

export const Loader: FC<LoaderProps> = ({ fullScreen = false }) => {
  return (
    <StyledRow justify="center" align="middle" $fullScreen={fullScreen}>
      <Spin size="large" />
    </StyledRow>
  )
}
