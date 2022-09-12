import Image from "next/image";
import React from "react";

function Card() {
  return (
    <>
      <div className="card w-80 glass my-5 flex flex-col flex-wrap">
        <div className="relative w-[325px] h-[200px]">
          <Image
            blurDataURL={"https://placeimg.com/400/225/arch"}
            src="https://placeimg.com/400/225/arch"
            layout="fill"
            placeholder="blur"
            alt="Courses"
          />
        </div>
        <div className="p-[2rem] flex flex-col flex-1 gap-[0.5rem]">
          <h2 className="card-title">Life hack</h2>
          <p>How to park your car at your garage?</p>
          <div className="card-actions justify-end">
            <button className="btn bg-[wheat] border-none text-black hover:bg-[#ebc57e] ">
              Learn now!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
