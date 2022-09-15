import { DeleteOutlined } from '@ant-design/icons';
import { Pagination, Popconfirm, Table, Tooltip } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux';
import { fetchDesignedDoors, removeDoorDesign } from '../../../features/doors/doorSlice';
import { isActionPermitted } from '../../../helpers/checkPermissions';
import { makeid } from '../../../helpers/makeId';
import { DESIGNED_DOOR_DELETE } from '../../../helpers/permissions';

function DesignedDoorTable({ data, page, setPage }) {
  const dispatch = useDispatch()

  const tableData = data?.result ? data?.result.map(d => ({
    ...d,
    key: Number(makeid(5))
  })) : []

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a,b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend'],
      key: 'email'
    },
    {
      title: 'File',
      dataIndex: 'fileName',
      key: 'fileName',
      render: (fileName, record) => {
        return <a href={`${record.filePath}`} target='_blank' rel='noreferrer'>
          {fileName}
        </a>
      }
    }
  ]

  const isDeletePermitted = isActionPermitted(DESIGNED_DOOR_DELETE)
  if(isDeletePermitted) columns.push({
    title: 'Action',
    render: (bool) => (
      <Popconfirm
        title="Are you sure to remove this door?"
        onConfirm={() => removeDesign(bool?._id)}
        okText="Remove"
        cancelText="Cancel"
      >
        <Tooltip title="Remove this door">
          <DeleteOutlined style={{ color: "#d22630" }} />
        </Tooltip>
      </Popconfirm>
    )
  })

  const handlePageChange = (e) => {
    setPage(e)
    let data = { 
      page: e,
      items: 10
    }
    dispatch(fetchDesignedDoors(data))
  }

  const removeDesign = (designId) => {
    let data = {
      page,
      items: 10,
      id: designId
    }
    dispatch(removeDoorDesign(data))
  }

  return (
    <>
      {data && (
        <>
          <Table
            className='clearfix'
            columns={columns}
            dataSource={tableData}
            style={{ clear: 'both' }}
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

export default DesignedDoorTable