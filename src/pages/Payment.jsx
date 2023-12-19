// import React , {useState} from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
// import { NavLink, Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { clearCart } from "../redux/Slices/CartSlice";
// import { useDispatch } from "react-redux";

const Payment = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [instructions, setInstructions] = useState("");
  const [address, setAddress] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);
  var token = localStorage?.getItem("token");
  token = JSON.parse(token);

  // const dispatch = useDispatch();
  console.log("Printing Cart");
  console.log(cart);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const toastId = toast.loading("Loading...");

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3001/api/v1/login", {
        email: inputUsername,
        password: inputPassword,
      });

      //   console.log(response.data.success);

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
  };

  const handleSubmit1 = async (event) => {
    event.preventDefault();
    const toastId = toast.loading("Loading...");

    // console.log(
    //   address + city + state + country + pincode + phone + instructions
    // );

    const orderItems = Object.values(
      cart.reduce((acc, item) => {
        if (acc[item._id]) {
          acc[item?._id].quantity += 1; // Increase quantity for existing product ID
        } else {
          acc[item?._id] = { product: item?._id, quantity: 1 }; // Initialize quantity for new product ID
        }
        return acc;
      }, {})
    );

    console.log(orderItems);

    const orderData = {
      address,
      city,
      state,
      country,
      pincode,
      phoneNo: phone,
      instructions,
      totalItems: orderItems.length,
      totalAmount,
      orderItems,
    };

    console.log(orderData);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/api/v1/order/createorder",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );

      //   console.log(response.data.success);
      console.log(response);
      // if (response.data.success === true) {
      //   toast.success("Logged in successfully", { id: toastId });
      //   localStorage.setItem("token", JSON.stringify(response.data.token));
      //   localStorage.setItem("user", JSON.stringify(response.data.user));
      //   navigate("/cart");
      // } else {
      //   toast.error("Invalid credentials", { id: toastId });
      // }
      dispatch(clearCart());
      // navigate("/profile/orders");
      navigate("/profile/orders");

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Invalid credentials", { id: toastId });
      setLoading(false);
    }

    toast.dismiss(toastId);
    navigate("/profile/orders");
    // const toastId = toast.loading("Loading...");
  };

  return (
    <div>
      <Form
        className=" bg-white rounded first-letter:
        shadow-md p-10 max-w-xl mx-auto
      "
        onSubmit={handleSubmit1}
      >
        <div className="text-black text-4xl font-medium leading-7 tracking-widest whitespace-nowrap mb-4 mt-4">
          Order credentials
        </div>

        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <div className="bg-black shrink-0 h-px mt-4 mb-4" />
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>

        <div className="items-stretch flex justify-between gap-5 mt-10"></div>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            value={state}
            placeholder="State"
            onChange={(e) => setState(e.target.value)}
            required
          />
        </Form.Group>

        <div className="items-stretch flex justify-between gap-5 mt-10"></div>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </Form.Group>

        <div className="items-stretch flex justify-between gap-5 mt-10"></div>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>pincode</Form.Label>
          <Form.Control
            type="number"
            value={pincode}
            placeholder="Pincode"
            onChange={(e) => setPincode(e.target.value)}
            required
          />
        </Form.Group>

        <div className="items-stretch flex justify-between gap-5 mt-10"></div>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>phone number</Form.Label>
          <Form.Control
            type="number"
            value={phone}
            placeholder="Phone no."
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <div className="items-stretch flex justify-between gap-5 mt-10"></div>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>instructions</Form.Label>
          <Form.Control
            type="text"
            value={instructions}
            placeholder="instructions"
            onChange={(e) => setInstructions(e.target.value)}
          />
        </Form.Group>

        <div className="items-stretch flex justify-between gap-5 mt-10"></div>

        <Button
          className="bg-slate-500 hover:bg-red-500 transition-colors duration-200 ease-in-out cursor-pointer  p-3 mr-3"
          variant="primary"
          type="submit"
          // disabled={loading}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Payment;
