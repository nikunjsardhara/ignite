import React, { useEffect } from "react";
import Card from "../components/Card";
import jwt from "jsonwebtoken";
import axios from "axios";
function MyLearning() {
  const [courses, setCourses] = React.useState([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("IGNITE");
      if (item) {
        const decoded = jwt.decode(item);
        axios
          .post(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/courses/purchase-course",
            {
              _id: decoded?._doc?._id
            }
          )
          .then((res) => {
            setCourses([]);
            for (let i = 0; i < res?.data?.course.length; i++) {
              for (let j = 0; j < res.data.course[i].courses.length; j++) {
                setCourses((prevArray) => [
                  ...prevArray,
                  res?.data?.course[i]?.courses[j]
                ]);
              }
            }
          })
          .catch((err) => {
            console.log("Err", err);
          });
      }
    }
  }, []);

  return (
    <div className="">
      <section className="bg-[#ebc57e]">
        <div className="container mx-auto pl-[100px] ">
          <h1 className="py-[50px] text-[40px] font-serif">My Learning</h1>
          <div className="tabs">
            <a className="tab tab-lg tab-lifted tab-active">All Cources</a>
            <a className="tab tab-lg tab-lifted">My Lists</a>
            <a className="tab tab-lg tab-lifted">Wishlist</a>
          </div>
        </div>
      </section>
      <section className="container mx-auto mb-[100px] pl-[100px]">
        <div className="mt-10 flex flex-row flex-wrap space-x-5 justify-evenly xl:justify-evenly flex-start">
          {courses?.map((item, key) => {
            return <Card course={item} key={key} />;
          })}
        </div>
      </section>
    </div>
  );
}

export default MyLearning;
