import { UserOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row, Select } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import permissions from '../../helpers/permissions'

function RoleForm({ role, loading, onFinish }) {
  return (
    <>
      <Form
        name='role_details_form'
        className='login-form'
        initialValues={role}
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
                placeholder={role?.name || null}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='permissions' label='Permissions'>
              <Select mode='tags'>
                {permissions.map(p => (
                  <Select.Option key={p}></Select.Option>
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
            <Link to='/admin/roles'>Back</Link>
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default RoleForm