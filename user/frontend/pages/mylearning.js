import React from "react";
import Card from "../components/Card";

function MyLearning() {
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
        <div className="mt-10 flex flex-row flex-wrap space-x-5 justify-evenly xl:justify-between">
          {[0, 1, 2].map((item, key) => {
            return <Card key={key} />;
          })}
        </div>
        
      </section>
    </div>
  );
}

export default MyLearning;
