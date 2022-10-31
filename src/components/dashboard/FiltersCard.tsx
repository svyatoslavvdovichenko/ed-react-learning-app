import { FC } from 'react'
import { Row, Col, Card, Button, Tag } from 'antd'
import styled from 'styled-components'
import { StyledText } from '../common/StyledComponents'
import { Form, Formik } from 'formik'
import { SelectField } from '../forms/SelectField'
import { generateUrl } from '../../services/generateUrl'
import { useApi } from '../../hooks/useApi'
import { useQueryClient } from 'react-query'
import { useReferences } from '../../hooks/useReferences'

const StyledButton = styled(Button)`
  height: 40px;
`

const StyledCard = styled(Card)`
  width: 270px;
  min-height: 270px;
  margin-bottom: 10px;
`

export const FiltersCard: FC = () => {
  const { technologies, specializations } = useReferences()

  const queryClient = useQueryClient()
  const api = useApi()

  return (
    <StyledCard
      headStyle={{ padding: '0 16px' }}
      bodyStyle={{ padding: '10px 16px 16px' }}
      title={<StyledText>Фильтры</StyledText>}
    >
      <Row justify="start" gutter={[0, 10]}>
        <Formik
          initialValues={{
            specialization: "",
            technologies: [],
          }}
          onSubmit={(values) => {
            api.get(`v1/tasks/?${generateUrl(values)}`).then((response) => {
              queryClient.setQueryData(`v1/tasks/`, response.data)
            })
          }}
        >
          {({ resetForm }) => (
            <Form style={{ width: '100%' }}>
              <SelectField
                $marginBottom={10}
                name="specialization"
                options={specializations ?? []}
                label={<StyledText>Направление</StyledText>}
              />

              <SelectField
                $marginBottom={19}
                name="technologies"
                options={technologies ?? []}
                label={<StyledText>Технологии</StyledText>}
                mode="multiple"
                allowClear
                shouldUpdate={{ shouldUpdate: () => true }}
                tagRender={({ label, onClose }) => (
                  <Tag closable onClose={onClose} color="green">
                    {label}
                  </Tag>
                )}
              />

              <Row justify="space-between">
                <Col xs={12}>
                  <StyledButton
                    type="ghost"
                    onClick={() =>
                      resetForm({
                        values: {
                          specialization: '',
                          technologies: [],
                        },
                      })
                    }
                  >
                    Сбросить
                  </StyledButton>
                </Col>
                <Col flex="0" xs={12}>
                  <StyledButton type="primary" htmlType="submit">
                    Применить
                  </StyledButton>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Row>
    </StyledCard>
  )
}
