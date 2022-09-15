import UserForm from "../dashboard/form/UserForm"
import DashboardHOC from "../common/DashboardHOC"
import { useDispatch } from "react-redux"
import { addUser } from "../../features/users/userSlice"
import { useHistory } from "react-router-dom"
import { message } from "antd"

function AddNewUser() {
  const dispatch = useDispatch()
  const history = useHistory()
  const onFinish = async (values) => {
    const res = await dispatch(addUser(values))
    if(res){
      message.success('New user created.')
      history.push('/admin/users', {replace : true})
    }
    else{
      message.error(res)
    }
  }
  return (
    <>
      <UserForm onFinish={onFinish} newUser={true} />
    </>
  )
}

export default DashboardHOC(AddNewUser)
