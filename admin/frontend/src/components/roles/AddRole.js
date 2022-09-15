import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addRole } from '../../features/roles/roleSlice'
import DashboardHOC from '../common/DashboardHOC'
import RoleForm from './RoleForm'

function AddRole() {
  const dispatch = useDispatch()
  const history = useHistory()

  const onFinish = (data) => {
    dispatch(addRole(data))
    history.push('/admin/roles')
  }
  return (
    <RoleForm newRole onFinish={onFinish} />
  )
}

export default DashboardHOC(AddRole)