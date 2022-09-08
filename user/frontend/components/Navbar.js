import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import Modal from "./Modal";

function Navbar() {
  return (
    <div className="">
      <div className="navbar bg-base-100 px-10">
        <div className="navbar-start">
          <Link href="/">
            <p className="btn btn-ghost normal-case text-xl">Ignight</p>
          </Link>
          <div className="relative ml-[80px]">
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered w-full lg:w-[400px] max-w-xs pr-6"
              style={{ paddingRight: "2.5rem" }}
            />
            <span className="absolute top-4 right-4">
              <BsSearch />
            </span>
          </div>
        </div>
        <div className="navbar-end">
          <div className="mr-[60px]">
            <ul className="menu menu-horizontal p-0">
              <li>
                <Link href="/courses">Courses</Link>
              </li>
              <li tabIndex={0}>
                <a>
                  Newsletter
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul className="p-2 bg-[wheat] z-[100]">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li className="text-black flex justify-center items-center">
                <a>
                  <Link href="/cart">
                    <AiOutlineShoppingCart />
                  </Link>
                </a>
              </li>
            </ul>
          </div>
          <label
            className="btn modal-button bg-[wheat] border-none text-black hover:bg-[#ebc57e]"
            htmlFor="my-modal-4"
          >
            Get started
          </label>
          <Modal />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
