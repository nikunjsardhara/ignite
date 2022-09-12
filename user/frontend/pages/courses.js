import React from "react";
import Card from "../components/Card";

function cources() {
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
          {[0, 1, 2, 3, 4, 5, 6].map((item, key) => {
            return <Card key={key} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default cources;
