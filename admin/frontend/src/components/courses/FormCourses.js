import { Button, Input } from "antd";
import React from "react";
import mernDashApi from "../../helpers/apiUtils";
import DashboardHOC from "../common/DashboardHOC";
import { Link } from "react-router-dom";
import { Schema } from "./schema/courseForm";
import { Formik, Form, Field } from "formik";

const { TextArea } = Input;

function FormCourses() {
  const [form, setFrom] = React.useState({
    title: "",
    description: "",
    price: 100
  });
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   for (const item in form) {
  //     if (!form[item]) {
  //       return alert("Please fill all the fields");
  //     }
  //   }
  //   const res = await mernDashApi.post("/api/courses/add", form);
  //   console.log(res);
  // };
  return (
    <>
      <Formik
        initialValues={{
          title: "",
          description: ""
        }}
        validationSchema={Schema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
              <label>Title</label>
              <Input
                name="title"
                placeholder="Title of the course"
                value={form.title}
                onChange={(e) =>
                  setFrom((_) => ({ ..._, title: e.target.value }))
                }
              />
              {errors.title && touched.title ? <div>{errors.title}</div> : null}
              {/* <label>Price</label>
            <Input
              placeholder="Enter Price"
              value={form.price}
              onChange={(e) =>
                setFrom((_) => {
                  let val = parseInt(e.target.value);
                  return { ..._, price: val };
                })
              }
            /> */}
              <label className="lab">Description</label>
              <TextArea
                rows={4}
                name="description"
                placeholder="Enter description"
                value={form.description}
                onChange={(e) =>
                  setFrom((_) => ({ ..._, description: e.target.value }))
                }
              />
              {errors.description && touched.description ? (
                <div>{errors.description}</div>
              ) : null}
            </div>

            <div className="flex space-x-4 mt-3 items-center">
              <div className="">
                <button
                  type="submit"
                  className="btn btn-primary cursor-pointer"
                >
                  Save
                </button>
              </div>
              <Button type="info" className="login-form-button">
                <Link to="/admin/courses">Back</Link>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default DashboardHOC(FormCourses);
