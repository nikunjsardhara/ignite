import React from "react"
import StatsCard from "../card/StatsCard"
import UserStatsStyled from "./UserStatsStyled"
import { GiClosedDoors } from "react-icons/gi";
function DesignDoorStats({ loading, doors }) {
  const colors = ["#4CB5F5"]
  const icons = [
   <GiClosedDoors />
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

export default DesignDoorStats
