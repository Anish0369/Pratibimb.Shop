import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../Cart1/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";

const MProfile = () => {
  const navigate = useNavigate();

  const darkMode = false;

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  // console.log("user", );

  const initials =
    (user?.firstName[0] || "").toUpperCase() +
    (user?.lastName[0] || "").toUpperCase();

  const profilePicUrl = `https://via.placeholder.com/100x100.png/000000/FFFFFF?text=${initials}`;

  return (
    <div>
      <h1
        className={`mb-14 text-3xl font-medium ${
          darkMode ? "text-rgb(66, 72, 84)" : "text-slate-700 font-semibold"
        }`}
      >
        My Profile
      </h1>
      {/* section 1 */}
      <div
        className={`flex lg:flex-row md:flex-row sm:flex-row flex-col items-center justify-between rounded-md border-[1px]  ${
          darkMode
            ? "bg-richblack-800 border-richblack-700 "
            : "bg-white border-slate-500 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        } p-8 px-12`}
      >
        <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col items-center gap-x-4 ">
          <img
            src={profilePicUrl}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover max-[639px]:mb-5"
          />
          <div className="space-y-1">
            <p
              className={`text-lg font-semibold ${
                darkMode ? "text-richblack-5" : "text-richblack-500"
              } `}
            >
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/profile/settings");
          }}
          customClasses={"max-[639px]:mt-5"}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      {/* section 2 */}

      {/* section 3 */}
      <div
        className={`my-10 flex flex-col gap-y-10 rounded-md border-[1px] ${
          darkMode
            ? "border-richblack-700 bg-richblack-800"
            : "bg-white  border-slate-500 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
        } p-8 px-12`}
      >
        <div className="flex w-full items-center justify-between">
          <p
            className={`text-lg font-semibold ${
              darkMode ? "text-richblack-5" : "text-richblack-500"
            }`}
          >
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/profile/settings");
            }}
            // className="bg-yellow-400"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex gap-5 max-w-[500px] justify-between overflow-auto">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-richblack-5" : "text-richblack-300"
                }`}
              >
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-richblack-5" : "text-richblack-300"
                }`}
              >
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-richblack-5" : "text-richblack-300"
                }`}
              >
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-richblack-5" : "text-richblack-300"
                }`}
              >
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-richblack-5" : "text-richblack-300"
                }`}
              >
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MProfile;
