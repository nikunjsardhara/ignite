import React from "react"
import StatsCard from "../card/StatsCard"
import UserStatsStyled from "./UserStatsStyled"
import { TbDoorOff, TbDoor } from "react-icons/tb";
import { BsDoorOpen } from "react-icons/bs";
function DoorStats({ loading, doors }) {
  const colors = ["#000000", "#DBAE58", "#AC3E31"]
  const icons = [
    <BsDoorOpen />,
    <TbDoor />,
    <TbDoorOff />
  ]
  return (
    <UserStatsStyled>
      {doors.map((item, key) => (
        <StatsCard
          loading={loading}
          stats={item}
          color={colors[key]}
          icon={icons[key]}
          key={key}
        />
      ))}
    </UserStatsStyled>
  )
}

export default DoorStats
