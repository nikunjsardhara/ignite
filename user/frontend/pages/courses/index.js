import React, { useEffect } from "react";
import Card from "../../components/Card";
import jwt from "jsonwebtoken";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

function courses() {
  const [courses, setCourses] = React.useState([]);
  const [purchaseCourse, setPurchaseCourse] = React.useState([]);
  const [item, setItem] = React.useState(12);
  const [fakeState, setFakeState] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("IGNITE");
      if (item) {
        const decoded = jwt.decode(item);
        axios
          .post(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/courses/purchase-course",
            {
              _id: decoded?._doc?._id,
            }
          )
          .then((res) => {
            setPurchaseCourse([]);
            for (let i = 0; i < res?.data?.course.length; i++) {
              for (let j = 0; j < res.data.course[i].courses.length; j++) {
                setPurchaseCourse((prevArray) => [
                  ...prevArray,
                  res?.data?.course[i]?.courses[j],
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

  useEffect(() => {
    (async () => {
      try {
        setItem(item + 12);
        const res = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/courses?limit=" + item
        );
        const data = await res.json();
        if (data.success) {
          if (data?.courses.length === 0) return setHasMore(false);

          let arr = courses.concat(data.courses);
          arr = arr.filter((item, index) => {
            return arr.indexOf(item) == index;
          });
          setCourses(arr);
        }
      } catch (error) {
        console.log(error);
        setCourses([]);
      }
    })();
  }, [fakeState]);

  const fetchMoreData = () => {
    setTimeout(() => {
      setFakeState(Math.random() * 2e4);
    }, 1500);
  };

  return (
    <div className="my-20 mt-10">
      <div className="container mx-auto">
        <select className="select select-warning w-[150px] max-w-xs">
          <option disabled selected>
            Category
          </option>
          <option>All</option>
          <option>Workshops</option>
        </select>
      </div>

      <div className="mx-10">
        <InfiniteScroll
          dataLength={item}
          next={fetchMoreData}
          hasMore={true}
          className="grid grid-cols-3 gap-4 place-items-center"
        >
          {courses.map((item, key) => {
            return (
              <Card course={item} key={key} purchaseCourse={purchaseCourse} />
            );
          })}
        </InfiniteScroll>
        {hasMore && <Loader />}
      </div>
    </div>
  );
}

export default courses;

function Loader() {
  return (
    <div className="relative w-full flex flex-row justify-center items-center text-white mt-10">
      <div class="middle">
        <div class="bar bar1"></div>
        <div class="bar bar2"></div>
        <div class="bar bar3"></div>
        <div class="bar bar4"></div>
        <div class="bar bar5"></div>
        <div class="bar bar6"></div>
        <div class="bar bar7"></div>
        <div class="bar bar8"></div>
      </div>
    </div>
  );
}
