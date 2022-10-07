import { FC } from 'react'
import { Breadcrumb, Typography } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

const { Text } = Typography

export interface BreadcrumbItem {
  key: string
  title: string
  link: string
}
export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => (
  <Breadcrumb style={{ marginBottom: '40px' }}>
    <Breadcrumb.Item href="/">
      <HomeOutlined />
    </Breadcrumb.Item>

    {items.map(({ key, title, link }) => (
      <Breadcrumb.Item href={link} key={key}>
        <Text>{title}</Text>
      </Breadcrumb.Item>
    ))}
  </Breadcrumb>
)
