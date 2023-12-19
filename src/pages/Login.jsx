import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { NavLink, Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const toastId = toast.loading("Loading...");

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/api/v1/login", {
        email: inputUsername,
        password: inputPassword,
      });

      console.log(response.data);

      if (response.data.success === true) {
        toast.success("Logged in successfully", { id: toastId });
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/cart");
      } else {
        toast.error("Invalid credentials", { id: toastId });
      }

      setLoading(false);
    } catch (error) {
      toast.error("Invalid credentials", { id: toastId });
      setLoading(false);
    }

    //   toast.dismiss(toastId)

    // setLoading(true);

    // console.log(`Username: ${inputUsername}, Password: ${inputPassword}`);
    // if (inputUsername !== "admin" || inputPassword !== "admin") {
    //   setShow(true);
    // }
    // setLoading(false);
  };

  return (
    <div>
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
        <div className="flex flex-col items-stretch w-[69%] max-md:w-full max-md:ml-0">
          <div className="justify-end items-stretch bg-slate-300 flex grow flex-col w-full pt-12 rounded-none max-md:max-w-full max-md:mt-10">
            <img
              loading="lazy"
              srcSet="https://img.freepik.com/premium-photo/empty-black-smartphone-with-cart-bags-light-background-online-shopping-purchase-concept-mock-up-3d-rendering_670147-9890.jpg"
              className="aspect-[1.14] object-contain object-center w-full overflow-hidden mt-6 max-md:max-w-full"
            />
          </div>
        </div>
        <div className="flex flex-col items-stretch w-[31%] ml-5 max-md:w-full max-md:ml-0">
          <div className="items-stretch flex flex-col my-auto px-5 max-md:mt-10">
            {/* <div className="text-black text-4xl font-medium leading-7 tracking-widest whitespace-nowrap">
              Log in to प्रतिबिम्ब
            </div>
            <div className="text-black text-base leading-6 mt-6">
              Enter your details below
            </div> */}

            {/* <div className="text-black text-base leading-6 mt-12 max-md:mt-10">
              Email or Phone Number
            </div> */}

            {/* <div className="bg-black shrink-0 h-px mt-2" /> */}
            {/* <div className="text-black text-base leading-6 mt-10">Password</div> */}
            {/* <div className="bg-black shrink-0 h-px mt-2" /> */}

            <Form className=" bg-white rounded" onSubmit={handleSubmit}>
              {/* Header */}

              {/* ALert */}
              {/* {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            // onClose={() => setShow(false)}
            dismissible
          >
            Incorrect username or password.
          </Alert>
        ) : (
          <div />
        )} */}

              <div className="text-black text-4xl font-medium leading-7 tracking-widest whitespace-nowrap mb-4">
                Log in to प्रतिबिम्ब
              </div>

              <Form.Group className="mb-2" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={inputUsername}
                  placeholder="Username"
                  onChange={(e) => setInputUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="bg-black shrink-0 h-px mt-4 mb-4" />
              <Form.Group className="mb-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={inputPassword}
                  placeholder="Password"
                  onChange={(e) => setInputPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="items-stretch flex justify-between gap-5 mt-10"></div>

              <Button
                className="bg-slate-500 hover:bg-red-500 transition-colors duration-200 ease-in-out cursor-pointer  p-3 mr-3"
                variant="primary"
                type="submit"
                // disabled={loading}
              >
                {loading ? "Logging In..." : "Log In"}
              </Button>

              <div className="text-slate-500 text-base leading-6 my-auto hover:text-red-500 ">
                Forget Password?
              </div>
            </Form>

            {/* <div className="items-stretch flex justify-between gap-5 mt-10">
              <div
                //     className="text-neutral-50 text-base font-medium leading-6 whitespace-nowrap justify-center items-stretch rounded bg-red-500 px-12 py-4 max-md:px-5
                //     hover: bg-slate-500  transition-colors duration-200 ease-in-out cursor-pointer
                //   "
                className="text-neutral-50 text-base font-medium leading-6 whitespace-nowrap justify-center items-stretch rounded bg-slate-500 px-12 py-4 max-md:px-5 hover:bg-red-500 transition-colors duration-200 ease-in-out cursor-pointer"
              >
                Log In
              </div>
              <div className="text-slate-500 text-base leading-6 my-auto hover:text-red-500 ">
                Forget Password?
              </div>
            </div> */}
          </div>
        </div>
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

export default Login;
