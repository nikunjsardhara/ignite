import React, { useEffect, useState } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  NotificationOutlined,
  UserOutlined
} from '@ant-design/icons';
import HeaderStyled from './HeaderStyled';
import Avatar from 'antd/lib/avatar/avatar';
import { useSelector } from 'react-redux';
const { Header } = Layout;

//Just convert name into camel case.
function camelCase(str){
      var ans = str.toLowerCase();
      return ans.split(" ").reduce((s,c)=> s + ( " " + c.charAt(0).toUpperCase()+ c.slice(1) ));
}

function PageHeader({ collapsed, toggle, history }) {
  const LoggedInUser = useSelector(state => state.user.loggedInUser)
  const [userName, setUserName] = useState()
  const handleLogout = () => {
    localStorage.removeItem('A1_Door_Admin_token');
    history.push('/admin/login');
  };
  const menuItems = [
    {
      key : '1',
      label: <span onClick={() => handleLogout()}>Log out</span>
      }
  ]
  const menu = (
    <Menu items={menuItems} />
  );

  useEffect(()=>{
    if(LoggedInUser) setUserName(camelCase(" " + LoggedInUser?.name + " " + LoggedInUser?.surname));
  }, [LoggedInUser])
  return (
    <HeaderStyled>
      <Header className="site-layout-background">
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: toggle
          }
        )}
        <div className=" float-right d-flex mr-2">
          <div className="name-header mx-3">
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <Avatar
                style={{
                  color: '#fff',
                  backgroundColor: '#d22630',
                  fontSize : '15px',
                  fontWeight: 700,
                  marginRight : '-8px'
                }}>
                {userName?.split('')[1]}
              </Avatar>
              </a>
            </Dropdown>
            <span className="name" style={{color : "#d22630", fontWeight : 600}}>{userName}</span>
          </div>
        </div>
      </Header>
    </HeaderStyled>
  );
}

export default PageHeader;
