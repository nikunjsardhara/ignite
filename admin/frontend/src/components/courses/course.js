import React from "react";
import DashboardHOC from "../common/DashboardHOC";
import FormCourses from "./FormCourses";
import CourseStyled from "./styles/CourseStyled";
import TableCourses from "./TableCourses";

function Course() {

  return (
    <div>
      <CourseStyled>
        <FormCourses />
        <TableCourses />
      </CourseStyled>
    </div>
  );
}

export default DashboardHOC(Course);
