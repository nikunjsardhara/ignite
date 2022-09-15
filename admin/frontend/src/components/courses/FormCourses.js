import { Input } from "antd";
import React from "react";
import mernDashApi from "../../helpers/apiUtils";
const { TextArea } = Input;

function FormCourses() {
  const [form, setFrom] = React.useState({
    title: "",
    discription: "",
    price: 100
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const item in form) {
      if (!form[item]) {
        return alert("Please fill all the fields");
      }
    }
    const res = await mernDashApi.post("/api/courses/add", form);
    console.log(res);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="course-master">
        <label>Title</label>
        <Input
          placeholder="Title of the course"
          value={form.title}
          onChange={(e) => setFrom((_) => ({ ..._, title: e.target.value }))}
        />
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
          placeholder="Enter description"
          value={form.discription}
          onChange={(e) =>
            setFrom((_) => ({ ..._, discription: e.target.value }))
          }
        />
      </div>
      <div className="main-btn">
        <button className="btn btn-primary cursor-pointer mt-2">Save</button>
      </div>
    </form>
  );
}

export default FormCourses;
