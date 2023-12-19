import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
// import Product from "../components/Product";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import Home from "../components/Home";
//         "http://localhost:3001/api/v1/product/getallproducts"
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/CartSlice";

const Product = () => {
  const { id } = useParams();
  console.log(id);

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const { cart } = useSelector((state) => state);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(product));
    toast.success("Item added to Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(product?._id));
    toast.error("Item removed from Cart");
  };

  // Function to get product by ID
  const getProductById = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/product/getproduct/${productId}`
      );
      if (!response.ok) {
        throw new Error("Unable to fetch product data");
      }
      const data = await response.json();
      setProduct(data.product);
      console.log(data.product);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    // Call getProductById with the dynamic 'id' from URL parameters
    getProductById(id);
  }, [id]);

  return (
    <div className="bg-white flex flex-col items-center">
      <div className="bg-black self-stretch min-h-[1px] w-full mt-4 max-md:max-w-full" />
      <div className="flex w-full max-w-[1171px] flex-col mt-20 px-px items-start max-md:max-w-full max-md:mt-10">
        <div className="self-stretch mt-20 px-5 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[49%] ml-5 max-md:w-full max-md:ml-0">
              <div className="justify-center items-stretch rounded bg-neutral-100 flex grow flex-col w-full px-7 py-12 max-md:max-w-full max-md:mt-8 max-md:px-5">
                <img
                  loading="lazy"
                  srcSet={product?.image}
                  className="aspect-[1.42] object-contain object-center w-full overflow-hidden mt-28 mb-14 max-md:max-w-full max-md:my-10"
                />
              </div>
            </div>
            <div className="flex flex-col items-stretch w-[36%] ml-5 max-md:w-full max-md:ml-0">
              <div className="flex grow flex-col max-md:mt-8">
                <div className="text-black text-2xl font-semibold leading-6 tracking-wider self-stretch">
                  {product?.name}
                </div>
                <div className="items-stretch self-stretch flex justify-between gap-4 mt-3.5">
                  <div className="flex justify-between gap-2 items-start">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c35d903ef32712f74f1d691c7776b06b738b9c9c861a4482d47d9f9e4b9b6d4a?"
                      className="aspect-[5] object-contain object-center w-[100px] items-start overflow-hidden shrink-0 max-w-full"
                    />
                    <div className="text-black text-sm leading-5">
                      (150 Reviews)
                    </div>
                  </div>
                  <div className="text-green-500 text-sm leading-5 whitespace-nowrap items-stretch justify-center pl-4">
                    {product?.quantity > 0 ? (
                      <div className="text-green-500 text-sm leading-5 whitespace-nowrap items-stretch justify-center pl-4">
                        In Stock
                      </div>
                    ) : (
                      <div className="text-red-500 text-sm leading-5 whitespace-nowrap items-stretch justify-center pl-4">
                        Out of Stock
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-black text-2xl leading-6 tracking-wider self-stretch mt-4">
                  {product?.price}
                </div>
                <div className="text-black text-sm leading-5 self-stretch mt-7">
                  {product?.description}
                </div>
                <div className="bg-black self-stretch shrink-0 h-px mt-7" />

                {/* <div className="items-center self-stretch flex justify-between gap-5 mt-6">
                  <div className="text-black text-xl leading-5 tracking-wide grow whitespace-nowrap my-auto">
                    Size:
                  </div>
                  <div className="items-stretch self-stretch flex gap-4 pr-20 max-md:pr-5">
                    <div className="text-black text-sm font-medium leading-5 whitespace-nowrap justify-center items-center rounded border aspect-square h-8 px-2 border-solid border-black border-opacity-50">
                      XS
                    </div>
                    <div className="text-black text-sm font-medium leading-5 whitespace-nowrap justify-center items-center rounded border aspect-square h-8 px-3.5 border-solid border-black border-opacity-50">
                      S
                    </div>
                    <div className="text-neutral-50 text-sm font-medium leading-5 whitespace-nowrap justify-center items-center rounded bg-red-500 aspect-square h-8 px-3">
                      M
                    </div>
                    <div className="text-black text-sm font-medium leading-5 whitespace-nowrap justify-center items-center rounded border aspect-square h-8 px-3.5 border-solid border-black border-opacity-50">
                      L
                    </div>
                    <div className="text-black text-sm font-medium leading-5 whitespace-nowrap justify-center items-center rounded border aspect-square h-8 px-2.5 border-solid border-black border-opacity-50">
                      XL
                    </div>
                  </div>
                </div> */}
                <div className="self-stretch flex justify-between gap-4 mt-6 px-px items-start max-md:justify-center">
                  <div className="items-stretch self-stretch flex gap-0 max-md:justify-center">
                    <div
                      className="text-black text-xl font-medium leading-7 whitespace-nowrap justify-center items-stretch grow px-9 py-4 border-y-black border-y-opacity-50 border-t border-solid border-b max-md:px-5"
                      onClick={addToCart}
                    >
                      Add to Cart
                    </div>
                  </div>
                </div>
                <div className="rounded border self-stretch flex w-full flex-col items-stretch mt-10 py-6 border-solid border-black border-opacity-50">
                  <div className="items-center flex gap-4 ml-4 self-start max-md:ml-2.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a23f35277ec287bdea2870638bbdacf171666c11a657aa3e10b9901a2334e8b?"
                      className="aspect-square object-contain object-center w-10 overflow-hidden shrink-0 max-w-full my-auto"
                    />
                    <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                      <div className="text-black text-base font-medium leading-6">
                        Free Delivery
                      </div>
                      <div className="text-black text-xs font-medium leading-5 underline whitespace-nowrap mt-2">
                        <ul>
                          <li>
                            Enter your postal code for Delivery Availability
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="bg-black shrink-0 h-px mt-4" />
                  <div className="items-center flex gap-4 ml-4 mt-4 self-start max-md:ml-2.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8eb9d4232c5c4b5fb4e8c5b395d852ff88717160dc1ebc4089000daaa178e67?"
                      className="aspect-square object-contain object-center w-10 overflow-hidden shrink-0 max-w-full my-auto"
                    />
                    <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
                      <div className="text-black text-base font-medium leading-6">
                        Return Delivery
                      </div>
                      <div className="text-black text-xs font-medium leading-5 underline whitespace-nowrap mt-2">
                        <ul>
                          <li>Free 30 Days Delivery Returns. </li>
                          <li>Details</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="items-stretch flex gap-4 mt-36 px-5 max-md:mt-10">
          <div className="rounded bg-red-500 flex w-5 shrink-0 h-10 flex-col" />
          <div className="text-red-500 text-base font-semibold leading-5 self-center my-auto">
            Related Item
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

export default Product;
