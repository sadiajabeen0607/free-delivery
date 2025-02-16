"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { useEffect, useState } from "react";

const CustomerHeader = ({ cartData, removeCartData, removeCart }) => {
  // console.log("cartData", cartData);

  const pathname = usePathname();
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsNumber, setCartItemsNumber] = useState(0);
  const [user, setUser] = useState(null);

  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setCartItems(storedCart);
      setCartItemsNumber(storedCart.length);
      setUser(storedUser);
    }
  }, []);

  // Adding Item to cart
  useEffect(() => {
    if (cartData && cartData?.restaurant_id) {
      const newRestaurantId = cartData?.restaurant_id;

      setCartItems((prevCart) => {
        if (
          prevCart.length > 0 &&
          prevCart[0]?.restaurant_id !== newRestaurantId
        ) {
          // 🛑 Restaurant changed, clear cart
          const updatedCart = [cartData];
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setCartItemsNumber(updatedCart.length);
          return updatedCart;
        } else {
          // ✅ Same restaurant, add item to cart
          const updatedCart = [...prevCart, cartData];
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          setCartItemsNumber(updatedCart.length);
          return updatedCart;
        }
      });
    }
  }, [cartData]);

  // Item removing from cart
  useEffect(() => {
    if (removeCartData) {
      const updatedCart = cartItems.filter(
        (item) => item._id !== removeCartData
      );
      setCartItems(updatedCart); // Update state
      setCartItemsNumber(updatedCart.length); // Set correct length
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      if (updatedCart.length === 0) {
        localStorage.removeItem("cart"); // Clear localStorage if empty
      }
    }
  }, [removeCartData]);

  useEffect(() => {
    if (removeCart) {
      setCartItems([]);
      setCartItemsNumber(0);
      localStorage.removeItem("cart");
    }
  }, [removeCart]);

  const menuItems = [
    { name: "Home", href: "/", title: "Home" },
    {
      name: `Cart(${cartItemsNumber})`,
      href: `${cartItemsNumber ? "/cart" : "#"}`,
      title: "Cart",
    },
    { name: "Partner", href: "/deliveryPartner", title: "Delivery Partner" },
    !user
      ? { name: "SignUp/Login", href: "/user-auth", title: "SignUp/LoginUser" }
      : {
          name: `${user.username}`,
          href: "/myProfile",
          title: `${user.username}`,
        }, // Ensure null values are filtered
  ].filter(Boolean);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data
    setUser(null); // Update state
    router.push("/user-auth");
  };

  return (
    <div className="bg-[#150D0B] h-[120px] z-20">
      <div className="w-full md:max-w-[90%] mx-auto ">
        <div className="p-2 px-4 ms:px-8 flex items-center justify-between">
          {/* Logo */}
          <Logo />
          {/* Navigation Links */}
          <ul className="flex items-center gap-3 md:gap-6">
            {menuItems.map((item) => (
              <li key={item.name} className="group relative flex items-center">
                <Link
                  href={item.href}
                  title={item.title}
                  className={`transition-colors duration-300 text-lg font-medium  ${
                    pathname === item.href
                      ? "text-orange-500"
                      : "text-white hover:text-orange-500"
                  }`}
                >
                  {/* Render icon or text */}
                  {item.name}
                </Link>

                {/* Animated Underline */}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-[2px] bg-orange-500 transition-all duration-300 group-hover:w-full ${
                    pathname === item.href ? "w-full" : "w-0"
                  }`}
                ></span>
              </li>
            ))}

            {user ? (
              <button className="submit-button" onClick={handleLogout}>
                Logout
              </button>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomerHeader;
