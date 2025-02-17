import { useState } from "react";
import InputField from "./inputField";
import { toast } from "react-toastify";

const AddFoodItem = ({ setAddFood }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    food_name: "",
    food_price: "",
    food_image: "",
    food_description: "",
  });
  const [error, setError] = useState(false);

  const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
  // console.log("restaurantData", restaurantData);

  let restaurant_id;

  if (restaurantData) {
    restaurant_id = restaurantData._id;
  }
  console.log("restaurant_id", restaurant_id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // console.log("data", data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (
      !data.food_name ||
      !data.food_price ||
      !data.food_image ||
      !data.food_description
    ) {
      setLoading(false);
      setError(true);
      return;
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/restaurant/foods`,
        {
          method: "POST",
          body: JSON.stringify({ ...data, restaurant_id }),
        }
      );

      const res = await response.json();
      // console.log("response", res);

      if (res.success) {
        setLoading(false);
        toast.success("Item Uploaded Successfully");
        setAddFood(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Some Error Occur. Please try again.");
    }
  };
  return (
    <div className="max-w-[600px] w-full mx-auto mt-5 my-12 ">
      <h3 className="h3-gradient">Add Food Item</h3>
      <div className="p-[2px] mt-5 bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800 rounded-lg">
        <div className="p-10 bg-white rounded-md">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <InputField
              type="text"
              placeholder="Enter Food name"
              value={data.food_name || ""}
              onChange={handleChange}
              name="food_name"
              label="Food Name"
            />
            {error && !data.food_name && (
              <span className="text-red-600 text-sm -mt-2 text-start">
                Please enter Food name
              </span>
            )}
            <InputField
              type="text"
              placeholder="Enter Food price"
              value={data.food_price || ""}
              onChange={handleChange}
              name="food_price"
              label="Food Price"
            />
            {error && !data.food_price && (
              <span className="text-red-600 text-sm -mt-2 text-start">
                Please enter food price
              </span>
            )}
            <InputField
              type="text"
              placeholder="Enter Food image path"
              value={data.food_image || ""}
              onChange={handleChange}
              name="food_image"
              label="Food Image Path"
            />
            {error && !data.food_image && (
              <span className="text-red-600 text-sm -mt-2 text-start">
                Please enter food image
              </span>
            )}
            <InputField
              type="text"
              placeholder="Enter Food Description"
              value={data.food_description || ""}
              onChange={handleChange}
              name="food_description"
              label="Food Description"
            />
            {error && !data.food_description && (
              <span className="text-red-600 text-sm -mt-2 text-start">
                Please fill Description about food
              </span>
            )}

            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading ? "Loading..." : "Add Food Item"}
            </button>
          </form>{" "}
        </div>
      </div>
    </div>
  );
};

export default AddFoodItem;
