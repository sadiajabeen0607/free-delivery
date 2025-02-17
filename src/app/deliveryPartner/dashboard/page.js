"use client"
import DeliveryHeader from "@/app/_components/DeliveryHeader";
import Footer from "@/app/_components/Footer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
   const [loading, setLoading] = useState(false);
    const [myOrders, setMyOrders] = useState([]);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
    useEffect(() => {
      fetchMyOrders();
    }, []);
  
    const fetchMyOrders = async () => {
      const deliveryBoy_id = JSON.parse(localStorage.getItem("deliveryPartner"))._id;
      // console.log("userId", userId);
  
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/deliveryPartners/orders/${deliveryBoy_id}`
        );
  
        const res = await response.json();
        // console.log("response", res.result);
  
        if (res.success) {
          setMyOrders(Array.isArray(res.result) ? res.result : [res.result]);
        }
      } catch (error) {
        console.error("Something went wrong", error);
      }
      setLoading(false);
    };

   useEffect(() => {
      const delivery = JSON.parse(localStorage.getItem("deliveryPartner"));
      if(!delivery) {
        router.push("/deliveryPartner");
      }
    }, []);
  return (
    <div className="flex flex-col min-h-screen">
    <DeliveryHeader />
    <div className="flex-grow">
    <div className="my-10 max-w-[90%] mx-auto">
          <h3 className="h3-gradient py-4 text-center">My Orders</h3>
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="loader"></div>
            </div>
          ) : (
            <div className="w-full mt-5">
              {myOrders.length > 0 ? (
                <div className="flex flex-wrap gap-5">
                  {myOrders.map((order, index) => (
                    <div
                      key={index}
                      className="w-full md:w-[40%] lg:w-[45%] mx-auto cursor-pointer"
                    >
                      <div className="relative group w-full">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative px-7 py-6 bg-white ring-1 ring-orange-500 rounded-lg leading-none">
                          <h4 className="text-2xl font-semibold gradient-text mb-1">
                            {order?.data?.restaurant_name ||
                              "Unknown Restaurant"}
                          </h4>
                          <p className="-mt-2 text-sm text-gray-500 mb-2">
                            {order?.data?.full_address || "No Address"}{" "}
                            {order?.data?.city || ""}
                          </p>
                          <p className="text-gray-600 text-sm">
                            📞 {order?.data?.contact || "N/A"}
                          </p>
                          <p className="text-gray-600 text-sm">
                            📧 {order?.data?.email || "N/A"}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-lg font-semibold">
                              Total:
                            </span>
                            <span className="text-xl font-bold text-green-600">
                              ₹{order?.amount || "0"}
                            </span>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-gray-700 font-semibold">
                              Status:
                            </span>
                            <span
                              className={`px-3 py-1 text-sm font-semibold rounded-full bg-green-200 text-green-700`}
                            >
                              Delivered
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-lg text-red-600">
                  No Orders Found
                </p>
              )}
            </div>
          )}
        </div>
   
    </div>
    <Footer />
  </div>
  )
}

export default Dashboard;