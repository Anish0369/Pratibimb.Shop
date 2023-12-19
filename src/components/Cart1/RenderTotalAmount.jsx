import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "./IconBtn";

// import { buyCourse } from '../../../../services/operations/studentFeaturesAPI'
import { useNavigate } from "react-router-dom";

const RenderTotalAmount = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-pure-greys-100 p-6">
      <p className="mb-1 text-1xl font-medium text-richblack-600">Total</p>
      <p className="mb-6 text-3xl font-medium text-richblack-500">
        ₹ {totalAmount}
      </p>
      <IconBtn
        text="Buy Now "
        // onclick={handleBuyCourse}
        customClass="w-full justify-center"
      />
    </div>
  );
};

export default RenderTotalAmount;
