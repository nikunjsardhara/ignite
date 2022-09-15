import decode from 'jwt-decode';
const CheckAdminAuth = () => {
  const token = localStorage.getItem('A1_Door_Admin_token');
  if (!token) return false;
  try {
    // eslint-disable-next-line
    const { exp } = decode(token);

    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

export default CheckAdminAuth;
