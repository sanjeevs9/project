import Quote from "./Quote";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


export default function Signin() {
    const [value, setValue] = useState({
        email: "",
        password: "",
      });

      async function request() {
        axios.post("http://localhost:3000/api/user/signin",value)
        .then(res=>{
             console.log(res.data)
        })
        .catch(error=>{
            console.log(error.response.data.message)
            alert(error.response.data.message)
        })
      }

  return (
    <>
      <div className="grid md:grid-cols-2">
        <div>
          <div className="h-screen  flex flex-col justify-center gap-6 items-center">
            <div className="flex gap-2 flex-col  items-center ">
              <div className="font-extrabold text-4xl">
                Login to you Account
              </div>
              <div className=" text-center text-gray-500">
                Dont have an account?
                <span className="pl-2">
                  <Link to={"/signup"} className="underline">
                    Signup
                  </Link>
                </span>
              </div>
            </div>
            <div className="justify-center  w-2/3 flex-col gap-3">
              <Inputs
                placeholder="sanjeev@example.com"
                onchange={(e) => {
                  setValue((c) => ({
                    ...c,
                    email: e.target.value,
                  }));
                }}
                label="Email"
              ></Inputs>
              <Inputs
                placeholder="***"
                onchange={(e) => {
                  setValue((c) => ({
                    ...c,
                    password: e.target.value,
                  }));
                }}
                label="Password"
                type="password"
              ></Inputs>
            </div>
            <div className="flex w-2/3 items-center">
              <button
                onClick={request}
                type="button"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
              >
                Login
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <Quote />
        </div>
      </div>
    </>
  );
}

function Inputs({ placeholder, onchange, type, label }) {
  return (
    <div>
      <label className="block mb-2 text-sm  pt-4 font-bold">{label}</label>
      <input
        onChange={onchange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
