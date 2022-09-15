import React, { useState, useEffect } from "react"
import UserStats from "./UserStats/UserStats"
import DoorsStats from "./UserStats/DoorsStats"
import { Typography } from "antd"
//eslint-disable-next-line
import { Doughnut, } from "react-chartjs-2"
import DashboardHOC from "../common/DashboardHOC"
import DashboardStyled from "./dashboardStyle"
import {useDispatch, useSelector} from 'react-redux'
import { fetchLoggedInUser, fetchUsers } from "../../features/users/userSlice"
import { fetchRoles } from "../../features/roles/roleSlice"
import { fetchDesignedDoors, fetchDoors } from "../../features/doors/doorSlice"
import DesignDoorStats from "./UserStats/DesignDoorsStats"
const { Title } = Typography
const index = "1"
function Dashboard() {
  const Users = useSelector(state => state.user.users?.result)
  const Doors = useSelector(state => state.doors.doors?.result)
  const designDoors = useSelector(state => state.doors.designedDoors?.result)
  const Loading = useSelector(state => state.user.loading)
  const [userObj, setuserObj] = useState()
  const [doorsObj, setdoorsObj] = useState()
  const [designDoorsObj, setDesignDoorsObj] = useState()
  //eslint-disable-next-line
  const [doughnutStateData, setdoughnutStateData] = useState()
  const dispatch = useDispatch()
  const DoughnutData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255,99,132,1)"],
        borderWidth: 1,
      },
    ],
  }

  const getUsersData = () => {
    const activeUsers = Users
      ? Users.filter((user) => user?.enabled === true).length
      : 0

    const inActiveUsers = Users ? Users.length - activeUsers : 0
    const userObj = [
      { name: "Total Users", stats: Users ? Users.length : 0 },
      { name: "Active Users", stats: activeUsers },
      { name: "Inactive users", stats: inActiveUsers },
    ]
    DoughnutData.datasets[0].data.push(activeUsers)
    DoughnutData.datasets[0].data.push(inActiveUsers)
    setdoughnutStateData(DoughnutData)

    return userObj
  }

  const getDoorsData = () => {
    const activeDoors = Doors
      ? Doors.filter((door) => door?.isApproved === true).length
      : 0

    const disapprovedDoors = Doors ? Doors.length - activeDoors : 0
    const doorObj = [
      { name: "Total Doors", stats: Doors ? Doors.length : 0 },
      { name: "Approved Doors", stats: activeDoors },
      { name: "Disapproved Doors", stats: disapprovedDoors },
    ]
    return doorObj
  }

  const getDesignedDoorsData = () => {
    const designDoorObj = [
      { name: "Total Designed Doors", stats: designDoors ? designDoors.length : 0 },
    ]
    return designDoorObj
  }

  useEffect(() => {
    setuserObj(getUsersData())
  }, [Users])
  useEffect(() => {
    setdoorsObj(getDoorsData())
  }, [Doors])
  useEffect(() => {
    setDesignDoorsObj(getDesignedDoorsData())
  }, [designDoors])

  useEffect(() => {
    dispatch(fetchLoggedInUser())
    let data = {
      page : 1,
      items: 10
    }
    dispatch(fetchUsers(data))
    dispatch(fetchRoles(data))
    dispatch(fetchDoors(data))
    dispatch(fetchDesignedDoors(data))
    //eslint-disable-next-line
  }, [])

  return (
    <DashboardStyled>
    <div className='container'>
      <Title>Dashboard</Title>
      <div className="data-container">
        {/* status-cards  */}
        {userObj && (
            <div className="status-container">
              <UserStats users={userObj} loading={Loading} />
            </div>
        )}
        {doorsObj && (
            <div className="status-container">
              <DoorsStats doors={doorsObj} loading={Loading} />
            </div>
        )}
        {designDoorsObj && (
            <div className="status-container">
              <DesignDoorStats doors={designDoorsObj} loading={Loading} />
            </div>
        )}
        {/* Doughnut-chart */}
        {/* {isPathPermitted(`/admin/users`) && (
          <div className="chart-container">
          <Card title='Active Users Vs Inactive Users '>
            {doughnutStateData ? (
              <>
                <Spin spinning={Loading}>
                  <Doughnut data={doughnutStateData} width={100} height={115} />
                </Spin>
              </>
            ) : null}
          </Card>
        </div>
        )}
         */}
      </div>
</div>
</DashboardStyled>
  )
}

export default DashboardHOC(Dashboard, index)
