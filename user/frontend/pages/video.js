import React, { useState } from "react";
import Layout from "../components/Video/Layout";
import { Disclosure } from "@headlessui/react";
import { RiArrowUpSLine } from "react-icons/ri";
import { RiVideoFill } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";
import { BsArrowLeftCircle } from "react-icons/bs";

function Video() {
  const [theaterMode, setTheaterMode] = useState(false);
  return (
    <>
      <div className="grid grid-cols-3 gap-4 h-[100vh] relative transition-all ease-in duration-300">
        <div
          className={`col-span-2 row-span-2 mt-4 ml-4 transition-all ease-in duration-300  ${
            !theaterMode && "!col-span-3 !row-span-5 mr-5"
          }`}
        >
          {/* <div className="col-span-2  mt-4 ml-4 min-h-[450px] max-h-[600px]"> */}
          <iframe
            width="100%"
            height="100%"
            className="rounded-md"
            src="https://www.youtube.com/embed/ZqqraWbJWjA"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
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
            <div className="my-4 mr-4 rounded-md flex flex-col space-y-2 pb-4 max-h-[90vh] overflow-auto">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                (item, key) => (
                  <Disclosure key={key}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-[wheat] px-4 py-2 text-left font-medium cursor-pointer text-black hover:bg-[#ebc57e] transition-all focus:outline-none focus-visible:ring focus-visible:ring-[wheat] focus-visible:ring-opacity-75">
                          <div className="flex flex-col space-y-2 ">
                            <span>Section {item + 1}: Introduction</span>
                            <span class="text-gray-700 text-xs">
                              0 / 4 | 29min{" "}
                            </span>
                          </div>
                          <RiArrowUpSLine
                            className={`${
                              open
                                ? "rotate-180 transform  transition-all "
                                : ""
                            } h-5 w-5 text-black`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-3 pb-2  transition-all text-sm text-gray-700 bg-[#eeeeee] rounded-md mt-2 hover:bg-[#dddddd] cursor-pointer">
                          <div className="flex flex-col space-y-2 ">
                            <span>1: Welcome</span>
                            <span class="text-gray-700 text-xs flex flex-row">
                              <RiVideoFill className="w-5 h-5" />
                              <p className="ml-2 flex items-center">2min</p>
                            </span>
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )
              )}
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
  return (
    <>
      <Layout />
      {page}
    </>
  );
};
