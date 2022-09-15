import React, { useContext } from "react"
import { Row, Col } from "antd"
import { Link } from "react-router-dom"
import { Form, Input, Button, Select } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"

function UserForm({ user, onFinish, changePasswordModal, loading, newUser }) {
  const roles = useSelector(state=> state.role.roles?.result)
  return (
    <>
      <Form
        name='user_details_form'
        className='login-form'
        initialValues={user}
        onFinish={onFinish}
        layout='vertical'
        size='large'
        style={{ clear: "both" }}
      >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item
              name='name'
              label='Name'
              rules={[
                {
                  required: true,
                  message: "Please input name!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder={user?.name || null}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name='surname'
              label='Surname'
              rules={[
                {
                  required: true,
                  message: "Please input Surname!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder={user?.surname || null}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={12}>
            <Form.Item
              name='email'
              label='Email'
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                type='email'
                placeholder={user?.email || null}
              />
            </Form.Item>
          </Col>
          {newUser && (
            <Col span={12}>
              <Form.Item
                name='password'
                label='Password'
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className='site-form-item-icon' />}
                  type='password'
                  placeholder={null}
                />
              </Form.Item>
            </Col>
          )}

          <Col span={12}>
            <Form.Item label='Role' name='role'>
              <Select>
                {roles?.length && roles.map(role => (
                  <Select.Option value={role._id} key={role._id}>{role.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type='primary'
            loading={loading}
            htmlType='submit'
            className='mr-2'
            disabled={loading}
          >
            Save
          </Button>
          <Button type='info' className='login-form-button'>
            <Link to='/admin/users'>Back</Link>
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default UserForm
