import { FC } from 'react'
import {
  Button,
  Dropdown,
  Layout as AntdLayout,
  Menu,
  Row,
  Typography,
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styled, { css } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useUser } from '../hooks/useUser'
import { useTypedSelector } from '../hooks/useTypedSelector'

const { Title } = Typography

const { Header, Footer, Content } = AntdLayout

const StyledContent = styled(Content)<{ $shouldBeCentered: boolean }>`
  padding: 20px;

  ${(props) =>
    props.$shouldBeCentered &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: '#FAFAFA';
    `}
`

export type LayoutPropsType = {
  children: React.ReactNode;
  shouldBeCentered?: boolean;
}

export const Layout: FC<LayoutPropsType> = ({
  children,
  shouldBeCentered = false,
}) => {
  const { onLogout } = useAuth()
  const navigate = useNavigate()

  const { isAuthenticated, user } = useTypedSelector(state => state.authReducer)

  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #F0F0F0',
        }}
      >
        <Row
          justify="space-between"
          align="middle"
          style={{ width: '100%', height: '100%' }}
        >
          <Link to="/">
            <Title level={3} style={{ marginBottom: 0 }}>
              Exceed Challenger 2022
            </Title>
          </Link>

          {isAuthenticated && (
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="1">
                    <Link to="/profile">Профиль</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/settings">Настройки</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    onClick={() => {
                      onLogout()
                      navigate('/auth')
                    }}
                  >
                    Выйти
                  </Menu.Item>
                </Menu>
              }
            >
              <Button icon={<UserOutlined />}>
                {user?.first_name}
              </Button>
            </Dropdown>
          )}
        </Row>
      </Header>

      <StyledContent $shouldBeCentered={shouldBeCentered}>
        {children}
      </StyledContent>

      <Footer style={{ backgroundColor: '#F0F0F0' }}>
        Exceed Challenger 2022
      </Footer>
    </AntdLayout>
  )
}
