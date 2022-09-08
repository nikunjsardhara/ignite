import React, { useState } from "react";

function Modal() {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="select-none">
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          {toggle === false ? (
            <div className="flex justify-center items-center flex-col">
              <h3 className="text-xl font-bold text-center">Login</h3>
              <div className="form-control w-full max-w-xs mt-6">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs mt-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="input input-bordered w-full max-w-xs"
                />
                <label className="label">
                  <span className="label-text-alt"></span>
                  <span className="label-text-alt hover:text-gray-700 cursor-pointer">
                    Forgot Password ?
                  </span>
                </label>
              </div>
              <div className="mt-5 w-[70%] rounded-full bg-[wheat] btn text-black border-none hover:bg-[#ebc57e]">
                Login
              </div>
              <div className="divider"></div>
              <div
                onClick={() => setToggle(!toggle)}
                className="mt-5 w-[70%] rounded-full bg-[wheat] btn text-black border-none hover:bg-[#ebc57e]"
              >
                Signup
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col">
              <h3 className="text-xl font-bold text-center">Signup</h3>
              <div className="form-control w-full max-w-xs mt-6">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full max-w-xs"
                />

                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="input input-bordered w-full max-w-xs"
                />
                <label className="label">
                  <span className="label-text">Create Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="input input-bordered w-full max-w-xs"
                />
                <label className="label">
                  <span className="label-text">Mobile Number</span>
                </label>
                <input
                  type="number"
                  placeholder="Enter Your Mobile Number"
                  className="input input-bordered w-full max-w-xs appearance-none"
                />
              </div>
              <div className="form-check self-start ml-[16%] mt-5">
                <input
                  className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label
                  className="form-check-label inline-block  label-text"
                  htmlFor="flexCheckDefault"
                >
                  I agree to the Terms of Use and Privacy Policy.
                </label>
              </div>
              <div className="mt-5 w-[70%] rounded-full bg-[wheat] btn text-black border-none hover:bg-[#ebc57e]">
                Signup
              </div>
              <div className="divider"></div>
              <div
                onClick={() => setToggle(!toggle)}
                className="mt-5 w-[70%] rounded-full bg-[wheat] btn text-black border-none hover:bg-[#ebc57e]"
              >
                Login
              </div>
            </div>
          )}
        </label>
      </label>
    </div>
  );
}

export default Modal;
