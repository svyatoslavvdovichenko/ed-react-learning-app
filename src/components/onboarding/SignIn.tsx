import { Link, useHistory } from 'react-router-dom'
import { Checkbox, Row } from 'antd'
import { Formik, Form } from 'formik'
import { SingInSchema } from '../../forms/validators'
import { InputField } from '../forms/InputField'
import { StyledButton } from '../common/StyledComponents'
import { useActions } from '../../hooks/useActions'
import { useApi } from '../../hooks/useApi'
import { useEffect, useState } from 'react'
import { setAuthHeader } from '../../hocs/ApiProvider'
import { sendErrorNotification } from '../../utils/systemNotification'
import { Loader } from '../common/Loader'

export const SignIn = () => {
  const [state, setState] = useState({ isLoading: true })
  
  const navigate = useHistory()
  const { setUser } = useActions();

  const api = useApi()

  const getUserProfile = (): Promise<void> =>
    api
      .get('user/profile/')
      .then(({ data }) => {

        setState(() => ({
          isLoading: false
        }))
        setUser({ user: data });
      })
      .catch(() => {
        setState(() => ({ isLoading: false }))
        navigate.push('/auth')
      })      

  useEffect(() => {
    setAuthHeader(api, localStorage.authToken)
  
    getUserProfile()
  }, [])

  const onLogin = (values: any) => { 
    
    api
      .post('login/', { ...values })
      .then(({ data }) => {
        if (data) {
          localStorage.setItem('authToken', data.token)
          setAuthHeader(api, data.token)
          getUserProfile().then(() => {
            navigate.push('/dashboard');
          })
        }
      })
      .catch(() => {
        sendErrorNotification('Пользователь с введенными данными не найден')
      })
  }
  
  if (state.isLoading) {
    return <Loader fullScreen />
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
