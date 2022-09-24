import { Table, notification, Popconfirm } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DashboardHOC from "../common/DashboardHOC";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import mernDashApi from "../../helpers/apiUtils";
import { BsCheckLg } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import { Input } from "antd";
import Loading from "./Loading";
const { Search } = Input;

function TableCourses() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [fakeState, setFakeState] = React.useState(0);
  // let courses = useSelector((state) => state.course.courses);
  const [courses, setCourses] = React.useState([]);

  // InfiniteScroll
  const [item, setItem] = React.useState(10);
  const [hasMore, setHasMore] = React.useState(true);

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
    (async () => {
      try {
        setItem(item + 10);
        const res = await mernDashApi.post("/api/courses/getcourseslimit", {
          limit: item
        });
        if (res?.data?.courses.length === 0) return setHasMore(false);
        setCourses((oldArray) => {
          return [...oldArray, ...res.data.courses];
        });
      } catch (error) {
        let errMsg = error?.response?.data?.message;
        dispatch(setCourses([]));
      }
    })();
  }, [fakeState]);

  const onSearch = async (value) => {
    (async () => {
      try {
        const res = await mernDashApi.post("/api/courses/searchcourses", {
          word: value
        });
        console.log(res?.data?.courses.length);
        if (res?.data?.courses.length < 10) {
          setHasMore(false);
        }
        setCourses(res?.data?.courses);
      } catch (error) {
        let errMsg = error?.response?.data?.message;
        setCourses([]);
      }
    })();
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setFakeState(Math.random() * 2e4);
    }, 1500);
  };

  return (
    <div>
      <div className="w-full flex justify-between my-3">
        <div>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{
              width: 300
            }}
          />
        </div>
        <Link to="/admin/addcourse">
          <div className="btn btn-success">Add Course</div>
        </Link>
      </div>
      <InfiniteScroll
        dataLength={item}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loading />}
      >
        <Table
          className="clearfix"
          columns={columns}
          dataSource={courses}
          style={{ clear: "both" }}
          // rowKey={data}
          pagination={false}
        />
      </InfiniteScroll>
    </div>
  );
}

export default DashboardHOC(TableCourses);
