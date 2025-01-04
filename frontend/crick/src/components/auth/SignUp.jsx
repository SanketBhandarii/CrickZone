import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { signUpSchema } from "../../schema/FormSchema";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

function SignUp() {
  const [pass, setPass] = useState(true);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  //   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
            {
              username: values.username,
              email: values.email,
              password: values.password,
            },
            {
              withCredentials: true,
            }
          );
          action.resetForm();
          setMsg(response.data.msg);
          if (
            response.data.msg !== "User with this credentials already exist" &&
            response.data.msg ==
              "SignUp successful, check your mail for verification"
          ) {
            setTimeout(() => {
              setMsg("");
              navigate("/zone/login");
            }, 1500);
            return;
          } else {
            setTimeout(() => {
              setMsg("");
            }, 3000);
          }
        } catch (e) {
          console.log(e);
        }
      },
    });

  return (
    <div className="flex mt-5 float">
      <div className="right flex flex-col gap-5 justify-center items-center rounded-bl-lg rounded-tl-lg h-height-1  w-80 bg-sky-700 px-7 text-white font-semibold text-lg max-scrn2:hidden text-center colorChanger">
        <img
          src="https://cdn.pixabay.com/photo/2017/01/31/15/31/tennis-2025095_1280.png"
          width={120}
          className="rotate"
        />
        <span>
          <h2>Hello, Friend!</h2>
          <p>Enter your details and start journey with us</p>
        </span>
      </div>
      <div
        className="left h-height-1 w-width-1 flex flex-col
     justify-center items-center bg-white rounded-tr-lg rounded-br-lg max-scrn2:rounded-lg max-md:h-auto pb-2 shadow-md input-box"
      >
        <div className="bg-sky-700 h-20 items-center font-font_1 justify-center rounded-tl-lg rounded-tr-lg w-full px-7 text-white font-semibold text-lg text-center hidden max-scrn2:flex">
          <h2 className="">Friend! Enter your details</h2>

          <img
            src="https://cdn.pixabay.com/photo/2017/01/31/15/31/tennis-2025095_1280.png"
            width={110}
            className="rounded-full ml-7 rotate"
          />
        </div>
        <form
          action=""
          className="h-96 gap-5 flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <h2 className="text-sky-500 text-xl font-semibold flex flex-col items-center">
            {/* <p className="text-red-600 text-lg text-center">{}</p> */}
            {msg ? <span className="w-72 text-center">{msg}</span> : "Sign Up"}
          </h2>
          {errors.password && touched.password ? (
            <span className="text-amber-900 text-center text-sm font-semibold">
              {errors.password}
            </span>
          ) : null}
          <input
            type="text"
            name="username"
            value={values.username}
            placeholder="Username"
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="bg-gray-200 placeholder:text-gray-600 placeholder:font-semibold py-2 w-64 px-4 rounded-md outline-none text-gray-800 font-semibold"
          />

          <input
            type="email"
            name="email"
            value={values.email}
            placeholder="Enter valid email"
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="bg-gray-200 placeholder:text-gray-600 placeholder:font-semibold py-2 w-64 px-4 rounded-md outline-none text-gray-800 font-semibold"
          />
          <div className="relative">
            <input
              type={pass ? "password" : "text"}
              name="password"
              value={values.password}
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="bg-gray-200 placeholder:text-gray-600 placeholder:font-semibold py-2 w-64 px-4 rounded-md outline-none text-gray-800 font-semibold"
            />
            <i
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer font-bold text-sky-900 ${
                pass ? "fa-regular fa-eye" : "fa-solid fa-eye-slash"
              }`}
              onClick={() => setPass(!pass)}
            ></i>
          </div>

          <button
            type="submit"
            className="bg-sky-600 team-btn hover:bg-sky-700 transition duration-300 text-white w-64 flex justify-center rounded-md py-2 px-4"
          >
            Sign Up
          </button>
          <span className="text-sm flex text-neutral-800 font-bold">
            Already have an account?
            <NavLink className="pl-1 text-amber-600" to={"/zone/login"}>
              {" "}
              Login
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
