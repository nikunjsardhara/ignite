import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  CloudUploadOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "./../../assets/a1-logo.png";
import SidebarStyled from "./SidebarStyled";
import { isPathPermitted, isSuperAdmin } from "../../helpers/checkPermissions";
import { BsFilePdf } from "react-icons/bs";
import { IoIosPaper } from "react-icons/io";

const { Sider } = Layout;

function Sidebar({ collapsed, index, loggedInUserId }) {
  const menuItems = [];
  const allMenuItems = {
    dashboard: {
      key: "1",
      label: <Link to="/admin/dashboard"> Dashboard </Link>,
      icon: <HomeOutlined />
    },
    courses: {
      key: "2",
      label: <Link to="/admin/courses">Courses</Link>,
      icon: <IoIosPaper />
    },
    users: {
      key: "3",
      label: <Link to="/admin/users">Users</Link>,
      icon: <UserOutlined />
    },
    roles: {
      key: "4",
      label: <Link to="/admin/roles">Roles</Link>,
      icon: <UsergroupAddOutlined />
    },
    "door-submissions": {
      key: "5",
      label: <Link to={`/admin/door-submissions`}>Door Submissions</Link>,
      icon: <CloudUploadOutlined />
    },
    "designed-door": {
      key: "6",
      label: <Link to={`/admin/designed-door`}>User-Designed Doors</Link>,
      icon: <BsFilePdf />
    },
    settings: {
      key: "7",
      label: <Link to={`/admin/user/${loggedInUserId}`}>Account Settings</Link>,
      icon: <SettingOutlined />
    }
  };

  Object.entries(allMenuItems).map(([path, item]) => {
    switch (path) {
      case "users":
      case "roles":
      case "courses":
      case "door-submissions":
      case "designed-door":
        if (isPathPermitted(`/admin/${path}`)) menuItems.push(item);
        break;
      case "dashboard":
      case "settings":
        //Only superadmins can change users profiles.
        if ((isSuperAdmin() && path == "settings") || path == "dashboard")
          menuItems.push(item);
        break;
      default:
        break;
    }
  });
  //
  return (
    <SidebarStyled collapsed={collapsed}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        // style={{
        //   overflow: 'auto',
        //   height: '100vh',
        //   position: 'fixed',
        //   left: 0
        // }}
      >
        <div className="logo">
          <img src={logo} height={25} width={60} alt="" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className="sidebar-items"
          defaultSelectedKeys={[index]}
          items={menuItems}
        />
      </Sider>
    </SidebarStyled>
  );
}

export default Sidebar;
