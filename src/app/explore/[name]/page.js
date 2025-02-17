"use client";
import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [resFoodItems, setResFoodItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cartData, setCartData] = useState();
  const [cart, setCart] = useState([]);
  const [foodIds, setFoodIds] = useState([]);
  const [removeCartData, setRemoveCartData] = useState();
  const params = useParams();
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("id");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  // console.log("RestaurantId", restaurantId);

  // console.log("foodIds", foodIds);
  // console.log("cart", cart);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
      setFoodIds(storedCart.map((item) => item._id));
    }
  }, []);

  // console.log("Params:", params); // This should log the correct params
  const images = [
    "/images/banner.jfif",
    "/images/banner1.png",
    "/images/banner2.png",
    "/images/banner3.jfif",
    "/images/banner4.png",
    "/images/banner5.png",
  ];

  // Move to the next or previous image
  const moveCarousel = (direction) => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + direction + images.length) % images.length
    );
  };

  // Automatically change the image every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      moveCarousel(1); // Move to the next image
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurantDetails();
    }
  }, [restaurantId]);

  const fetchRestaurantDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_BASE_URL}/api/customers/${restaurantId}`
      );

      const res = await response.json();
      // console.log("Response", res);

      if (res.success) {
        setLoading(false);
        setRestaurantDetails(res.resDetail);
        setResFoodItems(res.foodItems);
      }
    } catch (error) {
      console.log("Fail to fetch Restaurant Details", error);
    }
  };

  const addToCart = (item) => {
    setCartData(item);
    let localCartIds = foodIds;
    localCartIds.push(item._id);
    setFoodIds(localCartIds);
    setRemoveCartData();
  };

  const removeFromCart = (id) => {
    setRemoveCartData(id);
    setCartData();
    let localIds = foodIds.filter((foodId) => foodId !== id);
    setFoodIds(localIds);
  }

  return (
    <>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="relative md:max-w-[90%] mx-auto h-[600px] overflow-hidden mt-0 md:mt-5 md:rounded-lg group ">
        {/* Image Wrapper */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-[600px] object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-400 text-white hover:bg-gray-500 transition-all rounded-full p-2 z-20"
          onClick={() => moveCarousel(-1)}
          aria-label="Previous Slide"
        >
          <FaChevronLeft size={15} />
        </button>
        <button
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-400 text-white hover:bg-gray-500 transition-all rounded-full p-2 z-20"
          onClick={() => moveCarousel(1)}
          aria-label="Next Slide"
        >
          <FaChevronRight size={15} />
        </button>

        {/* Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center z-10">
          <div className="w-[70%]">
            <h2 className="text-5xl text-white font-bold mb-5">
              🍽 {decodeURI(params.name)}
            </h2>
          </div>
        </div>

        {/* Restaurant Details (Hidden until hover) */}
        {restaurantDetails && (
          <div className="absolute bottom-3 left-0 right-0 bg-black bg-opacity-50 text-white text-center text-lg py-2 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="whitespace-nowrap overflow-hidden text-ellipsis px-5">
              <p> 📧 {restaurantDetails?.email}</p>{" "}
              <p>📞 {restaurantDetails?.contact}</p>
              <p>
                📍{restaurantDetails?.full_address} {restaurantDetails?.city}.{" "}
              </p>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center my-10">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {resFoodItems.length > 0 ? (
            <div className="md:max-w-[90%] mx-auto">
              <h3 className="h3-gradient my-10">
                {restaurantDetails?.restaurant_name} Food Items
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 md:p-2 mb-10">
                {resFoodItems.map((foodItem, index) => (
                  <div
                    key={index}
                    className="relative group transition-transform duration-300 transform hover:scale-105 active:scale-95"
                  >
                    {/* Glowing Shadow Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

                    {/* Food Item Card */}
                    <div
                      className="relative hover:border-2 border-orange-600 bg-white ring-1 ring-orange-500 rounded-lg leading-none overflow-hidden"
                      style={{
                        clipPath:
                          "polygon(24px 0%, calc(100% - 24px) 0%, 100% 24px, 100% 100%, calc(100% - 24px) 100%, 24px 100%, 0px 100%, 0px 0%)",
                      }}
                    >
                      <div className="flex w-full bg-gradient-to-br from-orange-400 via-orange-600 to-orange-800 h-48">
                        <img
                          src={foodItem.food_image}
                          alt={foodItem.food_name}
                          className="w-48 h-48"
                        />
                        <div className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <h2 className="mb-1 text-xl text-white font-semibold">
                              {foodItem.food_name}
                            </h2>
                            <p className="text-white font-medium mb-1">
                              ₹{foodItem.food_price}
                            </p>
                          </div>
                          <p className="mb-2 text-neutral-900 line-clamp-4">
                            {foodItem.food_description}
                          </p>
                          {foodIds.includes(foodItem._id) ? (
                            <button
                              className="absolute bottom-2 px-4 py-3 rounded-lg bg-white text-orange-600 font-semibold shadow-md transition-transform duration-300 transform hover:scale-105 active:scale-95 mb-2"
                              onClick={() => removeFromCart(foodItem._id)}
                            >
                              Remove from Cart
                            </button>
                          ) : (
                            <button
                              className="absolute bottom-2 px-4 py-3 rounded-lg bg-white text-orange-600 font-semibold shadow-md transition-transform duration-300 transform hover:scale-105 active:scale-95 mb-2"
                              onClick={() => {
                                addToCart(foodItem);
                              }}
                            >
                              Add To Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-lg text-red-600 text-center my-10">
              No Food Items Found
            </p>
          )}
        </>
      )}

      <Footer />
    </>
  );
};

export default Page;
