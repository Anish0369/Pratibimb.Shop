import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item._id));
    toast.success("Item Removed");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md mb-4">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-24 h-24 overflow-hidden rounded-md">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform transform hover:scale-110"
          />
          <button
            className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-1 hover:bg-red-500 hover:text-white transition duration-300"
            onClick={removeFromCart}
          >
            <AiFillDelete className="text-xl" />
          </button>
        </div>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-800">{item.name}</h1>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="text-lg font-bold text-green-600">{item.price}/-</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
