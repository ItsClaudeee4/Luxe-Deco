import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { getCartAmout, currency, delivery_fee } = useContext(ShopContext);
  return (
    <div className="w-full ">
      <div className="text-2xl">
        <Title text1={"إجماليات"} text2={"سلة التسوق"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between  ">
          <p>المجموع الفرعي</p>
          <p>
            {" "}
            {currency} {getCartAmout()}.00{" "}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>رسوم الشحن</p>
          <p>
            {" "}
            {currency} {delivery_fee}.00{" "}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>المجموع</p>
          <p>
            {" "}
            {currency}{" "}
            {getCartAmout() === 0 ? 0 : getCartAmout() + delivery_fee}.00{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
