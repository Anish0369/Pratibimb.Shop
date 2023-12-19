import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import "./home.css";
import { Carousel } from "react-bootstrap";
import Product from "./Product";
// import "bootstrap/dist/css/bootstrap.css";

import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [products, setProducts] = useState(null);

  const categoriesPerSlide = 5;

  async function fetchProductData() {
    try {
      const res = await fetch("http://localhost:3001/api/v1/product/popular");
      const data = await res.json();

      setProducts(data.popularProducts);
      console.log(data.popularProducts);
    } catch (error) {
      console.log("Error aagya ji1");
      setProducts([]);
    }
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    // fetch alll categories

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/category/getallcategories"
        );
        setCategoryDetails(response.data.categories);
        console.log(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  function chunkArray(array, size) {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  }

  return (
    <div>
      <div className="bg-green-200 flex flex-col justify-center items-center px-16 py-12 max-md:px-5">
        <div className="flex w-full max-w-[1379px] flex-col items-stretch mt-1 mb-20 max-md:max-w-full max-md:mb-10">
          <div className="mt-32 max-md:max-w-full max-md:mt-10">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-[55%] max-md:w-full max-md:ml-0">
                <div className="flex flex-col my-auto items-start max-md:max-w-full max-md:mt-10">
                  <div className="text-green-900 text-6xl font-bold self-stretch max-md:max-w-full max-md:text-4xl">
                    Discover and Find Your Own Fashion!
                  </div>
                  <div className="text-green-700 text-2xl font-medium leading-[53px] self-stretch mt-16 max-md:max-w-full max-md:mt-10">
                    Explore our curated collection of stylish clothing and
                    accessories tailored to your unique taste.
                  </div>
                  <div
                    className="text-white text-xl font-medium uppercase whitespace-nowrap shadow-2xl bg-green-700 justify-center items-stretch mt-16 px-16 py-8 rounded max-md:mt-10 max-md:pl-5 max-md:pr-6
                  hover:bg-green-900
                  
                  "
                    onClick={() => navigate("/shop")}
                  >
                    Explore Now
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[45%] ml-5 max-md:w-full max-md:ml-0">
                <div className="flex-col shadow-lg overflow-hidden relative flex min-h-[717px] grow pl-6 pr-3 py-12 items-end max-md:max-w-full max-md:mt-10 max-md:pl-5">
                  <img
                    loading="lazy"
                    srcSet="..."
                    className="absolute h-full w-full object-cover object-center inset-0"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/77bc484338df2e4ef89a49bfd9f759ca99f4f6e38efda8f19f357ec909e8c363?"
                    className="aspect-[1.08] object-contain object-center w-[119px] overflow-hidden max-w-full mt-28 max-md:mt-10"
                  />
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/77bc484338df2e4ef89a49bfd9f759ca99f4f6e38efda8f19f357ec909e8c363?"
                    className="aspect-[1.08] object-contain object-center w-[119px] overflow-hidden max-w-full mt-64 mb-8 self-start max-md:mt-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black self-stretch min-h-[1px] w-full mt-4 max-md:max-w-full" />
      {/*  categories  */}
      <div className="items-stretch flex flex-col">
        <div className="items-stretch flex w-full justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <div className="flex flex-col px-5 items-start">
            <div className="items-stretch flex gap-4 mt-3">
              <div className="rounded bg-green-500 flex w-5 shrink-0 h-10 flex-col" />
              <div className="text-green-500 text-base font-semibold leading-5 self-center my-auto">
                Categories
              </div>
            </div>
            <div className="text-black text-4xl font-semibold leading-10 tracking-widest self-stretch whitespace-nowrap mt-5">
              Browse By Category
            </div>
          </div>

          <div className="items-stretch flex gap-2 mt-16 self-end max-md:mt-10">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d46c131187bfff9eb633481579a064341b51d7196040ee40dd3f9577e445a5e?"
              className="aspect-square object-contain object-center w-[46px] overflow-hidden shrink-0 max-w-full"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e88e31fcac886e936832d43b7fb2b7a3e219274da66d8e9d07a08a6cc7094c1b?"
              className="aspect-square object-contain object-center w-[46px] overflow-hidden shrink-0 max-w-full"
            />
          </div>
        </div>

        <div className="mx-auto flex justify-between gap-5 mt-16 px-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center max-md:mt-10">
          <Carousel indicators={false} controls={true} interval={2000}>
            {categoryDetails &&
              categoryDetails.map(
                (category, index) =>
                  index % categoriesPerSlide === 0 && (
                    <Carousel.Item key={index}>
                      <div className="d-flex justify-content-between mb-2">
                        {categoryDetails
                          .slice(index, index + categoriesPerSlide)
                          .map((cat, idx) => (
                            <div
                              className="ml-6 mr-6 justify-center items-center rounded border flex grow basis-[0%] flex-col px-14 py-7 border-solid border-black border-opacity-30 max-md:px-5"
                              key={idx}
                              onClick={() =>
                                navigate(`/home?category=${cat.name}`)
                              }
                            >
                              <img
                                loading="lazy"
                                src={cat?.image}
                                className="aspect-[1.04] object-contain object-center w-[58px] overflow-hidden"
                                alt={cat.name}
                              />
                              <div className="text-black text-base leading-6 self-stretch whitespace-nowrap mt-6">
                                {cat?.name}
                              </div>
                            </div>
                          ))}
                      </div>
                    </Carousel.Item>
                  )
              )}
          </Carousel>
        </div>
      </div>
      <div className="bg-black self-stretch min-h-[1px] w-full mt-4 max-md:max-w-full" />
      {/* popular products*/}

      <div className="items-stretch flex flex-col">
        <div className="items-stretch flex w-full justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <div className="flex flex-col px-5 items-start">
            <div className="items-stretch flex gap-4">
              <div className=" mt-4 rounded bg-green-500 flex w-5 shrink-0 h-10 flex-col" />
              <div className="mt-4 text-green-500 text-base font-semibold leading-5 my-auto">
                Our Products
              </div>
            </div>
            <div className="text-black text-4xl font-semibold leading-10 tracking-widest self-stretch whitespace-nowrap mt-5">
              Popular Products
            </div>
          </div>
        </div>

        {/* want to render the products in the carousel */}
        <Carousel
          className="mb-8
        
        "
        >
          {products?.map((post, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center align-items-center">
                <Product
                  key={post._id}
                  post={post}
                  onClick={() => {
                    navigate(`/product/${post._id}`);
                  }}
                  style={{ width: "100%", height: "auto" }} // Adjust the style here
                />
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div className="bg-black self-stretch min-h-[1px] w-full mt-4 max-md:max-w-full" />

      {}
      <div className="justify-center max-w-[943px] mx-auto mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[32%] max-md:w-full max-md:ml-0">
            <div className="items-center flex grow flex-col px-5 max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f2409c3a6d594d91866d1be063295c6e035f78b68299a5673e7837300b5a6e76?"
                className="aspect-square object-contain object-center w-20 overflow-hidden max-w-full"
              />
              <div className="text-black text-xl font-semibold leading-7 self-stretch whitespace-nowrap mt-6">
                FREE AND FAST DELIVERY
              </div>
              <div className="text-black text-center text-sm leading-5 self-stretch whitespace-nowrap mt-2">
                Free delivery for all orders over $140
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[34%] ml-5 max-md:w-full max-md:ml-0">
            <div className="items-center flex grow flex-col px-2 max-md:mt-15">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/865fd056017e1dd08639713c015122efe0d8679cbf553e354fb640476b2096a6?"
                className="aspect-square object-contain object-center w-20 overflow-hidden max-w-full"
              />
              <div className="text-black text-xl font-semibold leading-7 self-stretch whitespace-nowrap mt-6">
                24/7 CUSTOMER SERVICE
              </div>
              <div className="text-black text-sm leading-5 self-stretch whitespace-nowrap mt-2">
                Friendly 24/7 customer support
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
            <div className="items-stretch flex grow flex-col px-5 max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3c1be3f37cdea8175ea2ee7a50fd0510114f5e02888e1167452b59c532555006?"
                className="aspect-square object-contain object-center w-20 overflow-hidden self-center max-w-full"
              />
              <div className="text-black text-xl font-semibold leading-7 whitespace-nowrap mt-6">
                MONEY BACK GUARANTEE
              </div>
              <div className="text-black text-sm leading-5 self-center whitespace-nowrap mt-2">
                We reurn money within 30 days
              </div>
            </div>
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

export default Home;
