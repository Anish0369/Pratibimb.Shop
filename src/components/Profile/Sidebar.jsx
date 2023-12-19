import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AiOutlineBars } from "react-icons/ai";
import * as Icons from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  //   const Icon = Icons[iconName]
  const location = useLocation();
  //   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const matchRoute = (route) => {
    // console.log("route", route);
    // console.log("location.pathname", location.pathname);
    if (location.pathname === route) {
      console.log("true" + location.pathname);
      return true;
    }
    // const val = matchPath({ path: route }, location.pathname);

    // console.log("val", val);
    // return val;
  };

  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div
      className=" 
    
    "
    >
      {open ? (
        <div className="bg-white border-r-[2px] border-r-black text-black w-72 h-screen">
          <button onClick={() => setOpen(false)} className="m-2 ">
            <IoCloseSharp className=" text-black text-2xl ml-[200px]" />
          </button>

          <div className="flex items-center justify-center h-20">
            <div
              className={`relative px-8 py-2 text-sm font-medium ${
                matchRoute("/profile/my-profile")
                  ? "text-black  "
                  : " text-slate-400"
              } transition-all duration-200`}
              onClick={() => navigate("/profile/my-profile")}
            >
              <h1 className="text-xl font-semibold">Profile</h1>
              <span
                className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                  matchRoute("/profile/my-profile")
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              ></span>
            </div>
          </div>

          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12  bg-black" />

          <div className="flex items-center justify-center h-20">
            <div
              className={`relative px-8 py-2 text-sm font-medium ${
                matchRoute("/profile/orders")
                  ? "text-black  "
                  : " text-slate-400"
              } transition-all duration-200`}
              onClick={() => navigate("/profile/orders")}
            >
              <h1 className="text-xl font-semibold">Orders</h1>
              <span
                className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                  matchRoute("/profile/orders") ? "opacity-100" : "opacity-0"
                }`}
              ></span>
            </div>
          </div>

          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12  bg-black" />

          <div className="flex items-center justify-center h-20">
            <div
              className={`relative px-8 py-2 text-sm font-medium ${
                matchRoute("/profile/settings")
                  ? "text-black  "
                  : " text-slate-400"
              } transition-all duration-200`}
              onClick={() => navigate("/profile/settings")}
            >
              <h1 className="text-xl font-semibold">Settings</h1>
              <span
                className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
                  matchRoute("/profile/settings") ? "opacity-100" : "opacity-0"
                }`}
              ></span>
            </div>
          </div>

          <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12  bg-black" />

          <div className="flex items-center justify-center h-20">
            {/* <h1 className="text-xl font-semibold">Logout</h1> */}
            <Button variant="warning" onClick={handleShow}>
              Logout
            </Button>

            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Logout</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to leave this page!!!
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  className="text-black"
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button
                  onClick={onLogout}
                  variant="primary"
                  className="text-black"
                >
                  Log-out
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      ) : (
        <div className="bg-white ">
          <button onClick={() => setOpen(true)}>
            <AiOutlineBars
              className={`ml-2 mt-1  text-richblack-5 bg-white  text-2xl`}
            />
          </button>
        </div>
      )}
    </div>
  );
}

// export default sidebar;
