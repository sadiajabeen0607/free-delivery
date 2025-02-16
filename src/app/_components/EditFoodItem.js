import { useEffect, useState } from "react";
import InputField from "./inputField";
import { toast } from "react-toastify";

const EditFoodItem = ({ id, setShowEditModal, fetchFoodItems }) => {
  console.log("id", id);

  const [loading, setLoading] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState({
    food_name: "",
    food_price: "",
    food_image: "",
    food_description: "",
  });

  const fetchFoodItem = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/restaurant/foods/edit/${id}`
      );
      const res = await response.json();
      // console.log("response", res);

      if (res.success) {
        setLoading(false);
        setDataToUpdate(res.result);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchFoodItem(id);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataToUpdate((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:3000/api/restaurant/foods/edit/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToUpdate)
        }
      );

      const res = await response.json();

      if (res.success) {
        setLoading(false);
        toast.success("Updated Successfully");
        setShowEditModal(false);
        fetchFoodItems();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-5 rounded-lg shadow-lg max-w-[600px] w-full relative">
          <button
            type="button"
            onClick={() => setShowEditModal(false)}
            className="absolute top-3 right-3 text-orange-500 hover:text-orange-600"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <h3 className="h3-gradient">Edit Food Item</h3>

          <div className="p-[2px] mt-5 bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800 rounded-lg">
            <div className="p-10 bg-white rounded-md">
              <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <InputField
                  type="text"
                  placeholder="Enter Food name"
                  value={dataToUpdate.food_name || ""}
                  onChange={handleChange}
                  name="food_name"
                  label="Food Name"
                />
                {/* {error && !data.food_name && (
              <span className="text-red-600 text-sm -mt-2 text-start">
                Please enter Food name
              </span>
            )} */}
                <InputField
                  type="text"
                  placeholder="Enter Food price"
                  value={dataToUpdate.food_price || ""}
                  onChange={handleChange}
                  name="food_price"
                  label="Food Price"
                />
                {/* {error && !data.food_price && (
              <span className="text-red-600 text-sm -mt-2 text-start">
                Please enter food price
              </span>
            )} */}
                <InputField
                  type="text"
                  placeholder="Enter Food image path"
                  value={dataToUpdate.food_image || ""}
                  onChange={handleChange}
                  name="food_image"
                  label="Food Image Path"
                />
                {/* {error && !data.food_image && (
              <span className="text-red-600 text-sm -mt-2 text-start">
                Please enter food image
              </span>
            )} */}
                <InputField
                  type="text"
                  placeholder="Enter Food Description"
                  value={dataToUpdate.food_description || ""}
                  onChange={handleChange}
                  name="food_description"
                  label="Food Description"
                />
                {/* {error && !data.food_description && (
              <span className="text-red-600 text-sm -mt-2 text-start">
                Please fill Description about food
              </span>
            )} */}

                <button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Update Food Item"}
                </button>
              </form>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditFoodItem;
