import { Button, notification } from "antd";
import React from "react";
import { Form, Input, InputNumber, Checkbox, SubmitButton } from "formik-antd";
import mernDashApi from "../../helpers/apiUtils";
import DashboardHOC from "../common/DashboardHOC";
import { Link, useHistory } from "react-router-dom";
import { Schema } from "./schema/courseForm";
import { Formik, ErrorMessage, FieldArray, Field } from "formik";
import { BsCheckLg } from "react-icons/bs";

const { TextArea } = Input;

function FormCourses() {
  let history = useHistory();
  const [loadings, setLoadings] = React.useState(false);
  const [form, setFrom] = React.useState({
    title: "",
    description: "",
    price: ""
  });
  // Notifications
  const openNotification = () => {
    notification.open({
      message: "Course Added Successfully",
      description: "",
      type: "success",
      icon: <BsCheckLg style={{ color: "#38b000" }} />
    });
  };

  const handleSubmit = async (values) => {
    const res = await mernDashApi.post("/api/courses/add", values);
    if (res.data.success) {
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
          description: "",
          price: "",
          Playlist: [
            {
              _title: "",
              video_url: "",
              time_duration: "",
              resources: ""
            }
          ]
        }}
        validationSchema={Schema}
        onSubmit={(values) => {
          setLoadings(true);
          if (values.Playlist) {
            delete values.Playlist;
          }
          handleSubmit(values);
        }}
      >
        {({ errors, touched, values }) => {
          return (
            <Form>
              <h1 className="text-[2rem] font-semibold my-2">
                Basic Information
              </h1>
              <div className="space-y-2 transition-all mt-4">
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

                <label className="lab">Price</label>
                <br />
                <InputNumber
                  name="price"
                  status={touched.price && errors.price ? "error" : ""}
                  placeholder="Enter price"
                  className="w-[200px]"
                  controls={false}
                  value={form.price}
                  onChange={(e) => {
                    setFrom((_) => ({ ..._, price: e }));
                  }}
                />
                <ErrorMessage name="price">
                  {(msg) => <div className="text-red-500">{msg}</div>}
                </ErrorMessage>
                <br />
              </div>
              <h1 className="text-[2rem] font-semibold my-2 mt-4">Playlist</h1>
              <div>
                <FieldArray name="Playlist">
                  {({ insert, remove, push }) => (
                    <div>
                      {values.Playlist.length > 0 &&
                        values.Playlist.map((playlist, index) => (
                          <div key={index} className="mt-4 bg-white px-3 py-3 rounded-md">
                            <div className="space-y-2 transition-all flex flex-row justify-between items-center space-x-3">
                              <div className="flex flex-col w-full mt-2">
                                <label>Title</label>
                                <Field
                                  name={`playlist.${index}._title`}
                                  placeholder="Title of the course"
                                  component={MyInput}
                                />
                              </div>
                              <div className="flex flex-col w-full">
                                <label>Video URL</label>
                                <Field
                                  name={`playlist.${index}.video_url`}
                                  placeholder="Enter URL"
                                  component={MyInput}
                                />
                              </div>
                              <div className="flex flex-col w-full">
                                <label>Time Duration</label>
                                <Field
                                  name={`playlist.${index}.time_duration`}
                                  placeholder="Enter Duration(2:45)"
                                  component={MyInput}
                                />
                              </div>
                              <div className="flex flex-col w-full">
                                <label>Resources</label>
                                <Field
                                  name={`playlist.${index}.resources`}
                                  placeholder="url1, url2, url3"
                                  component={MyInput}
                                />
                              </div>
                              <div className="flex flex-row space-x-2 select-none transition-all">
                                <div
                                  className="bg-red-600 hover:bg-red-800 shadow-sm text-center text-white text-[1.5rem] rounded-md cursor-pointer px-3 py-1"
                                  onClick={() => {
                                    if (index >= 1) {
                                      remove(index);
                                    }
                                  }}
                                >
                                  -
                                </div>
                                <div
                                  className="bg-red-600 text-center hover:bg-red-800 shadow-sm text-white text-[1.5rem] rounded-md cursor-pointer px-3 py-1"
                                  onClick={() => push(index, "")}
                                >
                                  +
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </FieldArray>
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

const MyInput = ({ field, form, ...props }) => {
  return <Input {...field} {...props} className="w-[100%]" />;
};

export default DashboardHOC(FormCourses);
