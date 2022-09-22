import { Button, notification } from "antd";
import React, { useState } from "react";
import { Form, Input, InputNumber, Checkbox, SubmitButton } from "formik-antd";
import mernDashApi from "../../helpers/apiUtils";
import DashboardHOC from "../common/DashboardHOC";
import { Link, useHistory } from "react-router-dom";
import { Schema } from "./schema/courseForm";
import { Formik, ErrorMessage, FieldArray, Field, getIn } from "formik";
import { BsCheckLg } from "react-icons/bs";
import Cleave from "cleave.js/react";

const { TextArea } = Input;

function FormCourses() {
  let history = useHistory();
  const [loadings, setLoadings] = useState(false);
  const [creditCardNo, setCreditCardNo] = useState("");
  const [form, setFrom] = useState({
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
  function onTimeChange(e) {
    setCreditCardNo(e.target.rawValue);
  }

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
          console.log(errors, touched, values);
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
                          <div
                            key={index}
                            className="mt-4 bg-white px-3 py-3 rounded-md"
                          >
                            <div className="space-y-2 transition-all flex flex-row justify-between items-center space-x-3">
                              <div className="flex flex-col w-full mt-2">
                                <FIELD
                                  placeholder="Title of the course"
                                  name="_title"
                                  label="Title"
                                  index={index}
                                />
                              </div>
                              <div className="flex flex-col w-full">
                                <FIELD
                                  placeholder="Enter URL"
                                  name="video_url"
                                  label="Video URL"
                                  index={index}
                                />
                              </div>
                              <div className="flex flex-col w-full">
                                <FIELD
                                  placeholder="MM:SS"
                                  name="time_duration"
                                  label="Time Duration"
                                  index={index}
                                />
                              </div>
                              <div className="flex flex-col w-full">
                                <FIELD
                                  placeholder="url1, url2, url3"
                                  name="resources"
                                  label="Resources"
                                  index={index}
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
  const error = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  return (
    <Input
      {...field}
      {...props}
      status={touch && error ? "error" : null}
      className="w-[100%]"
    />
  );
};

const MyInput_Cleave = ({ field, index, setCreditCardNo, form, ...props }) => {
  const error = getIn(form.errors, field.name);
  const touch = getIn(form.touched, field.name);
  function onTimeChange(e) {
    setCreditCardNo(e.target.rawValue);
  }

  new Cleave(".form-field", {
    time: true,
    timePattern: ["h", "m"]
  });

  return (
    <>
      <Cleave
        {...field}
        {...props}
        placeholder="MM:SS"
        id={field.name}
        options={{ time: true, timePattern: ["m", "s"] }}
        onChange={onTimeChange}
        className={`form-field ant-input w-[100%] ${
          touch && error && " ant-input-status-error "
        }`}
      />
    </>
  );
};

const FIELD = ({ index, name, placeholder, label }) => {
  return (
    <>
      <label>{label}</label>
      <Field
        name={`playlist.${index}.${name}`}
        placeholder={placeholder}
        component={MyInput}
      />
      <ErrorMessage name={`playlist.[${index}].${name}`}>
        {(msg) => <div className="text-red-500">{msg}</div>}
      </ErrorMessage>
    </>
  );
};

export default DashboardHOC(FormCourses);
