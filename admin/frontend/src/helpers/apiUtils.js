import axios from "axios"

const mernDashApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`
})
mernDashApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem("A1_Door_Admin_token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default mernDashApi
