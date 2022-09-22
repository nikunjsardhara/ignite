import { Table, notification, Popconfirm } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCourses } from "../../features/course/CourseSlice";
import DashboardHOC from "../common/DashboardHOC";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import mernDashApi from "../../helpers/apiUtils";
import { BsCheckLg } from "react-icons/bs";
import InfiniteScroll from 'react-infinite-scroll-component';

function TableCourses() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [fakeState, setFakeState] = React.useState(0);
  let courses = useSelector((state) => state.course.courses);

  // Notifications
  const openNotification = () => {
    notification.open({
      message: "Course Deleted Successfully",
      description: "",
      icon: <BsCheckLg style={{ color: "#38b000" }} />
    });
  };
  const record_id = (id) => {
    history.push(`/admin/courses/edit/${id}`);
  };
  const record_id_delete = async (id) => {
    const res = await mernDashApi.post("/api/courses/delete", { id: id });
    if (res.data.success) {
      openNotification();
      setFakeState(Math.random() * 2e4);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => {
        return <span>{record?.title}</span>;
      },
      sorter: (a, b) => a.title.length - b.title.length,
      sortDirections: ["descend"]
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text, record) => {
        return <span>{record?.description}</span>;
      },
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ["descend"]
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text, record) => {
        return <span>{record?.price}</span>;
      },
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend"]
    },
    {
      title: "Edit",
      dataIndex: "edit",
      render: (text, record) => {
        return (
          <span className="w-full flex items-center justify-center ">
            <AiFillEdit
              onClick={() => record_id(record._id)}
              className="mx-auto w-[20px] h-[20px] hover:text-red-500 cursor-pointer"
            />
          </span>
        );
      },
      sortDirections: ["descend"]
    },
    {
      title: "Delete",
      dataIndex: "delete",
      render: (text, record) => {
        return (
          <span className="w-full flex items-center justify-center ">
            <Popconfirm
              title="Are you sure to remove this course?"
              onConfirm={() => {
                record_id_delete(record._id);
              }}
              okText="Remove"
              cancelText="Cancel"
            >
              <AiFillDelete className="mx-auto w-[20px] h-[20px] hover:text-red-500 cursor-pointer" />
            </Popconfirm>
          </span>
        );
      },
      sortDirections: ["descend"]
    }
  ];

  useEffect(() => {
    dispatch(fetchCourses());
  }, [fakeState]);

  return (
    <div>
      <div className="w-full flex justify-end my-3">
        <Link to="/admin/addcourse">
          <div className="btn btn-success">Add Course</div>
        </Link>
      </div>
        <Table
          className="clearfix"
          columns={columns}
          dataSource={courses}
          style={{ clear: "both" }}
          // rowKey={data}
          pagination={false}
        />
    </div>
  );
}

export default DashboardHOC(TableCourses);
