import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isActionPermitted } from '../../helpers/checkPermissions'
import { ROLES_CREATE } from '../../helpers/permissions'
import CustomLoader from '../common/CustomLoader'
import DashboardHOC from '../common/DashboardHOC'
import RolesTable from './RolesTable'
import { fetchRoles } from '../../features/roles/roleSlice'
import { useDispatch, useSelector } from 'react-redux'
const index = '3'

const Roles = () => {
  const dispatch = useDispatch()
  const roles = useSelector(state => state.role.roles)
  const loading = useSelector(state => state.role.loading)
  const [page, setPage] = useState(1)
  useEffect(() => {
    let data = {
      page,
      items: 10
    }
    dispatch(fetchRoles(data))
  }, [])
  return (
    <div>
      {/* isActionPermitted(ROLES_CREATE) && */ (
        <Link
          to='/admin/add-new-role'
          className='btn btn-primary float-right cursor-pointer mb-2 '
        >
          Add new role
        </Link>
      )}
      {!loading && roles ? (
        <RolesTable data={roles} page={page} setPage={setPage} />
      ) : (
        <CustomLoader text={"Getting roles from DB! Hold on gee..."} />
      )}
    </div>
  )
}

export default DashboardHOC(Roles, index)