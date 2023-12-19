import { FaShoppingCart } from "react-icons/fa";
// import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// get link

const Navbar = () => {
  const { cart } = useSelector((state) => state);

  const { token } = useSelector((state) => state.auth);
  console.log(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // return (
  //   <div>
  //     <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
  //       <NavLink to="/">
  //         <div className="ml-5">
  //           <img src="../logo.png" className="h-14" />
  //         </div>
  //       </NavLink>

  //       <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
  //         <NavLink to="/">
  //           <p>Home</p>
  //         </NavLink>

  //         {token ? (
  //           <NavLink to="/profile">
  //             <p>Profile</p>
  //           </NavLink>
  //         ) : (
  //           <div>
  //             <NavLink to="/login">
  //               <p>Login</p>
  //             </NavLink>
  //           </div>
  //         )}

  //         {!token && (
  //           <div>
  //             <NavLink to="/logout">
  //               <p>Register</p>
  //             </NavLink>
  //           </div>
  //         )}

  //         <NavLink to="/cart">
  //           <div className="relative">
  //             <FaShoppingCart className="text-2xl" />
  //             {cart.length > 0 && (
  //               <span
  //                 className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex
  //                   justify-center items-center animate-bounce rounded-full text-white"
  //               >
  //                 {cart.length}
  //               </span>
  //             )}
  //           </div>
  //         </NavLink>
  //       </div>
  //     </nav>
  //   </div>
  // );

  return (
    <div className="bg-white flex flex-col items-center">
      <div className="items-center flex w-full max-w-[1170px] justify-between gap-5 mt-10 max-md:max-w-full max-md:flex-wrap">
        <div className="items-center flex justify-between gap-5 my-auto px-5 max-md:max-w-full max-md:flex-wrap">
          <Link to="/">
            <div className="text-black text-2xl font-bold leading-6 tracking-wider my-auto">
              प्रतिबिंब
            </div>
          </Link>

          <div className="items-start self-stretch flex justify-between gap-5 px-px py-1 max-md:justify-center">
            <Link to="/home">
              <div className="text-black text-center text-base leading-6 self-start">
                Shop
              </div>
            </Link>
            <Link to="/contact">
              <div className="text-black text-center text-base leading-6 self-start">
                Contact
              </div>
            </Link>

            {!token && (
              <Link to="/signup">
                <div className="text-black text-center text-base leading-6 self-stretch">
                  signup
                </div>
              </Link>
            )}

            {!token && (
              <Link to="/login">
                <div className="text-black text-center text-base leading-6 self-stretch">
                  Login
                </div>
              </Link>
            )}
          </div>
        </div>
        <div className="items-stretch self-stretch flex justify-between gap-5">
          <div className="justify-center items-stretch rounded bg-neutral-100 flex grow basis-[0%] flex-col pl-5 pr-3 py-2">
            <div className="justify-between items-center flex gap-5">
              <div className="text-black text-xs leading-5 my-auto">
                What are you looking for?
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a36546edd30f9649053810fdbf6c98d92541e863e7b8b10ab13af855343b34e?"
                className="aspect-square object-contain object-center w-6 overflow-hidden self-stretch shrink-0 max-w-full"
              />
            </div>
          </div>
          {/*  on hover bg shoul be red */}

          <div className="justify-center items-stretch self-center flex gap-4 my-auto px-5">
            <Link to="/wishlist">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/850597cc14d3bfef027aa097fc5bca3ac1b650d683dc1d3c8c0134d5cd9a061d?"
                className="aspect-square object-contain object-center w-8 overflow-hidden shrink-0 max-w-full
              hover:bg-red-500"
              />
            </Link>

            <Link to="/cart">
              <div className="relative">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/27e6583cc2b0ad6384fa0e09ba54d132ea13906a2c9553ea3ae9481ef2628ff7?"
                  className="aspect-square object-contain object-center w-8 justify-center items-center overflow-hidden shrink-0 max-w-full"
                />
                {cart.length > 0 && (
                  <span
                    className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex
                    justify-center items-center animate-bounce rounded-full text-white"
                  >
                    {cart.length}
                  </span>
                )}
              </div>
            </Link>
            {/* <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/27e6583cc2b0ad6384fa0e09ba54d132ea13906a2c9553ea3ae9481ef2628ff7?"
              className="aspect-square object-contain object-center w-8 justify-center items-center overflow-hidden shrink-0 max-w-full"
            /> */}

            {token && (
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/505a01368e57ac667ecd551fd161eb3fa8202cee72841e5b11d9f712055e4607?"
                className="aspect-square object-contain object-center w-8 overflow-hidden shrink-0 max-w-full"
                onClick={() => {
                  navigate("/profile/my-profile");
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="bg-black self-stretch min-h-[1px] w-full mt-4 max-md:max-w-full" />
    </div>
  );
};

export default Navbar;
