import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import SplitButton from "react-bootstrap/SplitButton";

// import Home from "../components/Home";

const Home1 = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [nposts, setNposts] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState(null);
  const location = useLocation();
  // navigate
  const navigate = useNavigate();
  const [sproducts, setSProducts] = useState([]); // Changing state variable name to sproducts
  // const [totalPages, setTotalPages] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100); // Set your initial maximum price value

  const handleMinChange = (event) => {
    setMinPrice(parseInt(event.target.value));
  };

  const handleMaxChange = (event) => {
    setMaxPrice(parseInt(event.target.value));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        let category = searchParams.get("category");
        let minPrice = searchParams.get("minprice");
        let maxPrice = searchParams.get("maxprice");
        let query = searchParams.get("query");

        // Set default values if parameters are not present in the URL
        if (!minPrice) {
          minPrice = "0"; // Default minimum price
        }
        if (!maxPrice) {
          maxPrice = "100000"; // Default maximum price
        }
        if (!query) {
          query = ""; // Default query string
        }

        const queryParams = {
          minPrice,
          maxPrice,
        };

        // Add category to queryParams only if it exists in the URL
        if (category) {
          queryParams.category = category;
        }

        // Add query to queryParams only if it exists in the URL
        if (query) {
          queryParams.query = query;
        }

        const response = await axios.get(
          "http://localhost:3001/api/v1/product/search",
          {
            params: {
              ...queryParams,
            },
          }
        );

        setSProducts(response.data.products);
        setNposts(response.data.products); // Setting sproducts state
        console.log(response.data.products);
        // setTotalPages(response.data.totalPages);
      } catch (error) {
        // setError(error.message);
      }
    };

    fetchProducts();
  }, [location.search]);

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

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const categoryName = searchParams.get('category');

  //   if (categoryName) {
  //     fetchCategory(categoryName);
  //   }
  // }, [location.search]);

  // const fetchCategory = async (categoryName) => {
  //   try {
  //     const response = await fetch(`http://localhost:3001/api/v1/product/?category=${categoryName}`);

  //     if (!response.ok) {
  //       throw new Error('Unable to fetch category');
  //     }

  //     const data = await response.json();
  //     setCategoryDetails(data.response);
  //   } catch (error) {

  //   }
  // };

  // async function fetchProductData() {
  //   setLoading(true);

  //   try {
  //     const res = await fetch(API_URL);
  //     const data = await res.json();

  //     setPosts(data);
  //   } catch (error) {
  //     console.log("Error aagya ji1");
  //     setPosts([]);
  //   }
  //   setLoading(false);
  // }

  // useEffect(() => {
  //   fetchProductData();
  // }, []);

  // async function fetchProductData1() {
  //   setLoading(true);

  //   try {
  //     const res = await fetch(
  //       "http://localhost:3001/api/v1/product/getallproducts"
  //     );
  //     const data = await res.json();
  //     console.log(data.allProducts);
  //     setNposts(data.allProducts);

  //     // setPosts(data);
  //   } catch (error) {
  //     console.log("Error aagya ji");
  //     setPosts([]);
  //   }
  //   setLoading(false);
  // }

  // useEffect(() => {
  //   fetchProductData1();
  // }, []);

  const [value, setValue] = useState([]);

  //   return (
  //     <div>
  //       {loading ? (
  //         <Spinner />
  //       ) : posts.length > 0 ? (
  //         <div className="grid  xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
  //           {posts.map((post) => (
  //             <Product key={post.id} post={post} />
  //           ))}
  //         </div>
  //       ) : (
  //         <div className="flex justify-center items-center">
  //           <p>No Data Found</p>
  //         </div>
  //       )}
  //     </div>
  //   );
  // };

  const handleInputChange = (event) => {
    if (event.key === "Enter") {
      const searchParams = new URLSearchParams(location.search);
      let category = searchParams.get("category");

      if (!category) {
        navigate(`/home?query=${event.target.value}`);
      } else {
        navigate(`/home?category=${category}&query=${event.target.value}`);
      }

      console.log(event.target.value);
    }
  };

  return (
    <div>
      {/* <Home /> */}
      <InputGroup className="mb-3 mt-2 max-w-md mx-auto">
        <Form.Control
          aria-label="Text input with dropdown button"
          onKeyPress={handleInputChange}
        />
        <SplitButton
          variant="outline-secondary"
          title={category == null ? "All Categories" : category}
          id="segmented-button-dropdown-2"
          alignRight
        >
          {categoryDetails && (
            <div>
              <Dropdown.Item
                onClick={() => {
                  setCategory(null);
                  navigate(`/home`);
                }}
              >
                All Categories
              </Dropdown.Item>

              {categoryDetails.map((category) => (
                <Dropdown.Item
                  key={category._id}
                  // eventKey={category.name}
                  onClick={() => {
                    setCategory(category.name);
                    navigate(`/home?category=${category.name}`);
                  }}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
            </div>
          )}
        </SplitButton>
      </InputGroup>
      {/* 
      <Form.Label>
        Price Range: ${minPrice} - ${maxPrice}
      </Form.Label>
      <div
        className="d-flex justify-content-between
      align-items-center  
      "
      >
        <Form.Range
          value={minPrice}
          onChange={handleMinChange}
          min={0}
          max={maxPrice - 1}
          className="w-50
             "
        />
        <Form.Range
          value={maxPrice}
          onChange={handleMaxChange}
          min={minPrice + 1}
          max={1000} // Set your maximum value for the maximum price
          className="w-50"
        />
      </div> */}

      {/* {loading ? (
        <Spinner />
      ) : nposts.length > 0 ? (
        <div className="grid  xs:gridcols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 ">
          {nposts.map((post) => (
            <Product
              key={post._id}
              post={post}
              onClick={() => {
                navigate(`/product/${post._id}`);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>No Data Found</p>
        </div>
      )} */}
      <div className="h-[30px]"></div>
      {loading ? (
        <Spinner />
      ) : nposts.length > 0 ? (
        <div className="mt-3 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nposts.map((post) => (
            <div key={post._id} className="relative group">
              <Product
                post={post}
                onClick={() => navigate(`/product/${post._id}`)}
              />
              {/* <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className="text-lg font-semibold">{post.name}</h3>
                <p className="text-sm">{post.description}</p>
              </div> */}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>No Data Found</p>
        </div>
      )}
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

export default Home1;
