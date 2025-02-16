"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [cartStorage, setCartStorage] = useState([]);
  const [cartData, setCartData] = useState();
  const [userData, setUserData] = useState();
  const [removeCart, setRemoveCart] = useState(false);
  const [cartLoaded, setCartLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUserData(storedUser);
      const updatedCart = storedCart.map((item) => ({
        ...item,
        quantity: item.quantity ?? 1, // Ensure quantity persists
      }));
      setCartStorage(updatedCart);
      setCartLoaded(true);
    }
  }, []);

  // console.log("cart", cartStorage);
console.log("cartLength", cartStorage.length);

  useEffect(() => {
    if(cartLoaded && cartStorage?.length === 0) {
      router.push("/");
    }
  }, [cartLoaded, cartStorage, router]);

  const totalFoodCharges = cartStorage.reduce(
    (sum, item) => sum + item.food_price * item.quantity,
    0
  );
  const tax = totalFoodCharges * 0.1;
  const deliveryCharges = totalFoodCharges > 0 ? 50 : 0;
  const totalAmount = totalFoodCharges + tax + deliveryCharges;

  const handleCheckout = async () => {
    let user_id = JSON.parse(localStorage.getItem("user"))._id;
    let city = JSON.parse(localStorage.getItem("user")).city;
    let cart = JSON.parse(localStorage.getItem("cart"));
    let foodItemsIds = cart.map((item) => item._id).toString();
    let restaurant_id = cart[0].restaurant_id;

    let deliveryBoyResponse = await fetch(`http://localhost:3000/api/deliveryPartners/${city}`);
    deliveryBoyResponse = await deliveryBoyResponse.json();
    let deliveryBoysIds = deliveryBoyResponse.result.map((item) => item._id);
    let deliveryBoy_id = deliveryBoysIds[Math.floor(Math.random() * deliveryBoysIds.length)];
    if(!deliveryBoy_id) {
      toast.error("Delivery Partner are not available");
      return false;
    }
    let status = "confirm";
    let amount = totalAmount;
    let orderDetails = {
      user_id,
      foodItemsIds,
      restaurant_id,
      deliveryBoy_id,
      status,
      amount,
    };

    // console.log("orderDetails", orderDetails);

    const response = await fetch(`http://localhost:3000/api/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    });

    const res = await response.json();

    if (res.success) {
      toast.success("Order confirmed");
      setRemoveCart(true);
      router.push("/myProfile");
    } else {
      toast.error("Order Confirmation Failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <CustomerHeader cartData={cartData} removeCart={removeCart} />
      <div className="flex-grow">
        <h3 className="h3-gradient mt-10 mb-4">Confirm Your Order</h3>
        <div className="flex flex-col lg:flex-row container mx-auto p-6 gap-x-8">
          {/* Cart Table */}
          <div className="w-full lg:w-2/4 mt-6">
            <div className="gradient-border-box w-full overflow-x-auto">
              <div className="p-6 bg-white">
                <h3 className="text-2xl my-4 font-semibold gradient-text text-start">
                  User Details
                </h3>
                <div className="flex justify-between mb-2">
                  <span>Name</span>
                  <span className="text-orange-600 font-semibold">
                    {userData?.username}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Address</span>
                  <span className="text-orange-600 font-semibold">
                    {userData?.full_address}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>City</span>
                  <span className="text-orange-600 font-semibold">
                    {userData?.city}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Contact</span>
                  <span className="text-orange-600 font-semibold">
                    {userData?.contact}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Payment Method</span>
                  <span className="text-orange-600 font-semibold">
                    Cash On Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Order Summary */}
          <div className="relative w-full bg-gradient shadow-md shadow-orange-500 text-white rounded-lg lg:w-2/4 p-6 mt-6">
            <h3 className="text-2xl my-4 font-semibold text-start">
              Order Summary
            </h3>
            <div className="flex justify-between mb-2">
              <span>Total Food Charges:</span>
              <span className="font-semibold">
                ₹{totalFoodCharges.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax:</span>
              <span className="font-semibold">₹{tax}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Charges:</span>
              <span className="font-semibold">₹{deliveryCharges}</span>
            </div>
            <hr />
            <div className="flex justify-between mt-4">
              <span className="font-semibold text-lg">Total Amount:</span>
              <span className="font-semibold">₹{totalAmount}</span>
            </div>
          </div>
        </div>
        <div className="container mx-auto p-6 my-4">
          <button
            className="mt-6 px-6 py-3 w-full rounded-lg bg-gradient text-white font-semibold shadow-md transition-transform duration-300 transform hover:scale-105 active:scale-95"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
