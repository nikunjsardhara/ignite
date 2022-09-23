import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { RiArrowUpSLine } from "react-icons/ri";
import { RiVideoFill } from "react-icons/ri";
import { BsFillCaretDownFill } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { setTitleCourse } from "../../slice/creatorSlice";
import Link from "next/link";
import YouTube from "react-youtube";

function Video({ data }) {
  const [theaterMode, setTheaterMode] = useState(true);
  const [startVideo, setStartVideo] = useState("tfBVp0Zi2iE");

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  };
  const onReady = (event) => {
    event.target.pauseVideo();
  };

  return (
    <>
      <div className="z-[0] select-none">
        <div className="navbar bg-slate-900 px-10  z-0">
          <div className="navbar-start flex flex-row">
            <div className="grid card place-items-center">
              <Link href="/">
                <p className="btn btn-ghost text-white normal-case text-2xl">
                  Ignite
                </p>
              </Link>
            </div>
            <div className="border border-slate-500 h-5 rounded"></div>
            <div className="grid card text-white place-items-center ml-5 font-light">
              {data?.title}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 h-[100vh] relative transition-all ease-in duration-300">
        <div
          className={`col-span-2 row-span-2 mt-4 ml-4 transition-all ease-in duration-300  ${
            !theaterMode && "!col-span-3 !row-span-5 mr-5"
          }`}
        >
          {/* <div className="col-span-2  mt-4 ml-4 min-h-[450px] max-h-[600px]"> */}
          {/* <iframe
            width="100%"
            height="100%"
            className="rounded-md"
            src={startVideo}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe> */}

          <YouTube
            className="h-full w-full rounded-md"
            videoId={startVideo}
            opts={opts}
            onReady={onReady}
          />

          {!theaterMode && (
            <div
              className="bg-[wheat] hover:bg-[#ebc57e] cursor-pointer hover:shadow-orange-500 hover:shadow-md  w-10 h-10 absolute top-[10%] right-0 flex p-2 justify-center items-center 
  rounded-l-lg  hover:w-[80px] transition-all"
              onClick={() => setTheaterMode(!theaterMode)}
            >
              <BsArrowLeftCircle className="w-[30px] h-[30px]" />
            </div>
          )}
        </div>
        {theaterMode && (
          <div className="row-span-3 transition-all ease-in duration-300">
            <div className="flex flex-row justify-between items-center my-4 mr-4 px-4 py-4 bg-gray-300 rounded-md font-semibold">
              <p>Course Content</p>
              <p
                className="hover:bg-slate-200 cursor-pointer p-2 rounded-md"
                onClick={() => setTheaterMode(!theaterMode)}
              >
                <VscChromeClose />
              </p>
            </div>
            <div className="my-4 mr-4 rounded-md flex flex-col space-y-2 max-h-[90vh] overflow-auto pb-[100px]">
              {data?.playlist?.map((item, key) => (
                <Disclosure key={key}>
                  {({ open }) => (
                    <>
                      {/* <Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-[wheat] px-4 py-2 text-left font-medium cursor-pointer text-black hover:bg-[#ebc57e] transition-all focus:outline-none focus-visible:ring focus-visible:ring-[wheat] focus-visible:ring-opacity-75">
                        <div className="flex flex-col space-y-2 ">
                          <span>Section {key + 1}: Introduction</span>
                          <span className="text-gray-700 text-xs">
                            0 / 4 | 29min{" "}
                          </span>
                        </div>
                        <RiArrowUpSLine
                          className={`${
                            open ? "rotate-180 transform  transition-all " : ""
                          } h-5 w-5 text-black`}
                        />
                      </Disclosure.Button> */}
                      {/* <Disclosure.Panel
                        onClick={() => setStartVideo(item?.video)}
                        className="px-4 pt-3 pb-2  transition-all text-sm text-gray-700 bg-[#eeeeee] rounded-md mt-2 hover:bg-[#dddddd] cursor-pointer"
                      > */}
                      <div
                        className={`flex flex-row justify-between transition-all items-center font-medium text-black hover:text-gray-700 bg-[#eeeeee] rounded-md mt-2 hover:bg-[#dddddd] cursor-pointer  ${
                          startVideo === item?.video &&
                          "!bg-[wheat] hover:!bg-[#ffcd70]"
                        }`}
                        onClick={() => setStartVideo(item?.video)}
                      >
                        <div
                          className={`flex flex-col space-y-2 px-4 pt-3 pb-2 text-sm`}
                        >
                          <span>
                            {key + 1}: {item?.title}
                          </span>
                          <span className="text-gray-700 text-xs flex flex-row">
                            <RiVideoFill className="w-5 h-5" />
                            <p className="ml-2 flex items-center">
                              {item?.time_duration}
                            </p>
                          </span>
                        </div>
                        <div className="">
                          {item?.resources.length > 0 && (
                            <>
                              <Menu
                                as="div"
                                className="relative inline-block text-left"
                              >
                                <div className="flex justify-center items-center">
                                  <Menu.Button>
                                    <div className="flex flex-row justify-center items-center px-2 py-1 mr-3 rounded border-black border">
                                      Resources{" "}
                                      <span className="ml-2">
                                        <BsFillCaretDownFill />
                                      </span>
                                    </div>
                                  </Menu.Button>
                                </div>
                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1 z-[100]">
                                    {item?.resources.map((resource, key) => (
                                      <Menu.Item key={key}>
                                        {({ active }) => (
                                          <a href={resource} target="_blank">
                                            <button
                                              className={`${
                                                active
                                                  ? "bg-[wheat] text-black"
                                                  : "text-gray-900"
                                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                            >
                                              Resource : {key + 1}
                                            </button>
                                          </a>
                                        )}
                                      </Menu.Item>
                                    ))}
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </>
                          )}
                        </div>
                      </div>
                      {/* </Disclosure.Panel> */}
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        )}
        <div
          className={`col-span-2 ml-4 rounded-md mb-4 pt-2 transition-all ${
            !theaterMode && "!col-span-3 mr-5"
          }`}
        >
          <div className="tabs font-semibold">
            <a className="tab tab-bordered tab-active">Overview</a>
            <a className="tab">Notes</a>
            <a className="tab">Review</a>
          </div>
          <div className="border-b-2 mt-1"></div>
        </div>
      </div>
    </>
  );
}

export default Video;

Video.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND_URL + "/courses/single?id=" + id
  );
  const data = await res.json();
  return {
    props: {
      data: data
    }
  };
}
