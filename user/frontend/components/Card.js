import Image from "next/image";
import React from "react";

function Card({ course }) {
  return (
    <>
      <div className="card w-80 glass my-5 flex flex-col flex-wrap">
        <div className="relative w-[325px] h-[200px]">
          <Image
            blurDataURL={course.thumbnail}
            src={course.thumbnail}
            layout="fill"
            placeholder="blur"
            alt={course.title}
          />
        </div>
        <div className="p-[2rem] flex flex-col flex-1 gap-[0.5rem]">
          <h2 className="card-title">{course.title}</h2>
          <p>{course.description}</p>
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
