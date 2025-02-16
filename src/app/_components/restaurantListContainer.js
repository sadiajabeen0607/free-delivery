import { useRouter } from "next/navigation";
import { MdOutlineCall, MdOutlineMailOutline  } from "react-icons/md";

const RestaurantListContainer = ({ loading, restaurants }) => {
  
  const router = useRouter();
  return (
    <div className="my-10 max-w-[90%] mx-auto">
      <h3 className="h3-gradient py-4">Restaurants</h3>

      {loading ? (
        <div className="flex items-center justify-center">
        <div className="loader"></div>
        </div>
      ) : (
        <div className="w-full mt-5">
          {restaurants.length > 0 ? (
            <div className="flex flex-wrap gap-5">
              {restaurants.map((restaurant, index) => (
                <div key={index} className="w-full md:w-[40%] lg:w-[30%] mx-auto cursor-pointer" onClick={() => router.push(`/explore/${restaurant.restaurant_name}?id=${restaurant._id}`)}>

                  <div  className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-orange-600 to-orange-800 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative px-7 py-6 bg-white ring-1 ring-orange-500 rounded-lg leading-none">
                      <h4 className="text-2xl font-semibold gradient-text mb-1">{restaurant.restaurant_name}</h4>
                      <p className="-mt-2 text-sm text-gray-500 mb-2">{restaurant.full_address} {restaurant.city}</p>
                      <div className="flex items-center gap-3 mb-1">
                        <MdOutlineCall className="w-6 h-6 text-orange-500 hover:text-orange-600" />
                        <p>{restaurant.contact}</p>
                      </div>
                      <div className="flex items-center gap-3 ">
                        <MdOutlineMailOutline className="w-6 h-6 text-orange-500 hover:text-orange-600" />
                        <p>{restaurant.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-red-600">No Restaurant Founds</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantListContainer;
