import React from "react"

import { Table, Tooltip, Popconfirm, Col, Row, Pagination } from "antd"
import { Link, useHistory } from "react-router-dom"
import {
  UserDeleteOutlined,
  UserAddOutlined,
  DeleteOutlined,
} from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { deleteUser, disableUser, fetchSingleUser, fetchUsers } from "../../../features/users/userSlice"
import { isActionPermitted, isSuperAdmin } from "../../../helpers/checkPermissions"
import { USERS_DELETE, USERS_UPDATE } from "../../../helpers/permissions"
import { makeid } from "../../../helpers/makeId"

function UserTable({ data, page, setPage }) {
  const tableData = data?.result ? data?.result.map((data)=>{
    return {...data, key : Number(makeid(5))}
  }) : []
  const dispatch = useDispatch()
  const history = useHistory()
  const deactivateUser = (bool) => {
    dispatch(disableUser(bool._id))
  }

  const singleUserNav = async (record) => {
    const res = await dispatch(fetchSingleUser(record._id));
    if(res){
      history.push(`/admin/user/${record._id}`)
    }
  }

  const handlePageChange = (e) => {
    setPage(e);
    var data = {
      page: e,
      items: 10
    };
    dispatch(fetchUsers(data))
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return /* isActionPermitted(USERS_UPDATE) */ isSuperAdmin()
          ? (<span style={{cursor : 'pointer', color : '#d22630'}} onClick={(e)=>{singleUserNav(record)}}>{text}</span>) 
          : (<span>{text}</span>)
      },
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role) => role?.name,
      key: "role",

      // This is basic filter the role...

      // filters: [
      //   {
      //     text: 'Member',
      //     value: 'member'
      //   },
      //   {
      //     text: 'Admin',
      //     value: 'admin'
      //   },
      //   {
      //     text: 'Staff',
      //     value: 'staff'
      //   }
      // ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value, record) => record.role.indexOf(value) === 0
    },
    {
      title: "email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
      responsive: ["md"],
      key: "email",
    },
  ]
  /* const isUpdatePermitted = isActionPermitted(USERS_UPDATE)
  const isDeletePermitted = isActionPermitted(USERS_DELETE)
  if(isUpdatePermitted || isDeletePermitted) */ 
  if(isSuperAdmin()) columns.push({
    title: "Action",
    render: (bool) => (
      <>
        <Row>
          {/* isUpdatePermitted && */ (
            <Col span={4}>
              {!bool?.enabled ? (
                <Tooltip title='Activate this user.'>
                  <UserDeleteOutlined
                    style={{ color: "green" }}
                    onClick={() => {
                      deactivateUser(bool)
                    }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title='Deactivate this user'>
                  <UserAddOutlined
                    style={{ color: "red" }}
                    onClick={() => {
                      deactivateUser(bool)
                    }}
                  />
                </Tooltip>
              )}
            </Col>
          )}
          {/* isDeletePermitted && */ (
            <Col span={12}>
              <Popconfirm
                title='Are you sure to remove this user?'
                onConfirm={() => {
                  let data = { page, items: 10, id: bool._id }
                  dispatch(deleteUser(data))
                }}
                // onCancel={cancel}
                okText='Remove'
                cancelText='Cancel'
              >
                <Tooltip title='Remove this user'>
                  <DeleteOutlined style={{ color: "red" }} />
                </Tooltip>
              </Popconfirm>
            </Col>
          )}
        </Row>
      </>
    ),
    key: "Action",
  })
  return (
    <>
      {data && (
        <>
          <Table
            className='clearfix'
            columns={columns}
            dataSource={tableData}
            style={{ clear: "both" }}
            rowKey={data}
            pagination={false}
          />
          <Pagination
            current={+data?.pagination?.page}
            total={data?.pagination?.count}
            pageSize={10}
            onChange={handlePageChange}
          />
        </>
      )}
    </>
  )
}

export default UserTable
