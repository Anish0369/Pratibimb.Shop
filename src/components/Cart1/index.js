import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart1() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div>
      <h1 className="text-4xl mb-10 font-semibold">Your Cart</h1>
      <p className="text-richblack-200 mb-5 border-b border-richblack-200 pb-3">
        {totalItems} Courses in cart
      </p>
      {total > 0 ? (
        <div className="flex lg:flex-row flex-col items-start gap-x-10 gap-y-6 mt-8">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-richblack-100">
          Your Cart is empty
        </p>
      )}
    </div>
  );
}
