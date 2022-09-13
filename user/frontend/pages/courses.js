import React from "react";
import Card from "../components/Card";
import useSWR from "swr";

// fetcher
const fetcher = (url) => fetch(url).then((res) => res.json());

function courses() {
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/courses",
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

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
        <div className="mt-10 flex flex-row flex-wrap justify-evenly">
          {data?.courses.map((item, key) => {
            return <Card course={item} key={key} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default courses;
