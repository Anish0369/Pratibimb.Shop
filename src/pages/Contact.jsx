import React from "react";

// import Footer from "../components/common/Footer"
// import ReviewSlider from "../components/common/ReviewSlider"
import ContactDetails from "../components/ContactDetails";
// import ContactUs from "../components/ContactPage/ContactUs"
import { useSelector } from "react-redux";
// const { navigate } = require("@reach/router");
const { useNavigate } = require("react-router-dom");

const Contact = () => {
  const darkMode = true;

  const navigate = useNavigate();

  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* contact details */}
        <div className="lg:w-[40%] mx-auto">
          <ContactDetails />
        </div>

        {/* Contact form */}
      </div>
      <div className="justify-end items-center bg-black self-stretch flex w-full flex-col mt-36 pt-12 pb-6 max-md:max-w-full max-md:mt-10">
        <div className="justify-between items-start flex w-full max-w-[1170px] gap-5 mt-8 px-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
          <div className="items-stretch flex grow basis-[0%] flex-col py-0.5 self-start">
            <div className="text-neutral-50 text-2xl font-bold leading-6 tracking-wider max-md:mr-1.5">
              प्रतिबिंब
            </div>
            <div className="text-neutral-50 text-xl font-medium leading-7 mt-7 max-md:mr-1.5">
              Subscribe
            </div>
            <div className="text-neutral-50 text-base leading-6 whitespace-nowrap mt-6">
              Get 10% off your first order
            </div>
            <div className="items-stretch rounded border-[color:var(--Text,#FAFAFA)] flex justify-between gap-5 mt-4 px-4 py-3 border-[1.5px] border-solid">
              <div className="text-neutral-50 text-base leading-6">
                Enter your email
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/12a54082781a806227ade42d81d6722495cd51ed50c28a6b5eebf5a1f9d88295?"
                className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
              />
            </div>
          </div>
          <div className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-neutral-50 text-xl font-medium leading-7">
              Support
            </div>
            <div className="text-neutral-50 text-base leading-6 mt-6">
              Near bawarkua Indore , India
            </div>
            <div className="text-neutral-50 text-base leading-6 whitespace-nowrap mt-4">
              pratbimb@gmail.com
            </div>
            <div className="text-neutral-50 text-base leading-6 whitespace-nowrap mt-4">
              1234567890
            </div>
          </div>
          <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
            <div className="text-neutral-50 text-xl font-medium leading-7">
              Account
            </div>
            <div
              className="text-neutral-50 text-base leading-6 whitespace-nowrap mt-6"
              onClick={() => navigate(`profile/my-profile`)}
            >
              My Profile
            </div>
            <div
              className="text-neutral-50 text-base leading-6 whitespace-nowrap mt-4"
              onClick={() => navigate(`/login`)}
            >
              Login
            </div>
            <div
              className="text-neutral-50 text-base leading-6 mt-4"
              onClick={() => navigate(`/cart`)}
            >
              Cart
            </div>
            <div className="text-neutral-50 text-base leading-6 mt-4">
              Wishlist
            </div>
            <div
              className="text-neutral-50 text-base leading-6 mt-4"
              onClick={() => navigate(`/home`)}
            >
              Shop
            </div>
          </div>
          <div className="items-stretch flex basis-[0%] flex-col self-start">
            <div className="text-neutral-50 text-xl font-medium leading-7 whitespace-nowrap">
              Quick Links
            </div>
            <div className="text-neutral-50 text-base leading-6 whitespace-nowrap mt-6">
              Privacy Policy
            </div>
            <div className="text-neutral-50 text-base leading-6 whitespace-nowrap mt-4">
              Terms Of Use
            </div>
            <div className="text-neutral-50 text-base leading-6 mt-4">FAQ</div>
            <div
              className="text-neutral-50 text-base leading-6 mt-4"
              onClick={() => navigate(`/contact`)}
            >
              Contact
            </div>
          </div>
        </div>
        <div className="items-center self-stretch flex  w-full flex-col mt-16 pt-4 px-16 max-md:max-w-full max-md:mt-10 max-md:px-5">
          <div className="items-center flex flex-col gap-1.5">
            <div className="text-white text-base leading-6 self-stretch grow whitespace-nowrap">
              Made With ❤️ By Sai Anish & Rudraksh
            </div>
            <div className="items-center flex gap-1.5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/697e045e8176eda80580a05396e076fd706ce2bd8c2a382f2833c7a456ad9044?"
                className="aspect-square object-contain object-center w-5 justify-center items-center overflow-hidden shrink-0 max-w-full my-auto"
              />
              {/* <div className="flex flex-col"> */}
              <div className="text-white text-base leading-6 self-stretch grow whitespace-nowrap">
                Copyright @2023 All Rights Reserved
              </div>
            </div>

            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
