import React, { useState, useRef, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Fragment } from "react";
import Link from "next/link";
import Modal from "./Modal";
import { Menu, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";

function Navbar() {
  const [token, setToken] = useState(false);
  const cartTotal = useSelector((state) => state.creator.cart.length);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const item = localStorage.getItem("IGNITE");
      if (item) {
        setToken(true);
      }
    }
  }, []);

  const links = [
    { href: "/account-settings", label: "Account settings" },
    { href: "/support", label: "Support" },
    { href: "/license", label: "License" },
    { href: "/sign-out", label: "Sign out" },
  ];
  return (
    <div className="z-[0]">
      <div className="navbar bg-base-100 px-10 py-5 z-0">
        <div className="navbar-start">
          <Link href="/">
            <p className="btn btn-ghost normal-case text-xl">Ignite</p>
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
              <li>
                <Link href="/mylearning">My Learning</Link>
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
              <Link href="/cart">
                <li className="text-black flex justify-center items-center">
                  <a>
                    <div className="relative">
                      <AiOutlineShoppingCart className="w-[20px] h-[20px]" />
                      {cartTotal > 0 && (
                        <div className="absolute bg-[wheat] font-semibold text-xs p-1 px-2 rounded-full -top-4 -right-4">
                          {cartTotal}
                        </div>
                      )}
                    </div>
                  </a>
                </li>
              </Link>
            </ul>
          </div>
          {token ? (
            <div>
              <div className="w-10 rounded-full">
                <Menu as="div" className="relative inline-block text-left">
                  <div className="flex justify-center items-center">
                    <Menu.Button>
                      <img
                        className="rounded-full z-[1000]"
                        src="https://placeimg.com/192/192/people"
                      />
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
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-[wheat] text-black" : "text-gray-900"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Edit
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              localStorage.clear();
                              window.location.reload();
                            }}
                            className={`${
                              active
                                ? "bg-[wheat] text-red-500"
                                : " text-red-500"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          ) : (
            <>
              <label
                className="btn modal-button bg-[wheat] border-none text-black hover:bg-[#ebc57e]"
                htmlFor="my-modal-4"
              >
                Get started
              </label>
              <Modal />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
