import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import EditFoodItem from "./EditFoodItem";

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [foodIdToDelete, setFoodIdToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [foodIdToEdit, setFoodIdToEdit] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
      setRestaurantId(restaurantData ? restaurantData._id : null);
    }
  }, []);

  const fetchFoodItems = async () => {
    if (!restaurantId) return;
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/restaurant/foods/${restaurantId}`
      );
      const res = await response.json();

      if (res.success) {
        setFoodItems(res.result);
      }
    } catch (error) {
      console.error("Error fetching food items:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFoodItems();
  }, [restaurantId]);

  const handleDeleteFood = async (foodId) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/restaurant/foods/${foodId}`,
        { method: "DELETE" }
      );
      const res = await response.json();

      if (res.success) {
        toast.success("Food Item Deleted Successfully");
        setShowModal(false);
        setFoodItems((prev) => prev.filter((item) => item._id !== foodId));
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
      toast.error("Failed to delete food item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="my-5 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="container mx-auto my-6 px-2">
          <h3 className="h3-gradient">Food Item List</h3>

          <div className="gradient-border-box mt-5 w-full overflow-x-auto">
            <table className="border-collapse w-full mx-auto">
              <thead className="bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800 text-white">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">S.No</th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Food Name
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Food Price
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Food Description
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Food Image
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Operations
                  </th>
                </tr>
              </thead>

              <tbody>
                {foodItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-5 text-xl font-semibold h3-gradient text-center"
                    >
                      No food items yet
                    </td>
                  </tr>
                ) : (
                  foodItems.map((item, index) => (
                    <tr key={item._id} className="bg-white hover:bg-gray-50">
                      <td className="border px-4 py-2 text-gray-600 text-sm">
                        {index + 1}
                      </td>
                      <td className="border px-4 py-2 text-orange-600 font-semibold text-sm">
                        {item.food_name}
                      </td>
                      <td className="border px-4 py-2 text-gray-600 text-sm">
                        ₹{item.food_price}
                      </td>
                      <td className="border px-4 py-2 text-gray-600 text-sm">
                        {item.food_description}
                      </td>
                      <td className="border px-4 py-2">
                        <img
                          src={item.food_image}
                          alt={item.food_name}
                          className="h-16 w-16 object-cover rounded-md shadow-sm"
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setShowEditModal(true);
                              setFoodIdToEdit(item._id);
                            }}
                            className="px-3 py-2 rounded-lg text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
                          >
                            <AiFillEdit className="w-6 h-6" />
                          </button>
                          <button
                            className="px-3 py-2 rounded-lg text-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
                            onClick={() => {
                              setFoodIdToDelete(item._id);
                              setShowModal(true);
                            }}
                          >
                            <AiFillDelete className="w-6 h-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-6 w-full max-w-md rounded-lg shadow-lg bg-white">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-orange-500 hover:text-orange-600"
            >
              ✕
            </button>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-orange-500">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-500 my-4">
                Are you sure you want to delete this food item? This action
                cannot be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteFood(foodIdToDelete)}
                  className="px-4 py-2 text-orange-600 bg-white border border-orange-500 hover:text-white hover:bg-orange-600 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditFoodItem
          id={foodIdToEdit}
          setShowEditModal={setShowEditModal}
          fetchFoodItems={fetchFoodItems}
        />
      )}
    </>
  );
};

export default FoodItemList;
