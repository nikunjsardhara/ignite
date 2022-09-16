import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Col, Pagination, Popconfirm, Row, Table, Tooltip } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { fetchRoles, removeRole } from '../../features/roles/roleSlice'
import { isActionPermitted, isSuperAdmin } from '../../helpers/checkPermissions'
import { makeid } from '../../helpers/makeId'
import { ROLES_DELETE, ROLES_UPDATE } from '../../helpers/permissions'

function RolesTable({ data, page, setPage }) {
  const tableData = data?.result ? data.result.map((data)=>{
    return {...data, key : Number(makeid(5))}
  }) : []
  const dispatch = useDispatch()
  const history = useHistory()
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => {
        return /* isActionPermitted(ROLES_UPDATE) */ isSuperAdmin()
        ? ( <Link to={`/admin/role/${record._id}`}>{text}</Link>)
        : ( <span>{text}</span> )
      },
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend']
    },
  ]

  /* const isUpdatePermitted = isActionPermitted(ROLES_UPDATE)
  const isDeletePermitted = isActionPermitted(ROLES_DELETE)
  if(isUpdatePermitted || isDeletePermitted) */ 
  if(isSuperAdmin()) columns.push({
    title: "Action",
    render: (bool) => (
      <>
        <Row>
          {/* isUpdatePermitted && */ (
            <Col span={4}>
              <Tooltip title='Edit this role'>
                <EditOutlined onClick={() => history.push(`/admin/role/${bool._id}`)} />
              </Tooltip>
            </Col>
          )}
          {/* isDeletePermitted && */ (
            <Col span={12}>
              <Popconfirm
                title='Are you sure to remove this role?'
                onConfirm={() => {
                  let data = {
                    id: bool._id,
                    page,
                    items: 10
                  }
                  dispatch(removeRole(data))
                }}
                okText='Remove'
                cancelText='Cancel'
              >
                <Tooltip title='Remove this role'>
                  <DeleteOutlined style={{ color: "red" }} />
                </Tooltip>
              </Popconfirm>
            </Col>
          )}
        </Row>
      </>
    ),
  })

  const handlePageChange = (e) => {
    setPage(e)
    let data = {
      page: e,
      items: 10
    }
    dispatch(fetchRoles(data))
  }
  console.log(tableData);
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

export default RolesTable