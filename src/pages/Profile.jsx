import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Profile/Sidebar";

const Profile = () => {
  const navigate = useNavigate();
  // const navigate = useNavigate();

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        {/* <sidebar /> */}
        <Sidebar />

        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-auto w-11/12 max-w-[1000px] py-10">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
