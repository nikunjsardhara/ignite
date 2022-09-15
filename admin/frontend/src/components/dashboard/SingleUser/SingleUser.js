import React, { useContext, useState, useEffect } from "react"

import DashboardHOC from "../../common/DashboardHOC"
import { Typography, Popconfirm, Button, Row, Col, Tooltip, message } from "antd"
import SingleUserStyled from "./SingleUserStyled"
// import PasswordForm from "../password/PasswordForm"
import UserForm from "../form/UserForm"
import CustomLoader from "../../common/CustomLoader"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser, disableUser, fetchSingleUser, updateUser } from "../../../features/users/userSlice"

function SingleUser(props) {
  const Loading = useSelector(state=>state.user.loading)
  const CurrentUser = useSelector(state=>state.user.currentUser)
  const currentUser = { ...CurrentUser, role: CurrentUser?.role?._id }
  const dispatch = useDispatch()
  const id = props.match.params.id

  useEffect(() => {
    dispatch(fetchSingleUser(id))
  }, [fetchSingleUser, id])

  const onFinish = async (values) => {
    values._id = CurrentUser._id
    // editUserAction(values)
   const res = await dispatch(updateUser(values))
   if(res){
    message.success('User update successfully.')
    props.history.push('/admin/users')
   }
  }

  const onConfirmDelete = () => {
    dispatch(disableUser(id))
    props.history.push("/admin/users")
  }
  const onRemoveClick = () => {
    dispatch(deleteUser({ id, items: 10 }))
    props.history.push("/admin/users")
  }

  return (
    <SingleUserStyled>
      {CurrentUser ? (
        <>
          <Typography>Edit {CurrentUser.name}'s Profile</Typography>
            <Row justify='end' gutter={[8, 16]}>
              <Col xs={4} md={3} xl={2}>
                {!CurrentUser?.enabled ? (
                  <Tooltip title='Activate this user.'>
                    <Button
                      type='primary'
                      className='float-right'
                      onClick={onConfirmDelete}
                    >
                      Activate
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title='Deactivate this user'>
                    <Button
                      className='float-right'
                      onClick={onConfirmDelete}
                      danger
                    >
                      Deactivate
                    </Button>
                  </Tooltip>
                )}
              </Col>
              <Col xs={4} md={3} xl={2}>
                <Popconfirm
                  title='Are you sure to remove this user?'
                  onConfirm={onRemoveClick}
                  okText='Remove'
                  cancelText='Cancel'
                >
                  <Button className='float-right' danger>
                    Remove
                  </Button>
                </Popconfirm>
              </Col>
            </Row>

          <UserForm
            user={currentUser}
            onFinish={onFinish}
            loading={Loading}
          />
        </>
      ) : (
        <CustomLoader
          text={"Chill out, I am trying to get some data for you"}
        />
      )}
      {/* <PasswordForm
        visible={passwordFormVisibility}
        onCreate={handlePasswordChange}
        loading={Loading}
        onCancel={() => {
          setpasswordFormVisibility(false)
        }}
        id={id}
      /> */}
    </SingleUserStyled>
  )
}

export default DashboardHOC(SingleUser)
