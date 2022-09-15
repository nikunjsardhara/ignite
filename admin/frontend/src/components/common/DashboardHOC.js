import React, { useState } from 'react';
import Sidebar from './Sidebar';
import PageHeader from './PageHeader';
import { Layout } from 'antd';
import CustomFooter from './Footer';
import { useSelector } from 'react-redux';

function DashboardHOC(Component, index) {
  return function DashboardCustomHoc(props) {
    const [collapsed, setCollapsed] = useState(true);
    const handleSetCollapsed = () => {
      setCollapsed(!collapsed);
    };
    const LoggedInUser = useSelector(state=>state.user.loggedInUser)

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar
          index={index}
          collapsed={collapsed}
          loggedInUserId={LoggedInUser ? LoggedInUser._id : null}
        />
        <Layout className="site-layout">
          <PageHeader
            history={props.history}
            collapsed={collapsed}
            toggle={handleSetCollapsed}
          />
          <div className="container">
            <Component {...props} />
          </div>
          <CustomFooter />
        </Layout>
      </Layout>
    );
  };
}

export default DashboardHOC;
