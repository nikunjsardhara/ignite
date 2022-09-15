import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import UserListPage from "./components/users/UserListPage";
import SingleUser from "./components/dashboard/SingleUser/SingleUser";
import LoginForm from "./components/auth/Login";
import checkAdminAuth from "./helpers/AdminAuth";
import AddNewUser from "./components/users/AddNewUser";
import MissingPage from "./components/Error/404";
import Home from "./components/Home";
import submitDoor from "./components/submitDoor";
import DoorDataList from "./components/doorDataList/DoorDataList";
import AddRole from "./components/roles/AddRole";
import Roles from "./components/roles/Roles";
import SingleRole from "./components/roles/SingleRole";
import { isPathPermitted } from "./helpers/checkPermissions";
import { useDispatch } from "react-redux";
import { setToken } from "./features/auth/authSlice";
import DesignedDoorList from "./components/doorDataList/DesignedDoorList";
import Course from "./components/courses/course";

export const PrivateAdminRoute = ({ component: Component, path, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAdminAuth() ? (
        isPathPermitted(path) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/admin/dashboard" }} />
        )
      ) : (
        <Redirect to={{ pathname: "/admin/login" }} />
      )
    }
  />
);

const BaseRoute = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("A1_Door_Admin_token");
  React.useEffect(() => {
    if (token !== null) {
      dispatch(setToken(token));
    }
    //eslint-disable-next-line
  }, []);
  return (
    <Switch>
      <Route exact path="/admin/" component={Home} />
      <Route exact path="/admin/login" component={LoginForm} />

      <PrivateAdminRoute exact path="/admin/dashboard" component={Dashboard} />
      <PrivateAdminRoute exact path="/admin/courses" component={Course} />
      <PrivateAdminRoute exact path="/admin/users" component={UserListPage} />
      <PrivateAdminRoute
        exact
        path="/admin/add-new-user"
        component={AddNewUser}
      />
      <PrivateAdminRoute exact path="/admin/user/:id" component={SingleUser} />
      <PrivateAdminRoute exact path="/admin/roles" component={Roles} />
      <PrivateAdminRoute exact path="/admin/add-new-role" component={AddRole} />
      <PrivateAdminRoute exact path="/admin/role/:id" component={SingleRole} />
      <PrivateAdminRoute
        exact
        path="/admin/door-submissions"
        component={DoorDataList}
      />
      <PrivateAdminRoute
        exact
        path="/admin/designed-door"
        component={DesignedDoorList}
      />

      <Route exact path="/">
        <Redirect to={{ pathname: "/admin" }} />
      </Route>
      <Route exact path="/submit-door" component={submitDoor} />
      <Route component={MissingPage} />
    </Switch>
  );
};

export default BaseRoute;
