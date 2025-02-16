"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { AiFillDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [cartStorage, setCartStorage] = useState([]);
  const [removeCartData, setRemoveCartData] = useState();
  const [cartData, setCartData] = useState();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = storedCart.map((item) => ({
        ...item,
        quantity: item.quantity ?? 1, // Ensure quantity persists
      }));
      setCartStorage(updatedCart);
    }
  }, []);

  const handleIncrement = (id) => {
    setCartStorage((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleDecrement = (id) => {
    setCartStorage((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleRemove = (id) => {
    const updatedCart = cartStorage.filter((item) => item._id !== id); // Remove item
    setCartStorage(updatedCart); // Update React state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Persist in localStorage
    setRemoveCartData(id); // Notify `CustomerHeader` to update UI
  };
  // console.log("cart", cartStorage);

  const totalFoodCharges = cartStorage.reduce(
    (sum, item) => sum + item.food_price * item.quantity,
    0
  );
  const tax = totalFoodCharges * 0.1;
  const deliveryCharges = totalFoodCharges > 0 ? 50 : 0;
  const totalAmount = totalFoodCharges + tax + deliveryCharges;

  const handleOrder = () => {
    if(JSON.parse(localStorage.getItem("user"))) {
      router.push("/order");
    } else {
      router.push("/user-auth?order=true")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="flex grow">
        <div className="flex flex-col lg:flex-row gap-8 container mx-auto p-6">
          {/* Cart Table */}
          <div className="w-full lg:w-3/4">
            <h3 className="h3-gradient my-4">Cart</h3>
            <div className="gradient-border-box mt-5 w-full overflow-x-auto">
              <table className="border-collapse w-full mx-auto">
                <thead className="bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800 text-white">
                  <tr>
                    <th className="px-4 py-2 font-semibold text-center">
                      S.No
                    </th>
                    <th className="px-4 py-2 font-semibold text-center">
                      Food Image
                    </th>
                    <th className="px-4 py-2 font-semibold text-center">
                      Food Price
                    </th>
                    <th className="px-4 py-2 font-semibold text-center">
                      Food Quantity
                    </th>
                    <th className="px-4 py-2 font-semibold text-center">
                      Food Subtotal
                    </th>
                    <th className="px-4 py-2 font-semibold text-center">
                      Operations
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cartStorage.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-5 text-lg font-semibold h3-gradient text-center"
                      >
                        No food items yet
                      </td>
                    </tr>
                  ) : (
                    cartStorage.map((item, index) => (
                      <tr
                        key={item._id}
                        className="bg-white hover:bg-gray-50 text-center border-b border-gray-100"
                      >
                        <td className="border px-4 py-2 text-gray-600 text-sm">
                          {index + 1}
                        </td>
                        <td className="border px-4 py-2 text-orange-600 font-semibold text-sm">
                          <div className="flex flex-col items-center justify-center">
                            <img
                              src={item.food_image}
                              alt={item.food_name}
                              className="h-16 w-16 object-cover rounded-md shadow-sm"
                            />
                            <p className="text-xs text-orange-600 ">
                              {item.food_name}
                            </p>
                          </div>
                        </td>
                        <td className="border px-4 py-2 text-gray-600 text-sm">
                          ₹{item.food_price}
                        </td>
                        <td className="border px-4 py-2 text-gray-600 text-sm">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => handleDecrement(item._id)}
                              className="px-3 py-1 bg-gray-200 rounded-md"
                            >
                              -
                            </button>
                            <p className="px-4">{item.quantity}</p>
                            <button
                              onClick={() => handleIncrement(item._id)}
                              className="px-3 py-1 bg-gray-200 rounded-md"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="border px-4 py-2">
                          ₹{(item.food_price * item.quantity).toFixed(2)}
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => handleRemove(item._id)}
                            className="px-3 py-2 rounded-lg text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
                          >
                            <AiFillDelete className="w-6 h-6" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Summary */}
          <div className="h-[350px] relative w-full bg-gradient shadow-md shadow-orange-500 text-white rounded-lg lg:w-1/4 p-6 mt-6 lg:mt-[90px]">
            <h3 className="text-2xl my-4 font-semibold text-start">
              Order Summary
            </h3>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-">Total Food Charges:</span>
              <span>₹{totalFoodCharges.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax:</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Delivery Charges:</span>
              <span>₹{deliveryCharges}</span>
            </div>
            <hr />
            <div className="flex justify-between my-4 text-lg font-semibold ">
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="w-full mt-4">
              <button onClick={handleOrder} className="mt-6 px-6 py-3 w-full rounded-lg bg-white text-orange-600 font-semibold shadow-md transition-transform duration-300 transform hover:scale-105 active:scale-95">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
