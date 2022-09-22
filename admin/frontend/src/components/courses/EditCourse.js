import React, { useEffect, useState } from "react";
import mernDashApi from "../../helpers/apiUtils";
import DashboardHOC from "../common/DashboardHOC";
import { Link } from "react-router-dom";
import { Schema } from "./schema/courseForm";
import { Form, Input, InputNumber, Checkbox, SubmitButton } from "formik-antd";
import { Formik, ErrorMessage } from "formik";
import TextArea from "antd/lib/input/TextArea";
import { Button, notification } from "antd";
import { BsCheckLg } from "react-icons/bs";
const INF = 2398490;

function EditCourse(props) {
  const [form, setFrom] = useState({
    title: "",
    description: "",
    price: 100
  });

  // Notifications
  const openNotification = () => {
    notification.open({
      message: "Course Updated Successfully",
      description: "", 
      icon: <BsCheckLg style={{ color: "#38b000" }} />,
    });
  };

  useEffect(() => {
    (async () => {
      const res = await mernDashApi.post("/api/courses/getcourse", {
        id: props.match.params.id
      });
      if (res?.data?.success) {
        setFrom({
          title: res.data.courses[0]?.title,
          description: res.data.courses[0]?.description,
          price: res.data.courses[0]?.price
        });
      }
    })();
  }, []);

  const handleSubmit = async (values) => {
    const res = await mernDashApi.post("/api/courses/update", {
      ...values,
      id: props.match.params.id
    });
    if (res.data.success) {
      openNotification();
      props.history.push("/admin/courses");
    }
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={{
          title: form.title,
          description: form.description
        }}
        validationSchema={Schema}
        onSubmit={async (values) => {
          await handleSubmit(values);
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
                  <SubmitButton>Save</SubmitButton>
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

export default DashboardHOC(EditCourse, INF);
