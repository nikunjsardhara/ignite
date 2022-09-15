import React, { useEffect, useState } from "react"
import DashboardHOC from "../common/DashboardHOC"
import DoorDataTable from "./table/DoorDataTable"
import CustomLoader from "../common/CustomLoader"
import DoorSubmitionStyle from "./DoorSubmition_style"
import { useSelector, useDispatch } from 'react-redux'
import { fetchDoors } from "../../features/doors/doorSlice"
const index = "4"
function DoorDataList() {
  const Doors = useSelector(state => state.doors)
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  useEffect(() => {
    const data = {
      items: 10,
      page: page
    }
    dispatch(fetchDoors(data))
    //eslint-disable-next-line
  }, [])
  return (
    <div>
      <DoorSubmitionStyle>
      {!Doors.loading && Doors.doors ? (
        <DoorDataTable data={Doors.doors} setPage={setPage} page={page} />
      ) : (
        <CustomLoader text={"Fetching data from database..."} />
      )}
      </DoorSubmitionStyle>
    </div>

  )
}

export default DashboardHOC(DoorDataList, index)
