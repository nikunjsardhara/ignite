import React, { useState } from "react";

import { Table, Tooltip, Popconfirm, Col, Row, Pagination } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import AttributesTable from "./AttributesTable";
import { FiCheck, FiEdit, FiX } from "react-icons/fi";
import { MdOpenInNew } from 'react-icons/md'
import { isActionPermitted } from "../../../helpers/checkPermissions";
import { DOOR_SUBMISSION_DELETE, DOOR_SUBMISSION_UPDATE } from "../../../helpers/permissions";
import { approveDoor, fetchDoors, removeDoor } from "../../../features/doors/doorSlice";
import { useSelector, useDispatch } from 'react-redux'
import { makeid } from "../../../helpers/makeId";

function DoorDataTable({ data, setPage, page }) {
  const tableData = data?.result?.map((data)=>{
    return {...data, key : Number(makeid(5))}
  })
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const ErrResponse = useSelector(state=>state.doors.errResponse)
    const dispatch = useDispatch()
  const approvingUser = async (bool) => {
    let approveData = {
      _id: bool._id,
      isApproved: `${!bool.isApproved}`
    }
    dispatch(approveDoor(approveData))
  };

  const deleteDoor = (bool) => {
    var pageData = {
      page: page,
      items: 10,
      _id: bool._id
    };
    dispatch(removeDoor(pageData));
  };

  const handlePageChange = (e) => {
    setPage(e);
    var data = {
      page: e,
      items: 10
    };
    dispatch(fetchDoors(data))
  };

  const onTableRowExpand = (expanded, record) => {
    const keys = [];
    if (expanded) {
      keys.push(record._id);
    }
    setExpandedRowKeys(keys);
  };

  const toggleEditMode = (e) => {
    setExpandedRowKeys((oldKey) => [...oldKey, e._id]);
  };
  const expandedRowRender = (e) => {
    return (
      <Row gutter={[16, 16]} justify="space-around" align="top">
        <Col span={8}>
          <img
            src={e.filePath}
            style={{ width: "90%" }}
            alt={e.fileName}
          />
        </Col>
        <Col span={16}>
          {/* <Table columns={[{ title : (render) => {return <span className="inner-table-head">Attributes</span>}, dataIndex: 'name', key: 'name', render: (text) => (<span>{text}</span>) , width:'50%'},
            { title : (render) => {return <span className="inner-table-head">Value</span>}, dataIndex: 'value', key: 'value',width : '50%', render: (text) => text}]} dataSource={e.attributes} 
            pagination={false}/> */}
          <AttributesTable tData={e.attributes} rowId={e._id} isUpdatePermitted={isUpdatePermitted} />
        </Col>
      </Row>
    );
  };
  const columns = [
    {
      title: (render) => {
        return <span className="inner-table-head">Image</span>;
      },
      dataIndex: "filePath",
      render: (text, record) => {
        return (
          <div className='d-flex align-items-center' style={{ gap: '0.5rem' }}>
            <img src={text} alt="door" width={76} />
            <a href={text} target='_blank' rel='noreferrer'><MdOpenInNew /></a>
          </div>
        );
      },
      key: "filePath"
    },
    {
      title: (render) => {
        return <span className="inner-table-head">E-mail</span>;
      },
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
      responsive: ["md"],
      key: "email"
    },
    {
      title: (render) => {
        return <span className="inner-table-head">Approvers</span>;
      },
      render: (bool) => {
        return (
          <>
            <div className={bool?.isApproved ? "isApproved" : "disApproved"}>
              {bool?.isApproved ? "Approved" : "Disapproved"}
            </div>
          </>
        );
      },
      key: (bool) => {
        return bool;
      }
    }
  ];

  const handleEdit = (record) => {
    let isOpened = expandedRowKeys.includes(record._id)
    onTableRowExpand(!isOpened, record)
  }

  const isUpdatePermitted = isActionPermitted(DOOR_SUBMISSION_UPDATE)
  const isDeletePermitted = isActionPermitted(DOOR_SUBMISSION_DELETE)
  if(isUpdatePermitted || isDeletePermitted) columns.push({
    title: (render) => {
      return <span className="inner-table-head">Action</span>;
    },
    render: (bool) => (
      <>
        <Row>
          <Row span={4}>
            {isUpdatePermitted && (
              <>
              <div className="inner-table-icons">
              <Tooltip
                title="Edit this door!"
                onClick={() => handleEdit(bool)}
              >
                <FiEdit />
              </Tooltip>
            </div>
              <div className="inner-table-icons">
                {!bool?.isApproved ? (
                  <Tooltip
                    title="Approve this door!"
                    onClick={() => {
                      approvingUser(bool);
                    }}
                  >
                    <FiCheck className="approveIcon" />
                  </Tooltip>
                ) : (
                  <Tooltip
                    title="Disapprove this door!"
                    onClick={() => {
                      approvingUser(bool);
                    }}
                  >
                    <FiX className="disApproveIcon" />
                  </Tooltip>
                )}
              </div>
              </>
            )}
            {isDeletePermitted && (
              <Popconfirm
                title="Are you sure to remove this door?"
                onConfirm={() => {
                  deleteDoor(bool);
                }}
                okText="Remove"
                cancelText="Cancel"
              >
                <Tooltip title="Remove this door">
                  <DeleteOutlined style={{ color: "#d22630" }} />
                </Tooltip>
              </Popconfirm>
            )}
          </Row>
        </Row>
      </>
    ),
    key: (bool) => {
      return bool;
    }
  })

  return (
    <>
      {data && (
        <>
          <Table
            className="clearfix"
            columns={columns}
            dataSource={tableData}
            style={{ clear: "both" }}
            rowKey={(d) => {
              return d._id;
            }}
            pagination={false}
            expandedRowKeys={expandedRowKeys}
            onExpand={onTableRowExpand}
            expandable={{
              expandedRowRender: expandedRowRender,
              rowExpandable: (record) => true
            }}
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
  );
}

export default DoorDataTable;