import decode from "jwt-decode";
import {
  DOOR_SUBMISSION_CREATE,
  DOOR_SUBMISSION_DELETE,
  DOOR_SUBMISSION_READ,
  DOOR_SUBMISSION_UPDATE,
  DESIGNED_DOOR_READ,
  DESIGNED_DOOR_DELETE
} from "./permissions";

const pathPermissionsMap = {
  // '/admin/users': [USERS_CREATE, USERS_READ, USERS_UPDATE, USERS_DELETE],
  // '/admin/add-new-user': [USERS_CREATE],
  // '/admin/user/:id': [USERS_UPDATE],
  // '/admin/roles': [ROLES_CREATE, ROLES_READ, ROLES_UPDATE, ROLES_DELETE],
  // '/admin/add-new-role': [ROLES_CREATE],
  // '/admin/role/:id': [ROLES_UPDATE],
  "/admin/door-submissions": [
    DOOR_SUBMISSION_CREATE,
    DOOR_SUBMISSION_READ,
    DOOR_SUBMISSION_UPDATE,
    DOOR_SUBMISSION_DELETE
  ],
  "/admin/designed-door": [DESIGNED_DOOR_READ, DESIGNED_DOOR_DELETE]
};

const superAdminPaths = [
  "/admin/users",
  "/admin/add-new-user",
  "/admin/user/:id",
  "/admin/roles",
  "/admin/add-new-role",
  "/admin/role/:id",
  "/admin/door-submissions",
  "/admin/designed-door",
  "/admin/courses",
  "/admin/addcourse",
  "/admin/courses/edit/:id"
];

export const isPathPermitted = (path = "") => {
  if (!path) return false;
  if (path === "/admin/dashboard") return true;
  if (superAdminPaths.includes(path) && isSuperAdmin()) return true;

  const userPermissions = getUserPermissions();
  const neededPermissions = pathPermissionsMap[path];
  if (!neededPermissions || !userPermissions) return false;
  const isAllowed = neededPermissions.some((perm) =>
    userPermissions.includes(perm)
  );
  return isAllowed;
};

export const isActionPermitted = (action) => {
  if (!action) return false;
  if (isSuperAdmin()) return true;
  const userPermissions = getUserPermissions();
  return userPermissions.includes(action);
};

const getUserPermissions = () => {
  const token = localStorage.getItem("A1_Door_Admin_token");
  const { permissions: userPermissions } = decode(token);
  return userPermissions;
};

export const isSuperAdmin = () => {
  const token = localStorage.getItem("A1_Door_Admin_token");
  const { isSuperAdmin } = decode(token);
  return isSuperAdmin;
};
