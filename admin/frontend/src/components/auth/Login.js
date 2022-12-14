import React, { useEffect } from "react"
import { Form, Input, Button, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import checkAdminAuth from "../../helpers/AdminAuth"
import { useSelector, useDispatch } from 'react-redux'
import { authReset, loginAction } from "../../features/auth/authSlice"

const LoginForm = ({ history }) => {
  const token = useSelector(state => state.auth.token)
  const loading = useSelector(state => state.auth.loading)
  const error = useSelector(state => state.auth.error)
  const errResponse = useSelector(state => state.auth.errResponse)
  const dispatch = useDispatch()
  const onFinish = (values) => {
    dispatch(loginAction(values))
  }

  useEffect(() => {
    dispatch(authReset())
  }, [])

  useEffect(() => {
    checkAdminAuth()
    if (token) {
      history.push("/admin/dashboard")
    }
  }, [token, history])

  useEffect(() => {
    if (error) {
      if(errResponse !== null){
        message.error(errResponse)
      }
    }
  }, [error, errResponse])

  return (
    <div className='test'>
      <div className='container '>
        <div>
          <div className='row justify-content-center align-items-center min-vh-100'>
            <div className='col-md-4 align-self-center text-center'>
              <h2>Welcome Back!</h2>
              <p>Input your login details to continue</p>
              <Form
                name='normal_login'
                className='login-form'
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                size='large'
              >
                <Form.Item
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className='site-form-item-icon' />}
                    placeholder='Email'
                    className='rounded-pill'
                  />
                </Form.Item>
                <Form.Item
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='Password'
                    className='rounded-pill'
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-button'
                    loading={loading}
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
