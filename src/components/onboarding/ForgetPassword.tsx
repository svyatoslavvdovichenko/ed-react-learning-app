import { Formik, Form } from 'formik'
import { Button, Col, Row, Typography } from 'antd'
import { Layout } from '../Layout'
import { InputField } from '../forms/InputField'

const { Title, Text } = Typography

export const ForgetPassword = () => (
  <Layout shouldBeCentered>
    <Row justify="center" align="middle">
      <Col>
        <Title style={{ textAlign: 'center', color: '#555555' }}>
          Exceed Challenger
        </Title>
        <Row justify="center">
          <Col
            style={{
              textAlign: 'center',
              whiteSpace: 'nowrap',
              marginBottom: 24,
            }}
          >
            <Text type="secondary">
              Введите адрес электронной почты, указанный <br /> при регистрации
              и мы вышлем новый пароль
            </Text>
          </Col>
        </Row>

        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values) => console.log('email', values.email)}
        >
          {() => (
            <Form>
              <InputField placeholder="Email" name="email" />
              <Row justify="space-between">
                <Button htmlType="submit" type="primary">
                  Отправить пароль
                </Button>
                <a href="/">Назад</a>
              </Row>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  </Layout>
)
