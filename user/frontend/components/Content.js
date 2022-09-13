import Image from "next/image";
import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Card from "./Card";
import Footer from "./Footer";

function Content() {
  return (
    <div className="">
      <div
        id="carouselExampleControls"
        className="carousel slide relative rounded-box mx-10"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner relative w-full overflow-hidden">
          <div className="carousel-item active relative float-left w-full">
            <Image
              src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
              layout="responsive"
              width={700}
              blurDataURL={"https://mdbcdn.b-cdn.net/img/new/slides/041.webp"}
              placeholder="blur"
              height={325}
              alt="Wild Landscape"
            />
          </div>
          <div className="carousel-item relative float-left w-full">
            <Image
              src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
              layout="responsive"
              width={700}
              blurDataURL={"https://mdbcdn.b-cdn.net/img/new/slides/042.webp"}
              placeholder="blur"
              height={325}
              alt="Wild Landscape"
            />
          </div>
          <div className="carousel-item relative float-left w-full">
            <Image
              src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
              layout="responsive"
              width={700}
              height={325}
              placeholder="blur"
              blurDataURL={"https://mdbcdn.b-cdn.net/img/new/slides/043.webp"}
              alt="Wild Landscape"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* 
          <Image
            placeholder="blur"
            blurDataURL="https://images.unsplash.com/photo-1525708827920-7d53586a1ab1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            src="https://images.unsplash.com/photo-1525708827920-7d53586a1ab1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="w-full"
            layout="fill"
            alt="Carousel-1"
          />
          */}
      <div className="mt-10 px-10">
        <div className="flex justify-center">
          <a href="#our" className="">
            <h1 className="text-lg w-fit rounded-full px-4 py-1 uppercase hover:shadow-lg bg-[wheat] border-none text-black hover:bg-[#ebc57e]">
              Our Popular Courses
            </h1>
          </a>
        </div>
        <div className="mx-10">
          <div className="mt-10 flex flex-row flex-wrap space-x-5 justify-evenly">
            {/* Cards codes are stopped here because props {course} array is not available yet. */}
            {/* {[0, 1, 2].map((item, key) => {
              return <Card key={key} />;
            })} */}
          </div>
        </div>
        <div className="w-full flex flex-row-reverse mt-5 mb-10">
          <div className="flex items-center text-[#291334] hover:bg-[wheat] hover:text-[#000000] px-3 py-1 rounded-full mr-10 cursor-pointer">
            SEE ALL COURSES <MdOutlineArrowForwardIos className="ml-4" />
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100  text-gray-600">
        <div className="pt-10">
          <h1 className="text-center text-3xl">Our Platform Features</h1>
          <p className="text-center mt-5">
            In this exclusive{" "}
            <span className="px-2 rounded bg-amber-600/40 text-black">
              Member
            </span>{" "}
            only community we go beyond the traditional coursework and give you{" "}
            <span className="px-2 rounded bg-amber-600/40 text-black">
              Additional
            </span>{" "}
            benefits such as:
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 p-10 mt-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, key) => (
            <div key={key} className="p-5">
              <div className="card card-side hover:shadow-2xl h-[180px] cursor-pointer bg-[bisque] border-none text-black hover:bg-[#ebc57e]">
                <figure className="w-[200px] ml-3">
                  <Image
                    blurDataURL={
                      "https://cdn-icons-png.flaticon.com/512/566/566985.png"
                    }
                    src="https://cdn-icons-png.flaticon.com/512/566/566985.png"
                    width="200"
                    height="180"
                    placeholder="blur"
                    alt="Courses"
                  />
                </figure>
                <div className="card-body ml-3">
                  <h2 className="card-title">24X7 Discussions Foram</h2>
                  <p>
                    24x7 Discussion Forum & Discord Community To Engage &
                    Network With Your Peers
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex justify-center flex-col items-center w-full mb-20 bg-[wheat] text-gray-700">
        <div className="w-[60%]">
          <h1 className="text-center text-3xl text-black py-10">
            Ignight Group
          </h1>
          <div className="flex flex-row justify-start">
            <div className="w-[50%] py-10 pt-0">
              <img
                className="rounded-lg"
                alt="Album"
                src="https://www.learnwithprakhar.com/s/pages/assets/images/Prakhar%20Gupta%20.jpg"
              />
            </div>
            <div className="w-[50%] p-5 pt-0">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis quaerat totam, sequi eaque perferendis inventore,
                aperiam cupiditate ut rem excepturi ipsa minus quam libero sit
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis quaerat totam, sequi eaque perferendis inventore,
              </p>
              <br />

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis quaerat totam, sequi eaque perferendis inventore,
                aperiam cupiditate ut rem excepturi ipsa minus quam libero sit
              </p>
              <br />

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis quaerat totam, sequi eaque perferendis inventore,
              </p>
              <br />

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis quaerat totam, sequi eaque perferendis inventore,
                aperiam cupiditate ut rem excepturi ipsa minus quam libero sit
              </p>
              <br />

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis quaerat totam, sequi eaque perferendis inventore,
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-10 flex flex-row justify-center items-center my-20">
        <div className="w-[60%]">
          <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure>
              <img src="https://placeimg.com/400/400/arch" alt="Album" />
            </figure>
            <div className="card-body flex flex-col items-center justify-center">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Firstname</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-check self-start ml-5 mt-3 inline-block">
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="flexCheckDefault"
                >
                  We respect your privacy.
                </label>
              </div>
              <div className="card-actions justify-end mt-5">
                <button className="btn bg-[wheat] border-none text-black hover:bg-[#ebc57e]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
