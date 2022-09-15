import { Button, Col, Popconfirm, Row, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { editRole, fetchSingleRole, removeRole } from '../../features/roles/roleSlice'
import CustomLoader from '../common/CustomLoader'
import DashboardHOC from '../common/DashboardHOC'
import RoleForm from './RoleForm'

function SingleRole(props) {
  const dispatch = useDispatch()
  const currentRole = useSelector(state => state.role.currentRole)
  const loading = useSelector(state => state.role.loading)
  const roleId = props.match.params.id
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchSingleRole(roleId))
  }, [fetchSingleRole, roleId])

  const onFinish = (data) => {
    dispatch(editRole({ id: roleId, ...data }))
    history.push('/admin/roles')
  }
  const onRemoveClick = () => {
    dispatch(removeRole({ id: roleId, items: 10 }))
    props.history.push("/admin/roles")
  }

  return (
    <>
      {currentRole ? (
        <>
          <Typography>Edit Role {currentRole.name}</Typography>
          <Row justify='end' gutter={[8, 16]}>
            <Col span={2}>
              <Popconfirm
                title='Are you sure to remove this role?'
                onConfirm={onRemoveClick}
                okText='Remove'
                cancelText='Cancel'
              >
                <Button className='float-right' danger block>
                  Remove
                </Button>
              </Popconfirm>
            </Col>
          </Row>
          <RoleForm 
            role={currentRole}
            loading={loading}
            onFinish={onFinish}
          />
        </>
      ) : (
        <CustomLoader
          text={"Chill out, I am trying to get some data for you"}
        />
      )}
    </>
  )
}

export default DashboardHOC(SingleRole)