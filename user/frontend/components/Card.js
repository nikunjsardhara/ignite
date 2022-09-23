import Image from "next/image";
import Link from "next/link";
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
        <div className="relative p-[2rem] flex flex-col flex-1 gap-[0.5rem]">
          <h2 className="card-title">{course.title}</h2>

          <p className="text-ellipsis overflow-hidden w-full h-[70px] mb-[50px]">
            {course.description}
          </p>
          <div className="absolute bottom-[15px] right-[40px]">
            <Link href={`/courses/${course._id}`}>
              <button className="btn bg-[wheat] border-none text-black hover:bg-[#ebc57e]">
                Learn now!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
