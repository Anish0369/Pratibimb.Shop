import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
// import { removeFromCart } from "../../../../slices/cartSlice";
import { remove } from "../../redux/Slices/CartSlice";

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-1 flex-col rounded border-richblack-800 border-[1px] p-5">
      {cart.map((product, index) => (
        <div
          key={index}
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${index !== 0 && "mt-6"}`}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-5">
            <img
              className="h-[148px] w-[220px] rounded-lg object-cover"
              src={product?.image}
              alt="image thumbnail"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-richblack-600">
                {product?.name}
              </p>
              <p className="text-sm text-richblack-300">
                {product?.category?.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-5">4.8</span>
                <ReactStars
                  count={5}
                  value={4}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                />
                <span className="text-richblack-400">{4} Ratings</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 items-end">
            <button
              onClick={() => dispatch(remove(product._id))}
              className="flex gap-3 items-center text-pink-200 bg-richblack-800 p-3 rounded-lg"
            >
              <RiDeleteBin6Line size={20} />
            </button>
            <p className="mb-6 text-3xl font-medium text-richblack-500">
              ₹ {product?.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
