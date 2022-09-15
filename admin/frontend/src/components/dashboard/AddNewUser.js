import React, { useContext } from "react"
import UserForm from "./form/UserForm"
import DashboardHOC from "./DashboardHOC"
import { useDispatch } from 'react-redux'
import { addUser } from "../../features/users/userSlice"
 
function AddNewUser() {
  const dispatch = useDispatch()
  const onFinish = (values) => {
    values = { ...values, role: "62ecc524ae21e21d586fe59e" }
    dispatch(addUser(values))
  }
  return (
    <>
      <UserForm onFinish={onFinish} newUser={true} />
    </>
  )
}

export default DashboardHOC(AddNewUser)
