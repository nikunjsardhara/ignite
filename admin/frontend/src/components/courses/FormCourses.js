import { Button, notification } from "antd";
import React from "react";
import { Form, Input, InputNumber, Checkbox, SubmitButton } from "formik-antd";
import mernDashApi from "../../helpers/apiUtils";
import DashboardHOC from "../common/DashboardHOC";
import { Link, useHistory } from "react-router-dom";
import { Schema } from "./schema/courseForm";
import { Formik, ErrorMessage } from "formik";

const { TextArea } = Input;

function FormCourses() {
  let history = useHistory();
  const [loadings, setLoadings] = React.useState(false);
  const [form, setFrom] = React.useState({
    title: "",
    description: "",
    price: 100
  });

  // Notifications
  const openNotification = () => {
    notification.open({
      message: "Course Added Successfully",
      description: ""
    });
  };

  const handleSubmit = async () => {
    const res = await mernDashApi.post("/api/courses/add", form);
    if (res.data.success) {
      setFrom({ title: "", description: "", price: 100 });
      openNotification();
    }
    history.push("/admin/courses");
    setLoadings(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          description: ""
        }}
        validationSchema={Schema}
        onSubmit={(values) => {
          setLoadings(true);
          handleSubmit(values);
        }}
      >
        {({ errors, touched }) => {
          return (
            <Form>
              <div>
                <label>Title</label>
                <Input
                  name="title"
                  placeholder="Title of the course"
                  value={form.title}
                  status={touched.title && errors.title ? "error" : ""}
                  onChange={(e) =>
                    setFrom((_) => ({ ..._, title: e.target.value }))
                  }
                />
                <ErrorMessage name="title">
                  {(msg) => <div className="text-red-500">{msg}</div>}
                </ErrorMessage>
                <br />

                <label className="lab">Description</label>
                <TextArea
                  rows={4}
                  name="description"
                  status={
                    touched.description && errors.description ? "error" : ""
                  }
                  placeholder="Enter description"
                  value={form.description}
                  onChange={(e) =>
                    setFrom((_) => ({ ..._, description: e.target.value }))
                  }
                />
                <ErrorMessage name="description">
                  {(msg) => <div className="text-red-500">{msg}</div>}
                </ErrorMessage>
                <br />
              </div>

              <div className="flex space-x-4 mt-3 items-center">
                <div className="">
                  <SubmitButton loading={loadings}>Save</SubmitButton>
                </div>
                <Button type="info" className="login-form-button">
                  <Link to="/admin/courses">Back</Link>
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default DashboardHOC(FormCourses);
