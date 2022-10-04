import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCart } from "../slice/creatorSlice";
function Card({ course, purchaseCourse }) {
  const router = useRouter();

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
            {router.pathname === "/courses" ? (
              <CourseCart purchaseCourse={purchaseCourse} course={course} />
            ) : (
              <ReadingCart course={course} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;

function CourseCart({ purchaseCourse, course }) {
  const dispatch = useDispatch();
  return (
    <>
      {" "}
      {purchaseCourse?.find((x) => x._id === course._id) ? (
        <Link href={`/courses/${course._id}`}>
          <button className="btn bg-[wheat] border-none text-black hover:bg-[#ebc57e]">
            Watch Now
          </button>
        </Link>
      ) : (
        <button
          className="btn bg-[wheat] border-none text-black hover:bg-[#ebc57e]"
          onClick={() => {
            dispatch(setCart(course));
            toast.success(<Msg />);
          }}
        >
          Add to cart
        </button>
      )}
    </>
  );
}

const Msg = ({ closeToast, toastProps }) => (
  <div className="rounded">
    Item added to cart
    <br />
    <div className="bg-green-700 rounded-full text-white text-sm font-semibold px-2 w-fit uppercase">
      <Link href="/cart"> Go To Cart</Link>
    </div>
  </div>
);

function ReadingCart({ course }) {
  return (
    <>
      <Link href={`/courses/${course._id}`}>
        <button className="btn bg-[wheat] border-none text-black hover:bg-[#ebc57e]">
          Watch Now
        </button>
      </Link>
    </>
  );
}
