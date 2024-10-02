import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../store/Context";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Login() {
  const { setUser, user } = useContext(Context);
  const [pass, setPass] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePass(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        { email, password },
        { withCredentials: true }
      );

      const receivedMsg = response.data.msg;
      setMsg(receivedMsg);

      if (
        receivedMsg !== "Incorrect password or email" &&
        receivedMsg !== "You are not verified!"
      ) {
        setTimeout(() => {
          setPassword("");
          setEmail("");
          navigate("/");
        }, 1500);
      } else {
        setPassword("");
        setEmail("");
        setTimeout(() => {
          setMsg("");
        }, 2000);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleGoogleLogin(cred) {
    if (cred) {
      const decode = jwtDecode(cred.credential);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api2/google/login`,
          { username: decode.name, googleEmail: decode.email },
          { withCredentials: true }
        );

        const receivedMsg = response.data.msg;
        setMsg(receivedMsg);

        if (receivedMsg !== "Credentials are missing") {
          setTimeout(() => {
            setUsername("");
            setGoogleEmail("");
            navigate("/");
          }, 1500);
        } else {
          setUsername("");
          setGoogleEmail("");
          setTimeout(() => {
            setMsg("");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No credentials provided");
    }
  }

  return (
    <div className="flex mt-5 float">
      <div className="right flex flex-col gap-5 justify-center items-center rounded-bl-lg rounded-tl-lg h-height-1 w-80 bg-sky-700 px-7 text-white font-semibold text-lg max-scrn2:hidden text-center colorChanger">
        <img
          src="https://cdn.pixabay.com/photo/2017/01/31/15/31/tennis-2025095_1280.png"
          width={120}
          className="rounded-full rotate"
        />
        <span>
          <h2>Hello, Friend!</h2>
          <p>Enter your details and start your journey with us</p>
        </span>
      </div>
      <div
        className="left h-height-1 w-width-1 flex flex-col
     justify-center items-center bg-white rounded-tr-lg rounded-br-lg max-scrn2:rounded-lg shadow-md input-box"
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
            <p className="text-red-600 text-lg text-center">{}</p>
            {msg ? (
              <span className="w-72 text-center">{msg}</span>
            ) : (
              "Login Yourself"
            )}
          </h2>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleEmail}
            required
            className="bg-gray-200 placeholder:text-gray-600 placeholder:font-semibold py-2 w-64 px-4 rounded-md outline-none text-gray-800 font-semibold"
          />
          <div className="relative">
            <input
              type={pass ? "password" : "text"}
              name="password"
              value={password}
              placeholder="Password"
              onChange={handlePass}
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
            Login
          </button>
          <GoogleLogin
            onSuccess={(credential) => handleGoogleLogin(credential)}
            onError={() => {
              console.log("Login Failed");
            }}
          />

          <span className="text-sm flex text-neutral-800 font-bold">
            Don't have an account?
            <NavLink className="pl-1 text-amber-600" to={"/signup"}>
              {" "}
              SignUp
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
