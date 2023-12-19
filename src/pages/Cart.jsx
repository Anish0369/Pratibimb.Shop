import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const calculateTotal = cart.reduce((acc, curr) => acc + curr.price, 0);
    setTotalAmount(calculateTotal);
  }, [cart]);

  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <CartItem key={item.id} item={item} itemIndex={index} />
              ))}
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-gray-100 rounded-lg p-6">
              <h2 className="text-3xl font-semibold mb-4">Summary</h2>
              <p className="text-lg text-gray-700 mb-4">
                Total Items:{" "}
                <span className="font-semibold">{cart.length}</span>
              </p>
              <p className="text-2xl font-bold text-green-700 mb-6">
                Total Amount:{" "}
                <span className="font-semibold">${totalAmount}</span>
              </p>
              <button
                onClick={() => navigate("/payment")}
                className="w-full bg-green-600 text-white rounded-lg py-3 font-semibold text-xl transition duration-300 hover:bg-green-700"
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-80">
          <h1 className="text-gray-700 text-2xl font-semibold mb-4">
            Your cart is empty!
          </h1>
          <Link to={"/"}>
            <button className="uppercase bg-green-600 text-white rounded-lg py-3 px-8 font-semibold text-xl transition duration-300 hover:bg-green-700">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
