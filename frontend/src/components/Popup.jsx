import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import Reset from "./Reset";

export default function Popup({ email }) {
  const navigate = useNavigate();
  const [pop, setpop] = useState(false);

  function handle() {
    localStorage.removeItem("token");
    toast.info("Successfully logout", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/signin");
  }

  function popup() {
    setpop(!pop);
  }

  return (
    <>
      <div className="h-fit w-40 bg-slate-50  absolute translate-y-28 rounded-md ">
        <Reset pop={pop} popup={popup} />
        <ol className=" gap-2  pt-2">
          <li className="  text-sm pl-2 ">{email}</li>

          <hr className="h-[0.5px] my-2 w-full bg-black border-0 " />
          <li className="pb-2 hover:bg-slate-100 ... w-full  pl-2 cursor-pointer">
            Settings
          </li>
          <li
            className="pb-2 hover:bg-slate-100 ... w-full  pl-2 cursor-pointer
                "
            onClick={popup}
          >
            Reset Password
          </li>
          <li className="pb-2 hover:bg-slate-100 ... w-full pl-2 cursor-pointer">
            Help
          </li>
          <li
            className="pb-2 hover:bg-slate-100 ... pl-2 cursor-pointer"
            onClick={handle}
          >
            Sign out
          </li>
        </ol>
      </div>
    </>
  );
}
