import React, { useState } from "react";
import axios from "axios";

// Validate
import {
  loginValidation,
  signUpValidation
} from "../utils/validator/validation";
const validationHandler = (data) => {
  const { error } = loginValidation(data);
  if (error) {
    return error.details[0].message;
  } else {
    return null;
  }
};
const validationHandler_signup = (data) => {
  const { error } = signUpValidation(data);
  if (error) {
    return error.details[0].message;
  } else {
    return null;
  }
};

function Modal() {
  const [toggle, setToggle] = useState(false);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: ""
  });

  // SIGNIN FORM : POST
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let error = validationHandler({ email, password });

      if (error) {
        alert(error);
        return;
      }
      let res = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/signin",
        { email, password }
      );
      if (res?.data.success === true) {
        localStorage.setItem("IGNITE", res.data.token);
        // router.push("/v1/dashboard");
        window.location.reload();
      } else {
        alert(res?.data.message);
        return;
      }
    } catch (err) {
      alert(err?.response?.data?.message);
      console.log(err?.response?.data?.message);
    }
  };

  // SIGNUP FORM : POST
  const handleSubmit_Signup = async (e) => {
    try {
      e.preventDefault();
      let error = validationHandler_signup(signup);
      if (!checked) {
        alert("Please accept the terms and conditions.");
        return;
      }
      if (error) {
        alert(error);
        return;
      }
      let res = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/signup",
        signup
      );

      if (res?.data.success === true) {
        localStorage.setItem("IGNITE", res.data.token);
        window.location.reload();
        // router.push("/v1/dashboard");
      } else {
        alert(res?.data.message);
        return;
      }
    } catch (err) {
      alert(err?.response?.data?.message);
      console.log(err?.response?.data?.message);
    }
  };
  return (
    <div className="select-none">
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          {toggle === false ? (
            <div className="flex justify-center items-center flex-col">
              <h3 className="text-xl font-bold text-center">Login</h3>
              <form onSubmit={(e) => handleSubmit(e)} className="w-[70%]">
                <div className="form-control w-full max-w-xs mt-6">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setPassword(e.target.value)}
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
                <button className="mt-5 w-[100%] rounded-full bg-[wheat] btn text-black border-none hover:bg-[#ebc57e]">
                  Login
                </button>
              </form>
              <div className="divider text-gray-500 font-normal text-sm">You don't have an account ?</div>
              <div
                onClick={() => setToggle(!toggle)}
                className="cursor-pointer w-[70%] rounded-full text-center text-lg text-black border-none "
              >
                Signup
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col">
              <h3 className="text-xl font-bold text-center">Signup</h3>
              <form
                onSubmit={(e) => handleSubmit_Signup(e)}
                className="w-[70%]"
              >
                <div className="form-control w-full max-w-xs mt-6">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    onChange={(e) =>
                      setSignup({ ...signup, name: e.target.value })
                    }
                    className="input input-bordered w-full max-w-xs"
                  />

                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) =>
                      setSignup({ ...signup, email: e.target.value })
                    }
                    className="input input-bordered w-full max-w-xs"
                  />
                  <label className="label">
                    <span className="label-text">Create Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    onChange={(e) =>
                      setSignup({ ...signup, password: e.target.value })
                    }
                    className="input input-bordered w-full max-w-xs"
                  />
                  <label className="label">
                    <span className="label-text">Mobile Number</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Your Mobile Number"
                    onChange={(e) =>
                      setSignup({ ...signup, mobileNumber: e.target.value })
                    }
                    className="input input-bordered w-full max-w-xs appearance-none"
                  />
                </div>
                <div className="form-check self-start mt-5">
                  <input
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                    onChange={() => setChecked(!checked)}
                    checked={checked}
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label inline-block  label-text"
                    htmlFor="flexCheckDefault"
                  >
                    I agree to the Terms of Use and Privacy Policy.
                  </label>
                </div>
                <button className="mt-5 w-[100%] rounded-full bg-[wheat] btn text-black border-none hover:bg-[#ebc57e]">
                  Signup
                </button>
              </form>
              <div className="divider text-gray-500 font-normal text-sm">If you already have an account ?</div>
              <div
                onClick={() => setToggle(!toggle)}
                className="cursor-pointer w-[70%] rounded-full text-center text-lg text-black border-none "
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
