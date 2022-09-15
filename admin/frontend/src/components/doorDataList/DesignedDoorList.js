import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDesignedDoors } from '../../features/doors/doorSlice'
import CustomLoader from '../common/CustomLoader'
import DashboardHOC from '../common/DashboardHOC'
import DoorSubmitionStyle from './DoorSubmition_style'
import DesignedDoorTable from './table/DesignedDoorTable'
const index = '5'

function DesignedDoorList() {
  const dispatch = useDispatch()
  const designedDoors = useSelector(state => state.doors.designedDoors)
  const loading = useSelector(state => state.doors.loading)
  const [page, setPage] = useState(1)
  useEffect(() => {
    const data = {
      page,
      items: 10
    }
    dispatch(fetchDesignedDoors(data))
  }, [])

  return (
    <DoorSubmitionStyle>
      {!loading && designedDoors ? (
        <DesignedDoorTable data={designedDoors} page={page} setPage={setPage} />
      ) : <CustomLoader text={"Fetching data from database..."} />}
    </DoorSubmitionStyle>
  )
}

export default DashboardHOC(DesignedDoorList, index)