import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = ({locations, selectedLocation, setSelectedLocation, fetchRestaurants}) => {
  
  const images = [
    "/images/banner.jfif",
    "/images/banner1.png",
    "/images/banner2.png",
    "/images/banner3.jfif",
    "/images/banner4.png",
    "/images/banner5.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLocations, setShowLocations] = useState(false);

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

  return (
    <div className="relative md:max-w-[90%] mx-auto h-[600px] overflow-hidden md:mt-5 md:rounded-lg">
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
            Food Delivery App
          </h2>
          <div className="flex items-center bg-white rounded-md overflow-hidden shadow-md">
            <div className="w-[30%]" >
              <input
                type="text"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)} 
                onClick={() => setShowLocations(true)}
                placeholder="Select Place"
                className="w-full px-4 py-3 outline-none focus:outline-none"
              />
              {showLocations && (
                <ul className="absolute w-[21%] bg-white m-0 p-0 text-left rounded-b-md">
                  {locations.map((location, index) => (
                  <li
                    onClick={() => {
                      setSelectedLocation(location);
                      setShowLocations(false);
                      fetchRestaurants({location: location})
                    }}
                    key={index}
                    className="w-full px-4 py-2 border-b border-gray-300 cursor-pointer hover:bg-orange-500 hover:text-white transition-all duration-300 hover:border-orange-500"
                  >
                    {location}
                  </li>
                  ))}
                </ul>
              )}
            </div>
            <input
              type="text"
              onChange={(e) => fetchRestaurants({restaurant: e.target.value})}
              placeholder="Enter Food Or Restaurant Name"
              className="w-[65%] px-4 py-3 outline-none border-l border-gray-300 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
