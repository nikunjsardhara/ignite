import React, { useEffect, useState } from "react"
import DashboardHOC from "../common/DashboardHOC"
import UserTable from "./table/UserTable"
import { Link } from "react-router-dom"
import CustomLoader from "../common/CustomLoader"
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from "../../features/users/userSlice"
const index = "2"
function UserListPage() {
  const dispatch = useDispatch()
  const Users = useSelector(state=>state.user.users)
  const Loading = useSelector(state=>state.user.loading)
  const [page, setPage] = useState(1)
  useEffect(() => {
    if(!Users) {
      let data = {
        page,
        items: 10
      }
      dispatch(fetchUsers(data))
    }
    //eslint-disable-next-line
  }, [])
  return (
    <div>
      {/* isActionPermitted(USERS_CREATE) &&  */(
        <Link
          to='/admin/add-new-user'
          className='btn btn-primary float-right cursor-pointer mb-2 '
        >
          Add new user
        </Link>
      )}
      {!Loading && Users ? (
        <UserTable data={Users} page={page} setPage={setPage} />
      ) : (
        <CustomLoader text={"Fetching data from database..."} />
      )}
    </div>
  )
}

export default DashboardHOC(UserListPage, index)
