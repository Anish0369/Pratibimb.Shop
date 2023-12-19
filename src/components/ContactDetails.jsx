import React from "react";
import * as Icon1 from "react-icons/bi";
import * as Icon3 from "react-icons/hi2";
import * as Icon2 from "react-icons/io5";
// import { useSelector } from "react-redux"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@pratibimb.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our Shop",
    details: "Akshya Nagar 1st Block 1st Cross, BawarKua, Indore-452010, India",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
];

const ContactDetails = () => {
  //   const {darkMode} = useSelector((state) => state.mode);
  const darkMode = true;
  return (
    <div
      className={`flex flex-col gap-6 rounded-xl ${
        darkMode ? "bg-slate-200" : "bg-richblack-5"
      } p-4 lg:p-6`}
    >
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
        return (
          <div
            className="flex flex-col gap-[2px] p-3 text-sm text-slate-600"
            key={i}
          >
            <div className="flex flex-row items-center gap-3">
              <Icon size={25} color="#585D69" />
              <h1
                // className={`text-lg font-semibold ${
                //   darkMode ? "text-richblack-5" : "text-richblack-500"
                // }`}
                className="text-lg font-semibold text-black"
              >
                {ele?.heading}
              </h1>
            </div>
            <p className="font-medium">{ele?.description}</p>
            <p className="font-semibold">{ele?.details}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ContactDetails;
