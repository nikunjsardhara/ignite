import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCourses } from "../../features/course/CourseSlice";
import DashboardHOC from "../common/DashboardHOC";
function TableCourses() {
  const dispatch = useDispatch();
  let courses = useSelector((state) => state.course.courses);
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
    }
  ];

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);
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
