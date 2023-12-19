import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/CartSlice";
import { useNavigate } from "react-router-dom";

const Product = ({ post }) => {
  const { cart } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(post._id));
    toast.error("Item removed from Cart");
  };

  const isInCart = cart.some((p) => p._id === post._id);

  return (
    <div className="bg-white shadow-md border  rounded-lg overflow-hidden w-[300px] max-w-sm mx-auto">
      <div className="relative">
        <img
          src={post.image}
          alt={post.name}
          className="w-full h-56 object-cover cursor-pointer"
          onClick={() => navigate(`/product/${post._id}`)}
        />
        <div className="absolute top-2 right-2">
          <button
            className={`text-white rounded-full px-3 py-1 focus:outline-none transition duration-300 ease-in ${
              isInCart ? "bg-red-500" : "bg-green-500"
            }`}
            onClick={isInCart ? removeFromCart : addToCart}
          >
            {isInCart ? "Remove" : "Add"}
          </button>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-gray-800 font-semibold text-lg mb-2 truncate">
          {post.name}
        </h2>
        <p className="text-gray-600 line-clamp-3">{post.description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-green-600 font-semibold">{post.price}/-</p>
          <button
            className="text-gray-700 bg-gray-200 rounded-full px-3 py-1 text-xs uppercase hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition duration-300 ease-in"
            onClick={() => navigate(`/product/${post._id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
