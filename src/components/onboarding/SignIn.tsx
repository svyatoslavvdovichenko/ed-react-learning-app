import { Link, useNavigate } from 'react-router-dom'
import { Checkbox, Row } from 'antd'
import { Formik, Form } from 'formik'
import { SingInSchema } from '../../forms/validators'
import { InputField } from '../forms/InputField'
import { StyledButton } from '../common/StyledComponents'
import { useApi } from '../../hooks/useApi'
import { sendErrorNotification } from '../../utils/systemNotification'
import { useActions } from '../../hooks/useActions'

export const SignIn = () => {
  const navigate = useNavigate()
  const { setUser } = useActions()

  const api = useApi()

  const getUserProfile = () => {
    api
      .get('user/profile/')
      .then(({ data }) => {
        setUser({ user: data })
      })
      .catch(() => {
        navigate('/auth')
      })
  }

  const onLogin = (values: any) => {
    api
      .post('login/', { ...values })
      .then(({ data }) => {
        if (data) {
          localStorage.setItem('authToken', data.token)
          getUserProfile();
          navigate('/dashboard');
        }
      })
      .catch(() => {
        sendErrorNotification('Пользователь с введенными данными не найден')
      })
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={onLogin}
      validationSchema={SingInSchema}
    >
      {({ isValid }) => (
        <Form>
          <InputField name="username" placeholder="Email" />

          <InputField
            $marginBottom={22}
            name="password"
            placeholder="Пароль"
            isPassword
          />

          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 22 }}
          >
            <Checkbox>Запомнить меня</Checkbox>

            <Link to="/forget-password">Забыли пароль</Link>
          </Row>

          <StyledButton
            block
            type="primary"
            htmlType="submit"
            style={{ marginBottom: 22 }}
            disabled={!isValid}
          >
            Вход
          </StyledButton>

          <Row justify="end">
            <Link to="/auth?tab=sign-up">Регистрация</Link>
          </Row>
        </Form>
      )}
    </Formik>
  )
}
