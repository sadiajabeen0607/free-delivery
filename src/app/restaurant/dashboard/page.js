"use client";

import AddFoodItem from "@/app/_components/AddFoodItem";
import FoodItemList from "@/app/_components/FoodItemList";
import Footer from "@/app/_components/Footer";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import { useState } from "react";

const Dashboard = () => {
  const [addFood, setAddFood] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <RestaurantHeader />
      <div className="flex-grow">

      <div className=" container mx-auto flex items-center gap-5 mt-2 px-5">
        <button title={`${addFood ? "active" : "select"}`}
          className={`text-sm px-5 py-2.5 text-center font-medium rounded-lg my-2 transition duration-300 ${
            addFood
              ? "text-white bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800 focus:outline-none hover:brightness-110"
              : "border border-orange-500 text-orange-600 hover:bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800 hover:text-white"
          }`}
          onClick={() => setAddFood(true)}
        >
          Add Food Item
        </button>

        <button
        title={`${addFood ? "select" : "active"}`}
          className={`text-sm px-5 py-2.5 text-center font-medium rounded-lg my-2 transition duration-300 ${
            addFood
              ? "border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white hover:bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800"
              : "text-white bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800 focus:outline-none hover:brightness-110"
          }`}
          onClick={() => setAddFood(false)}
        >
          Dashboard
        </button>
      </div>

      {addFood ? <AddFoodItem setAddFood={setAddFood} /> : <FoodItemList />}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
